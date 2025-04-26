import { create } from "zustand"
import { Node, Edge } from "reactflow"
import * as Y from 'yjs'

interface FlowMapState {
  nodes: Node[]
  edges: Edge[]
  yDoc: Y.Doc | null
  yNodes: Y.Array<Node> | null
  yEdges: Y.Array<Edge> | null
  userStacks: Y.Map<UserStack> | null
  userId: string | null
  userName: string | null
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[] | ((prevEdges: Edge[]) => Edge[])) => void
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void
  initYjs: (initialNodes: Node[], initialEdges: Edge[]) => void
  pushToUndoStack: (userId: string, action: UserAction) => void
  undo: (userId: string) => void
  initUserStacks: () => void
  selectedNodes: Y.Map<NodeSelection> | null
  initSelectedNodes: () => void
  setSelectedNodes: (nodes: Node[]) => void
  
}

interface NodeSelection {
  userId: string
  userName:string
  timestamp: number
}

interface UserAction {
  type: 'add' | 'remove' | 'move' | 'copy' | 'paste'
  nodes?: Node[]
  edges?: Edge[]
  timestamp: number
}

interface UserStack {
  undoStack: UserAction[]
}

export const useFlowMapStore = create<FlowMapState>((set, get) => ({
  nodes: [],
  edges: [],
  yDoc: null,
  yNodes: null,
  yEdges: null,
  userStacks: null,
  userId: null,
  userName: null,
  selectedNodes: null,

  initSelectedNodes: () => {
    const { yDoc } = get()
    if (!yDoc) return
    const selectedNodes = yDoc.getMap<NodeSelection>('selectedNodes')
    set({ selectedNodes })
  },

  setSelectedNodes: (nodes: Node[]) => {
    const { yDoc, selectedNodes, userId, userName } = get()
    if (!yDoc || !selectedNodes || !userId) return

    yDoc.transact(() => {
      // 이전 선택 모두 제거
      selectedNodes.forEach((_, key) => {
        if (selectedNodes.get(key)?.userId === userId) {
          selectedNodes.delete(key)
        }
      })

      // 새로운 선택 추가
      nodes.forEach(node => {
        selectedNodes.set(node.id, {
          userId,
          userName: userName || '',
          timestamp: Date.now()
        })
      })
    })
  },

  // 노드 배열 설정 함수 - 단방향 데이터 흐름: Y.js → Zustand → React Flow
  setNodes: (nodes) => {
    const { yNodes } = get() // 현재 Y.js 노드 배열 가져오기
    if (yNodes) { // Y.js가 초기화되었는지 확인
      yNodes.delete(0, yNodes.length) // 기존 노드 배열 전체 삭제
      yNodes.insert(0, nodes) // 새 노드 배열 삽입
    }
    set({ nodes }) // Zustand 상태 업데이트
  },

  // 엣지 배열 설정 함수 - 함수형 업데이트 지원
  setEdges: (edges) => {
    const { yEdges } = get() // 현재 Y.js 엣지 배열 가져오기
    // 함수형 업데이트의 경우 현재 상태를 인자로 전달하여 새 상태 계산
    const newEdges = typeof edges === 'function' ? edges(get().edges) : edges
    if (yEdges) { // Y.js가 초기화되었는지 확인
      yEdges.delete(0, yEdges.length) // 기존 엣지 배열 전체 삭제
      yEdges.insert(0, newEdges) // 새 엣지 배열 삽입
    }
    set({ edges: newEdges }) // Zustand 상태 업데이트
  },

  // 노드 위치 업데이트 함수 - 노드 이동 시 호출됨
  updateNodePosition: (nodeId, position) => {
    const { nodes, yNodes } = get() // 현재 노드 배열과 Y.js 노드 배열 가져오기
    // 특정 노드의 위치만 업데이트한 새 노드 배열 생성
    const updatedNodes = nodes.map(node => {
      if (node.id === nodeId) { // 업데이트 대상 노드 찾기
        return { ...node, position } // 위치 정보만 업데이트하고 나머지는 유지
      }
      return node // 다른 노드는 그대로 유지
    })
    if (yNodes) { // Y.js가 초기화되었는지 확인
      yNodes.delete(0, yNodes.length) // 기존 노드 배열 전체 삭제
      yNodes.insert(0, updatedNodes) // 업데이트된 노드 배열 삽입
    }
    set({ nodes: updatedNodes }) // Zustand 상태 업데이트
  },

  initYjs: (initialNodes, initialEdges) => {
    // Y.js 문서 및 공유 데이터 구조 생성
    const yDoc = new Y.Doc() // 새 Y.js 문서 생성
    const yNodes = yDoc.getArray<Node>('nodes') // 'nodes' 이름의 공유 배열 생성
    const yEdges = yDoc.getArray<Edge>('edges') // 'edges' 이름의 공유 배열 생성
    
    // 사용자 ID 초기화
    const userId = Date.now().toString()
    set({ 
      userId,
      userName: `User-${userId.slice(-4)}`
    })

    // 초기 데이터 삽입
    yNodes.insert(0, initialNodes) // 초기 노드 배열 삽입
    yEdges.insert(0, initialEdges) // 초기 엣지 배열 삽입

    // Y.js 변경 감지를 위한 옵저버 설정 - 다른 클라이언트의 변경사항 수신 시 호출됨
    yNodes.observe(() => {
      const nodes = yNodes.toArray() // Y.js 노드 배열을 일반 배열로 변환
      set({ nodes }) // Zustand 상태 업데이트
    })

    yEdges.observe(() => {
      const edges = yEdges.toArray() // Y.js 엣지 배열을 일반 배열로 변환
      set({ edges }) // Zustand 상태 업데이트
    })

    // Y.js 관련 객체와 초기 데이터로 Zustand 상태 초기화
    set({ yDoc, yNodes, yEdges, nodes: initialNodes, edges: initialEdges })
  },

  // 사용자별 undo 스택 초기화 함수
  // Y.js의 공유 데이터 구조에서 사용자별 작업 이력을 관리하는 맵을 초기화
  initUserStacks: () => {
    const { yDoc }  = get()
    if(!yDoc) return // yDoc이 없으면 초기화할 수 없으므로 종료

    // Y.js의 공유 맵에서 'userStacks'라는 이름으로 맵을 가져옴
    // 이 맵은 각 사용자의 ID를 키로 하고, 해당 사용자의 작업 스택을 값으로 가짐
    const userStacks = yDoc.getMap<UserStack>('userStacks')
    set({ userStacks }) // Zustand 스토어에 userStacks 저장
  },

  // undo 스택에 새로운 작업을 추가하는 함수
  // 사용자가 수행한 작업(노드 추가/삭제 등)을 해당 사용자의 undo 스택에 기록
  pushToUndoStack: (userId: string, action: UserAction) => {
    const { yDoc, userStacks } = get()
    if (!yDoc || !userStacks) return // yDoc이나 userStacks가 없으면 작업을 수행할 수 없음

    // Y.js의 트랜잭션으로 실행 (여러 작업을 원자적으로 수행)
    yDoc.transact(() => {
      // 해당 사용자의 스택을 가져오거나, 없으면 새로운 빈 스택을 생성
      const userStack = userStacks.get(userId) || { undoStack: [] }
      userStack.undoStack.push(action) // 새로운 작업을 스택에 추가
      userStacks.set(userId, userStack) // 변경된 스택을 다시 저장
    })
  },

  // undo 실행 함수
  // 사용자가 Ctrl+Z를 눌렀을 때 마지막 작업을 취소
  undo: (userId: string) => {
    const { yDoc, userStacks, nodes, setNodes } = get()
    if (!yDoc || !userStacks) return // 필요한 객체가 없으면 undo를 수행할 수 없음

    // Y.js 트랜잭션으로 실행
    yDoc.transact(() => {
      const userStack = userStacks.get(userId)
      // 해당 사용자의 스택이 없거나 비어있으면 취소할 작업이 없음
      if (!userStack || userStack.undoStack.length === 0) return

      // 스택에서 가장 최근 작업을 꺼냄
      const action = userStack.undoStack.pop()!

      // 작업 타입에 따라 다른 취소 동작 수행
      switch (action.type) {
        case 'add':
          // 노드 추가 작업 취소: 추가했던 노드들을 제거
          if (action.nodes) {
            setNodes(nodes.filter(n => 
              !action.nodes?.find(an => an.id === n.id) // 추가했던 노드들을 현재 노드 목록에서 필터링
            ))
          }
          break
        case 'remove':
          // 노드 제거 작업 취소: 제거했던 노드들을 복원
          if (action.nodes) {
            setNodes([...nodes, ...action.nodes]) // 현재 노드 목록에 제거했던 노드들을 다시 추가
          }
          break
      }
      // 변경된 스택을 다시 저장
      // 작업을 꺼낸 후의 스택 상태를 유지하기 위해 필요
      userStacks.set(userId, userStack)
    })
  },
}))