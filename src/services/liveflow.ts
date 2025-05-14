import { Node, Edge } from "reactflow"
import * as Y from 'yjs'
import { ProjectChanges } from "@/lib/projectDB"

interface UserAction {
  type: 'add' | 'remove'
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

    if(!yDoc) return
    // Y.js 문서 및 공유 데이터 구조 생성
    const yNodes = yDoc.getArray<Node>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')
    // yNodes.delete(0, yNodes.length)

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
  
  initProjectHistory: (yDoc: Y.Doc) => {
    if(!yDoc) return
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    // projectHistory.delete('nodes')
    if (!projectHistory.has('nodes')) {
      projectHistory.set('nodes', {})
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

  addNode : (node: Node, userId:string, userName:string, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Node>('nodes')
    const projectHistroy = yDoc.getMap<ProjectChanges>('projectHistory')

    yDoc.transact(() => {
      yNodes.push([node])

      const changes = projectHistroy.get('nodes') || {}
      changes[node.id] = {
        userId: userId,
        userName: userName,
        status: 'added',
        label: node.data.spec.label,
        specChanges: {}
      }

      const specProperties = Object.keys(node.data.spec)
      specProperties.forEach(property => {
        changes[node.id].specChanges[property] = {
          prevValue: null,
          currValue: node.data.spec[property]
        }
      })
      
      projectHistroy.set('nodes', changes)
    })
  },

  removeNodeV2 : (nodeId: string, userId:string, userName: string, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Node>('nodes')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    
    yDoc.transact(() => {
      const changes = projectHistory.get('nodes') || {}
      const nodes = yNodes.toArray() as Node[]

      const updatedNodes = nodes.map(node => 
        node.id === nodeId
        ? {...node, data: {...node.data, status: 'remove'}}
        : node
      )

      const removedNode = updatedNodes.find(node => node.id === nodeId)
      if(!removedNode) return

      const existingChange = changes[nodeId]
      if(existingChange && existingChange.status === 'added') {
        delete changes[nodeId]
      } else {
        changes[nodeId] = {
          userId: userId,
          userName:userName,
          status: 'removed',
          label: removedNode.data.spec.label,
          specChanges: {}
        }
        const specProperties = Object.keys(removedNode.data.spec)
        specProperties.forEach(property => {
          changes[nodeId].specChanges[property] = {
            prevValue: removedNode.data.spec[property],
            currValue: null
          }
        })
      }
      yNodes.delete(0, yNodes.length)
      yNodes.insert(0, updatedNodes)
      projectHistory.set('nodes', changes)
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

  editNodeV2: (nodeId:string, changes: Record<string, string>, userId: string, userName:string, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Node>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    
    const nodes = yNodes.toArray() as Node[]
    const edges = yEdges.toArray() as Edge[]
    const prevNode = nodes.find(n => n.id === nodeId)

    if(!prevNode) return
    
    yDoc.transact(() => {
      const historyChanges = projectHistory.get('nodes') || {}

      if(!historyChanges[nodeId]) {
        historyChanges[nodeId] = {
          userId: userId,
          userName: userName,
          status: 'unchanged',
          label: 'label',
          specChanges: {}
        }
      }
      
      let changeFlag = false
      
      Object.entries(changes).forEach(([property, newValue]) => {
        const oldValue =  prevNode.data.spec[property]

        if(oldValue !== newValue) {
          changeFlag = true

          historyChanges[nodeId].specChanges[property] = {
            prevValue: oldValue,
            currValue: newValue
          }
          historyChanges[nodeId].specChanges[property].currValue = newValue
        } else if (oldValue === newValue) {
          delete historyChanges[nodeId].specChanges[property]
        }
      })

      if(changeFlag) {
        historyChanges[nodeId].status = 'modified'
        historyChanges[nodeId].userName = userName
        historyChanges[nodeId].label = prevNode.data.spec.label

        const updatedNodes = nodes.map(node => {
          if(node.id === nodeId) {
            const updatedSpec = {...node.data.spec}

            Object.entries(changes).forEach(([property, newValue]) => {
              updatedSpec[property] = newValue
            })
            return {...node, data:{...node.data, status:"edit", spec: updatedSpec}}
          }
          return node
        })
        if(prevNode.data.type === 'BlockStorage' && 'attached_to' in changes) {
          const newComputeId = changes['attached_to']
          const prevEdge = edges.find(e => e.source === nodeId)
          if(prevEdge) {
            const edgeIndex = edges.findIndex(e => e.id === prevEdge.id)
            // console.log(edgeIndex)
            const updatedEdge = {
              ...prevEdge,
              target: newComputeId
            }
            yEdges.delete(edgeIndex, 1)
            yEdges.insert(edgeIndex, [updatedEdge])
          }
        }

        yNodes.delete(0, yNodes.length)
        yNodes.insert(0, updatedNodes)
        projectHistory.set('nodes', historyChanges)
      }
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

  undo: (userId: string, userName:string, yDoc:Y.Doc): Node[] | null  => {
    if (!yDoc) return null
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    
    const userStack = userActionHistory?.get(userId)
    if (!userStack || userStack.undoStack.length === 0) return null
    
    const action = userStack.undoStack.pop()!
    const yNodes = yDoc.getArray<Node>('nodes')

    let undoNodes: Node[] = []
  
    yDoc.transact(() => {
      const currentNodes = yNodes.toArray()
      const changes = projectHistory.get('nodes') || {}

      switch (action.type) {
        case 'add':
          if (action.nodes) {
            const updatedNodes = currentNodes.map(node => {
              const actionNode = action.nodes?.find(an => an.id === node.id)
              if (actionNode) {
                return { ...node, data: {...node.data, status: 'remove'}}
              }
              return node
            })

            action.nodes.forEach(node => {
              if(changes[node.id] && changes[node.id].status === 'added') {
                delete changes[node.id]
              } else {
                changes[node.id] = {
                  userId: userId,
                  userName: userName,
                  status: 'removed',
                  label: node.data.spec.label,
                  specChanges: {...node.data.spec}
                }
              }
            })
            yNodes.delete(0, yNodes.length)
            yNodes.insert(0, updatedNodes)
            undoNodes = updatedNodes
          }
          break
        case 'remove':
          if (action.nodes) { 
            const updatedNodes = currentNodes.map(node => {
              const actionNode = action.nodes?.find(an => an.id === node.id)
              if (actionNode) {
                return { ...node, data: {...node.data, status: actionNode.data.status}}
              }
              return node
            })
            
            action.nodes.forEach(node => {
              if(changes[node.id] && changes[node.id].status === 'removed') {
                delete changes[node.id]
              } else {
                changes[node.id] = {
                  userId: userId,
                  userName: userName,
                  status: 'added',
                  label: node.data.spec.label,
                  specChanges: {...node.data.spec}
                }
              }
            })

            yNodes.delete(0, yNodes.length)
            yNodes.insert(0, updatedNodes)
            undoNodes = updatedNodes
          }
          break
      }
      userActionHistory.set(userId, userStack)
      projectHistory.set('nodes', changes)
    })
    return undoNodes
  },

  initAllYDoc: (yDoc:Y.Doc) => {
    const yNodes = yDoc.getArray<Node>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    yNodes.delete(0, yNodes.length)
    yEdges.delete(0, yEdges.length)
    projectHistory.delete('nodes')
  }
}