import { Node, Edge } from "reactflow"
import * as Y from 'yjs'

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

export const LiveFlowService = {

  initNodes: (initialNodes:Node[], initialEdges:Edge[], yDoc:Y.Doc) => {
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
  },

  // 사용자별 undo 스택 초기화 함수, 마지막 액션으로 타임아웃 10분
  // Y.js의 공유 데이터 구조에서 사용자별 작업 이력을 관리하는 맵을 초기화
  initUserActionHistory: (userId:string, yDoc:Y.Doc) => {
    if(!yDoc) return
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')

    const existingStack = userActionHistory.get(userId)
    if(existingStack) {
      const lastActionTime = existingStack.undoStack[existingStack.undoStack.length - 1]?.timestamp || 0
      if(Date.now() - lastActionTime > STACK_TIMEOUT) {
        userActionHistory.set(userId, {undoStack: []})
      }
    } else {
      userActionHistory.set(userId, { undoStack: [] })
    }
  },

  updateNodePosition: (nodeId:string, point:{x:number, y:number}, yDoc:Y.Doc) => {
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
    })
  },

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

  pushToUndoStack: (userId: string, action: UserAction, yDoc: Y.Doc) => {
    if (!yDoc) return
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')

    yDoc.transact(() => {
      // 해당 사용자의 스택을 가져오거나, 없으면 새로운 빈 스택을 생성
      const userStack = userActionHistory.get(userId) || { undoStack: [] }
      userStack.undoStack.push(action) // 새로운 작업을 스택에 추가
      userActionHistory.set(userId, userStack) // 변경된 스택을 다시 저장
    })
  },

  undo: (userId: string, yDoc:Y.Doc): Node[] | null  => {
    if (!yDoc) return null
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
    
    const userStack = userActionHistory?.get(userId)
    if (!userStack || userStack.undoStack.length === 0) return null
    
    const action = userStack.undoStack.pop()!
    const yNodes = yDoc.getArray<Node>('nodes')

    let undoNodes: Node[] = []
  
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
            undoNodes = filteredNodes
          }
          break
        case 'remove':
          if (action.nodes) {
            const currentNodes = yNodes.toArray()
            // 액션노드랑 현재 노드랑 합치기
            const updatedNodes = currentNodes.concat(action.nodes)
            yNodes.delete(0, yNodes.length)
            yNodes.insert(0, updatedNodes)
            undoNodes = updatedNodes
          }
          break
      }
      userActionHistory.set(userId, userStack)
    })

    return undoNodes
  }


}