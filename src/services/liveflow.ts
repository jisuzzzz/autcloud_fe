import { Node, Edge } from "reactflow"
import * as Y from 'yjs'
import { CommandList, CommandItem, ProjectChanges } from "@/lib/projectDB"
import { CommandService } from "./command"

interface UserAction {
  type: 'add' | 'remove' | 'edit'
  nodeId: string,
  changes?: Record<string, string>
  timestamp: number
}

interface UserStack {
  undoStack: UserAction[]
}

const STACK_TIMEOUT = 1000*60*10

const findYNode = (yNodes: Y.Array<Y.Map<any>>, nodeId: string) => {
  const nodeIdx = yNodes.toArray().findIndex(node => node.get('id') === nodeId)
  if (nodeIdx === -1) return null
  
  const node = yNodes.get(nodeIdx)
  if (!node) return null

  return { node, nodeIdx }
}


export const LiveFlowService = {

  initNodes: (initialNodes:Node[], initialEdges:Edge[], yDoc:Y.Doc) => {
    if(!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')

    if (yNodes.length === 0) {
      const yMapNodes = initialNodes.map(node => {
        const yNode = new Y.Map()

        yNode.set('id', node.id)
        yNode.set('type', node.type)
        yNode.set('data', node.data)
        yNode.set('position', {
          x: node.position.x,
          y: node.position.y
        })
        
        return yNode
      })
      yNodes.insert(0, yMapNodes)
    }
    if (yEdges.length === 0) {
      yEdges.insert(0, initialEdges)
    }
  },

  // 사용자별 undo 스택 초기화 함수, 마지막 액션으로 타임아웃 10분
  // Y.js의 공유 데이터 구조에서 사용자별 작업 이력을 관리하는 맵을 초기화
  // todo: 아마 초기화 안될거임... 다시 해야 할 듯
  initUserActionHistory: (userId:string, yDoc:Y.Doc) => {
    if(!yDoc) return
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
  
    if (!userActionHistory.has('userActionHistory')) {
      yDoc.getMap('userActionHistory')
    }
  
    yDoc.transact(() => {
      const existingStack = userActionHistory.get(userId)
      if(existingStack) {
        const lastActionTime = existingStack.undoStack[existingStack.undoStack.length - 1]?.timestamp || 0
        if(Date.now() - lastActionTime > STACK_TIMEOUT) {
          userActionHistory.set(userId, {undoStack: []})
        }
      } else {
        userActionHistory.set(userId, { undoStack: [] })
      }
    })
  },
  
  initProjectHistory: (yDoc: Y.Doc) => {
    if(!yDoc) return
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    // projectHistory.delete('nodes')
    if (!projectHistory.has('nodes')) {
      projectHistory.set('nodes', {})
    }
  },

  updateNodePosition: (nodeId: string, point: {x: number, y: number}, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    
    yDoc.transact(() => {
      const ynode = findYNode(yNodes, nodeId)
      if (!ynode) return
  
      ynode.node.set('position', {
        x: point.x,
        y: point.y
      })
    })
  },

  addNode : (node: Node, userId:string, userName:string, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')

    yDoc.transact(() => {
      const yNode = new Y.Map()
      yNode.set('id', node.id)
      yNode.set('type', node.type)
      yNode.set('data', node.data)
      yNode.set('position', {
        x: node.position.x,
        y: node.position.y
      })
      yNodes.push([yNode])

      const changes = projectHistory.get('nodes') || {}
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
      
      projectHistory.set('nodes', changes)
    })
  },

  removeNodeV2 : (nodeId: string, userId:string, userName: string, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    
    yDoc.transact(() => {
      const changes = projectHistory.get('nodes') || {}

      const ynode = findYNode(yNodes, nodeId)
      if (!ynode) return
      
      const currData = ynode.node.get('data')
      
      ynode.node.set('data', {
        ...currData,
        status: 'remove'
      })

      const existingChange = changes[nodeId]
      if(existingChange && existingChange.status === 'added') {
        delete changes[nodeId]
      } else {
        changes[nodeId] = {
          userId: userId,
          userName:userName,
          status: 'removed',
          label: currData.spec.label,
          specChanges: {}
        }
        const specProperties = Object.keys(currData.spec)
        specProperties.forEach(property => {
          changes[nodeId].specChanges[property] = {
            prevValue: currData.spec[property],
            currValue: null
          }
        })
      }
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
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    
    yDoc.transact(() => {
      const ynode = findYNode(yNodes, nodeId)
      if(!ynode) return

      const prevData = ynode.node.get('data')

      const edges = yEdges.toArray() as Edge[]
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
        const oldValue =  prevData.spec[property]

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
        historyChanges[nodeId].label = prevData.spec.label

        const updatedSpec = {...prevData.spec}
        Object.entries(changes).forEach(([field, newValue]) => {
          updatedSpec[field] = newValue
        })

        ynode.node.set('data', {
          ...prevData,
          status: 'edit',
          spec: updatedSpec
        })

        if(prevData.type === 'BlockStorage' && 'attached_to' in changes) {
          const newComputeId = changes['attached_to']
          const prevEdge = edges.find(e => e.source === nodeId)
          if(prevEdge) {
            const edgeIndex = edges.findIndex(e => e.id === prevEdge.id)
            const updatedEdge = {
              ...prevEdge,
              target: newComputeId
            }
            yEdges.delete(edgeIndex, 1)
            yEdges.insert(edgeIndex, [updatedEdge])
          }
        }
        projectHistory.set('nodes', historyChanges)
      }
    })
  },

  pushToUndoStack: (userId: string, action: UserAction, yDoc: Y.Doc) => {
    if (!yDoc) return
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')

    yDoc.transact(() => {
      const userStack = userActionHistory.get(userId) || { undoStack: [] }

      userStack.undoStack.push(action)
      userActionHistory.set(userId, userStack) // 변경된 스택을 다시 저장
    })
  },

  undo: (userId: string, userName:string, yDoc:Y.Doc)  => {
    if (!yDoc) return null

    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    
    const userStack = userActionHistory?.get(userId)
    if (!userStack || userStack.undoStack.length === 0) return null
    
    const action = userStack.undoStack.pop()!
  
    yDoc.transact(() => {
      const changes = projectHistory.get('nodes') || {}
      const actionNodeId = action.nodeId
      if(!actionNodeId) return
      switch (action.type) {
        case 'add':
          if (actionNodeId) {
            const actionNode = findYNode(yNodes, actionNodeId)
            if(!actionNode) return

            const actionNodeData = actionNode.node.get('data')
            actionNode.node.set('data', {
              ...actionNodeData,
              status: 'remove'
            })

            if(changes[actionNodeId] && changes[actionNodeId].status === 'added') {
              delete changes[actionNodeId]
            } else {
              changes[actionNodeId] = {
                userId: userId,
                userName: userName,
                status: 'removed',
                label: actionNodeData.spec.label,
                specChanges: {...actionNodeData.spec}
              }
            }
          }
          break
          
        case 'remove':
          if (actionNodeId) {
            const actionNode = findYNode(yNodes, actionNodeId)
            if(!actionNode) return

            const actionNodeData = actionNode.node.get('data')
            actionNode.node.set('data', {
              ...actionNodeData,
              status: 'add'
            })

            if(changes[actionNodeId] && changes[actionNodeId].status === 'removed') {
              delete changes[actionNodeId]
            } else {
              changes[actionNodeId] = {
                userId: userId,
                userName: userName,
                status: 'added',
                label: actionNodeData.spec.label,
                specChanges: {...actionNodeData.spec}
              }
            }
          }
          break
        
        case 'edit':
          if (actionNodeId) {
            const actionNode = findYNode(yNodes, actionNodeId)
            if(!actionNode) return
        
            const currData = actionNode.node.get('data')
            const specChanges = changes[actionNodeId].specChanges
            const revertedSpec = {...currData.spec}
        
            Object.entries(specChanges).forEach(([key, value]) => {
              revertedSpec[key] = value.prevValue
            })
        
            actionNode.node.set('data', {
              ...currData,
              status: 'add',
              spec: revertedSpec
            })
            delete changes[actionNodeId]
          }
          break
      }
      userActionHistory.set(userId, userStack)
      projectHistory.set('nodes', changes)
    })
  },

  initAllYDoc: (yDoc:Y.Doc) => {
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory') 
    yNodes.delete(0, yNodes.length)
    yEdges.delete(0, yEdges.length)
    for (const key of userActionHistory.keys()) {
      userActionHistory.delete(key)
    }
    projectHistory.delete('nodes')
  },

  CreateCommandList: (yDoc: Y.Doc, userId?: string) => {
    if(!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const projectHistory = yDoc.getMap<ProjectChanges>('projectHistory')

    const commandList: CommandList = []
    const commandMap: Record<string, 
      Record<string, (node: Node, userId?: string) => CommandItem>> = {

      Compute: {
        add: (node, userId) => CommandService.createComputeCommand(node, userId!),
        edit: (node) => CommandService.updateComputeCommand(node),
        remove: (node) => CommandService.deleteComputeCommand(node),
      },

      Database: {
        add: (node) => CommandService.createDBCommand(node),
        edit: (node) => CommandService.updateDBCommand(node),
        remove: (node) => CommandService.deleteDBCommand(node),
      },

      ObjectStorage: {
        add: (node) => CommandService.createObjectCommand(node),
        edit: (node) => CommandService.updateObjectCommand(node),
        remove: (node) => CommandService.deleteObjectCommand(node),
      },

      BlockStorage: {
        add: (node) => CommandService.createBlockCommand(node),
        edit: (node) => CommandService.updateBlockCommand(node),
        remove: (node) => CommandService.deleteBlockCommand(node),
      },

      FireWall: {
        add: (node) => CommandService.createFirewallCommand(node),
        edit: (node) => CommandService.updateFirewallCommand(node),
        remove: (node) => CommandService.deleteFirewallCommand(node),
      },
    }

    yDoc.transact(() => {
      const changes = projectHistory.get('nodes') || {}

      yNodes.forEach((ynode) => {
        const nodeData = ynode.get('data')
        const { type, status } = nodeData
        const node = {
          id: ynode.get('id') as string,
          type: ynode.get('type') as string,
          position: ynode.get('position'),
          data: nodeData
        } as Node

        const command = commandMap[type]?.[status]
        if(command) {
          commandList.push(command(node, userId))
        }

        if(node.data.type === 'BlockStorage') {
          const prevAttachTo = changes[node.id]?.specChanges?.attached_to?.prevValue?.toString()
          if(prevAttachTo) {
            const firstAttach = CommandService.attachCommand(node,prevAttachTo)
            commandList.push(firstAttach)
            const detachCommand = CommandService.detachCommand(node)
            commandList.push(detachCommand)
          }
          const currAttachTo = node.data.spec.attached_to
          const attachCommand = CommandService.attachCommand(node, currAttachTo)
          commandList.push(attachCommand)
        }

        if (node.data.type === 'FireWall' && node.data.spec.rules) {
          const ruleCommands = CommandService.createRuleCommands(node)
          commandList.push(...ruleCommands)
        }

      })

    })
    // console.log(commandList)
  },

}