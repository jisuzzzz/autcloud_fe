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
  // setNewNodes: (nodes: Node[]) => void
  // setEdges: (edges: Edge[] | ((prevEdges: Edge[]) => Edge[])) => void
  updateNodePosition: (nodeId: string, position: { x: number, y: number }, yDoc: Y.Doc) => void
  initNodes: (initialNodes: Node[], initialEdges: Edge[], yDoc: Y.Doc) => void
  pushToUndoStack: (userId: string, action: UserAction, yDoc: Y.Doc) => void
  undo: (userId: string, yDoc: Y.Doc) => void
  initUserStacks: (userId: string, yDoc: Y.Doc) => void
  addNode: (node: Node, yDoc: Y.Doc) => void
  removeNode: (nodeId: string, yDoc: Y.Doc) => void
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

const STACK_TIMEOUT = 1000*60*10

export const useLiveFlowStore = create<FlowMapState>((set, get) => ({
  nodes: [],
  edges: [],
  yDoc: null,
  yNodes: null,
  yEdges: null,
  userStacks: null,
  userId: null,
  userName: null,

  addNode : (node: Node, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Node>('nodes')
    
    yDoc.transact(() => {
      yNodes.push([node])  // Yjs에 추가
    })
  },
  
  removeNode : (nodeId: string, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Node>('nodes')
    
    yDoc.transact(() => {
      const index = yNodes.toArray().findIndex(n => n.id === nodeId)
      if (index !== -1) yNodes.delete(index, 1)
    })
  },

  // // 노드 배열 설정 함수 - 단방향 데이터 흐름: Y.js → Zustand → React Flow
  // setNewNodes: (nodes) => {
  //   const { yNodes } = get() // 현재 Y.js 노드 배열 가져오기
  //   if (yNodes) { // Y.js가 초기화되었는지 확인
  //     yNodes.delete(0, yNodes.length) // 기존 노드 배열 전체 삭제
  //     yNodes.insert(0, nodes) // 새 노드 배열 삽입
  //   }
  //   set({ nodes }) // Zustand 상태 업데이트
  // },

  // // 엣지 배열 설정 함수 - 함수형 업데이트 지원
  // setEdges: (edges) => {
  //   const { yEdges } = get() // 현재 Y.js 엣지 배열 가져오기
  //   // 함수형 업데이트의 경우 현재 상태를 인자로 전달하여 새 상태 계산
  //   const newEdges = typeof edges === 'function' ? edges(get().edges) : edges
  //   if (yEdges) { // Y.js가 초기화되었는지 확인
  //     yEdges.delete(0, yEdges.length) // 기존 엣지 배열 전체 삭제
  //     yEdges.insert(0, newEdges) // 새 엣지 배열 삽입
  //   }
  //   set({ edges: newEdges }) // Zustand 상태 업데이트
  // },

  updateNodePosition: (nodeId, point, yDoc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Node>('nodes')
    
    yDoc.transact(() => {
      // 현재 노드들 가져오기
      const nodes = yNodes.toArray() as Node[]
      // 업데이트된 노드 배열 생성
      const updatedNodes = nodes.map(node => 
        node.id === nodeId 
          ? { ...node, position: { x: point.x, y: point.y } }
          : node
      )
      
      // YJS 업데이트
      yNodes.delete(0, yNodes.length)
      yNodes.insert(0, updatedNodes)
      
      // Zustand 상태 업데이트
    })
  },

  initNodes: (initialNodes, initialEdges, yDoc) => {
    // Y.js 문서 및 공유 데이터 구조 생성
    const yNodes = yDoc.getArray<Node>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')

    // 초기 데이터가 없을 때만 초기화
    if (yNodes.length === 0) {
        yNodes.insert(0, initialNodes)

    }
    if (yEdges.length === 0) {
        yEdges.insert(0, initialEdges)
    }
    
    // 사용자 ID 초기화
    const userId = Date.now().toString()
    set({ 
      userId,
      userName: `User-${userId.slice(-4)}`,
      yNodes,
      yEdges
    })

  },

  // 사용자별 undo 스택 초기화 함수, 마지막 액션으로 타임아웃 10분
  // Y.js의 공유 데이터 구조에서 사용자별 작업 이력을 관리하는 맵을 초기화
  initUserStacks: (userId, yDoc) => {
    if(!yDoc) return
    const userStacks = yDoc.getMap<UserStack>('userStacks')

    const existingStack = userStacks.get(userId)
    if(existingStack) {
      const lastActionTime = existingStack.undoStack[existingStack.undoStack.length - 1]?.timestamp || 0
      if(Date.now() - lastActionTime > STACK_TIMEOUT) {
        userStacks.set(userId, {undoStack: []})
      }
    } else {
      userStacks.set(userId, { undoStack: [] })
    }

    set({ userStacks, userId })
  },

  pushToUndoStack: (userId: string, action: UserAction, yDoc: Y.Doc) => {
    const { userStacks } = get()
    // console.log("ydoc: ",yDoc, "stacks: ",userStacks)
    if (!yDoc || !userStacks) return
    // Y.js의 트랜잭션으로 실행 (여러 작업을 원자적으로 수행)
    yDoc.transact(() => {
      // 해당 사용자의 스택을 가져오거나, 없으면 새로운 빈 스택을 생성
      const userStack = userStacks.get(userId) || { undoStack: [] }
      userStack.undoStack.push(action) // 새로운 작업을 스택에 추가
      userStacks.set(userId, userStack) // 변경된 스택을 다시 저장
    })
  },

  // undo: (userId: string, yDoc) => {
  //   const { userStacks, nodes, setNewNodes } = get()
    
  //   console.log(nodes)
  //   if (!yDoc || !userStacks) return // 필요한 객체가 없으면 undo를 수행할 수 없음
  //   // Y.js 트랜잭션으로 실행
  //   const userStack = userStacks?.get(userId)
  //   // 해당 사용자의 스택이 없거나 비어있으면 취소할 작업이 없음
  //   if (!userStack || userStack.undoStack.length === 0) return
  //   const yNodes = yDoc.getArray<Node>('nodes')
  //   // 스택에서 가장 최근 작업을 꺼냄
  //   const action = userStack.undoStack.pop()!
  //   // console.log(action)

  //   // 작업 타입에 따라 다른 취소 동작 수행
  //   switch (action.type) {
  //     case 'add':
  //       // 노드 추가 작업 취소: 추가했던 노드들을 제거
  //       if (action.nodes) {
  //         // setNewNodes(nodes.filter(n => 
  //         //   !action.nodes?.find(an => an.id === n.id) // 추가했던 노드들을 현재 노드 목록에서 필터링
  //         // ))
  //         yDoc.transact(() => {
  //           const currentNodes = yNodes.toArray()
  //           const filteredNodes = currentNodes.filter(n => 
  //             !action.nodes?.find(an => an.id === n.id)
  //           )
  //           yNodes.delete(0, yNodes.length)
  //           yNodes.insert(0, filteredNodes)
  //         })
  //       }
  //       break
  //     case 'remove':
  //       // 노드 제거 작업 취소: 제거했던 노드들을 복원
  //       if (action.nodes) {
  //         // setNewNodes([...nodes, ...action.nodes]) // 현재 노드 목록에 제거했던 노드들을 다시 추가
  //         yDoc.transact(() => {
  //           const currentNodes = yNodes.toArray()
  //           yNodes.delete(0, yNodes.length)
  //           yNodes.insert(0, [...currentNodes, ...action.nodes])
  //         })
  //       }
  //       break
  //   }
  //   // 변경된 스택을 다시 저장
  //   // 작업을 꺼낸 후의 스택 상태를 유지하기 위해 필요
  //   userStacks.set(userId, userStack)
  // },
  undo: (userId: string, yDoc) => {
    const { userStacks } = get()
    if (!yDoc || !userStacks) return
    
    const userStack = userStacks?.get(userId)
    if (!userStack || userStack.undoStack.length === 0) return
    
    const action = userStack.undoStack.pop()!
    // console.log(action)
    // console.log(userStacks)
    const yNodes = yDoc.getArray<Node>('nodes')
  
    yDoc.transact(() => {
      switch (action.type) {
        case 'add':
          if (action.nodes) {
            const currentNodes = yNodes.toArray()
            const filteredNodes = currentNodes.filter(n => 
              !action.nodes?.find(an => an.id === n.id)
            )
            yNodes.delete(0, yNodes.length)
            yNodes.insert(0, filteredNodes)
            set({ nodes: filteredNodes })  // Zustand 상태도 업데이트
          }
          break
        case 'remove':
          if (action.nodes) {
            const currentNodes = yNodes.toArray()
            const updatedNodes = currentNodes.concat(action.nodes)
            yNodes.delete(0, yNodes.length)
            yNodes.insert(0, updatedNodes)
            set({ nodes: updatedNodes })  // Zustand 상태도 업데이트
          }
          break
      }
      userStacks.set(userId, userStack)
    })
  }
}))