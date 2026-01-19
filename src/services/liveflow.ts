import { Node, Edge } from "reactflow"
import * as Y from 'yjs'
import { CommandList, CommandItem,  ProjectHistoryItem, ProjectHistoryChange, } from "@/types/type"
import { CommandService } from "./command"

interface UserAction {
  type: 'add' | 'remove' | 'edit'
  nodeId: string,
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
  
  initProjectHistory: (yDoc: Y.Doc, userId: string, userName: string) => {
    if(!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const projectHistory = yDoc.getArray<ProjectHistoryItem>('projectHistory')

    if (projectHistory.length > 0) return

    yDoc.transact(() => {
      const initialHistory: ProjectHistoryItem[] = []

      yNodes.toArray().forEach((ynode) => {
        const nodeId = ynode.get('id')
        const nodeData = ynode.get('data')
        const attribute = nodeData?.attribute
        const resourceType = nodeData?.type

        const changes: ProjectHistoryChange[] = []
        if (attribute) {
          Object.keys(attribute).forEach(property => {
            changes.push({
              property: property,
              prev: null,
              curr: attribute[property]
            })
          })
        }

        const historyItem: ProjectHistoryItem = {
          nodeId: nodeId,
          userId: userId,
          userName: userName,
          action: 'added',
          resourceType: resourceType,
          label: attribute?.label || '',
          timestamp: Date.now(),
          changes: changes
        }

        initialHistory.push(historyItem)
      })

      if (initialHistory.length > 0) {
        projectHistory.push(initialHistory)
      }
    })
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
    const projectHistory = yDoc.getArray<ProjectHistoryItem>('projectHistory')
    
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

      const changes: ProjectHistoryChange[] = []
      const addedAttribute = node.data.attribute
      if (addedAttribute) {
        const attributeProperties = Object.keys(addedAttribute)
        attributeProperties.forEach(property => {
          changes.push({
            property: property,
            prev: null,
            curr: addedAttribute[property],
          })
        })
      }

      const historyItem: ProjectHistoryItem = {
        nodeId: node.id,
        userId: userId,
        userName: userName,
        action: 'added',
        resourceType: node.data.type,
        label: node.data.attribute?.label || '',
        timestamp: Date.now(),
        changes: changes
      }
      
      projectHistory.push([historyItem])
    })
  },

  removeNodeV2 : (nodeId: string, userId:string, userName: string, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const projectHistory = yDoc.getArray<ProjectHistoryItem>('projectHistory')
    
    yDoc.transact(() => {
      const ynode = findYNode(yNodes, nodeId)
      if (!ynode) return
      
      const currData = ynode.node.get('data')
      
      ynode.node.set('data', {
        ...currData,
        status: 'remove'
      })

      const changes: ProjectHistoryChange[] = []
      const attributeProperties = Object.keys(currData.attribute)
      attributeProperties.forEach(property => {
        changes.push({
          property: property,
          prev: currData.attribute[property],
          curr: null,
        })
      })

      const historyItem: ProjectHistoryItem = {
        nodeId: nodeId,
        userId: userId,
        userName: userName,
        action: 'removed',
        resourceType: currData.type,
        label: currData.attribute.label,
        timestamp: Date.now(),
        changes: changes
      }

      projectHistory.push([historyItem])
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

  editNodeV2: (nodeId:string, changes: Record<string, string>, userId: string, userName:string, attribute: any, yDoc: Y.Doc) => {
    if (!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const yEdges = yDoc.getArray<Edge>('edges')
    const projectHistory = yDoc.getArray<ProjectHistoryItem>('projectHistory')
    
    yDoc.transact(() => {
      const ynode = findYNode(yNodes, nodeId)
      if(!ynode) return

      const prevData = ynode.node.get('data')
      const edges = yEdges.toArray() as Edge[]

      const historyChanges: ProjectHistoryChange[] = []
      let changeFlag = false
      
      Object.entries(changes).forEach(([property, newValue]) => {
        const oldValue = attribute && attribute[property] !== undefined ? attribute[property] : undefined

        if(oldValue !== newValue && oldValue !== undefined) {
          changeFlag = true
          historyChanges.push({
            property: property,
            prev: oldValue,
            curr: newValue,
          })
        }
      })

      if(changeFlag) {
        const historyItem: ProjectHistoryItem = {
          nodeId: nodeId,
          userId: userId,
          userName: userName,
          action: 'modified',
          resourceType: prevData.type,
          label: prevData.attribute.label,
          timestamp: Date.now(),
          changes: historyChanges
        }

        projectHistory.push([historyItem])

        const updatedAttribute = {...prevData.attribute}
        Object.entries(changes).forEach(([field, newValue]) => {
          if (field in updatedAttribute) {
            updatedAttribute[field] = newValue
          }
        })

        ynode.node.set('data', {
          ...prevData,
          status: 'edit',
          attribute: updatedAttribute
        })

        if(prevData.type === 'BlockStorage' && 'attached_to_instance' in changes) {
          const newComputeId = changes['attached_to_instance']
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
      }
    })
  },

  pushToUndoStack: (userId: string, action: UserAction, yDoc: Y.Doc) => {
    if (!yDoc) return
    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')

    yDoc.transact(() => {
      const userStack = userActionHistory.get(userId) || { undoStack: [] }

      userStack.undoStack.push(action)
      userActionHistory.set(userId, userStack)
    })
  },

  undo: (userId: string, userName:string, yDoc:Y.Doc)  => {
    if (!yDoc) return null

    const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
    const projectHistory = yDoc.getArray<ProjectHistoryItem>('projectHistory')
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    
    const userStack = userActionHistory?.get(userId)
    if (!userStack || userStack.undoStack.length === 0) return null
    
    const action = userStack.undoStack.pop()!
  
    yDoc.transact(() => {
      const actionNodeId = action.nodeId
      if(!actionNodeId) return

      const history = projectHistory.toArray()
      const nodeHistory = history
        .filter(item => item.nodeId === actionNodeId)
        .sort((a, b) => a.timestamp - b.timestamp)
      
      if(nodeHistory.length === 0) return

      const lastHistoryItem = nodeHistory[nodeHistory.length - 1]
      const lastHistoryIndex = history.findIndex(item => 
        item.nodeId === actionNodeId && 
        item.timestamp === lastHistoryItem.timestamp
      )

      if(lastHistoryIndex === -1) return

      const actionNode = findYNode(yNodes, actionNodeId)
      if(!actionNode) return

      const actionNodeData = actionNode.node.get('data')

      switch (action.type) {
        case 'add':
          if(lastHistoryItem.action === 'added') {
            actionNode.node.set('data', {
              ...actionNodeData,
              status: 'remove'
            })
            projectHistory.delete(lastHistoryIndex, 1)
          }
          break
          
        case 'remove':
          if(lastHistoryItem.action === 'removed') {
            projectHistory.delete(lastHistoryIndex, 1)
            
            const updatedHistory = projectHistory.toArray()
            const updatedNodeHistory = updatedHistory
              .filter(item => item.nodeId === actionNodeId)
              .sort((a, b) => a.timestamp - b.timestamp)
            
            const prevItem = updatedNodeHistory[updatedNodeHistory.length - 1]
            const nodeStatus = prevItem?.action === 'modified' ? 'edit' : 'add'

            actionNode.node.set('data', {
              ...actionNodeData,
              status: nodeStatus
            })
          }
          break
        
        case 'edit':
          if(lastHistoryItem.action === 'modified') {
            const revertedAttribute = {...actionNodeData.attribute}
        
            lastHistoryItem.changes.forEach(change => {
              revertedAttribute[change.property] = change.prev
            })

            projectHistory.delete(lastHistoryIndex, 1)

            const updatedHistory = projectHistory.toArray()
            const updatedNodeHistory = updatedHistory
              .filter(item => item.nodeId === actionNodeId)
              .sort((a, b) => a.timestamp - b.timestamp)
            
            const prevItem = updatedNodeHistory[updatedNodeHistory.length - 1]
            const nodeStatus = prevItem?.action === 'modified' 
              ? 'edit'
              : prevItem?.action === 'removed' 
              ? 'remove'
              : 'add'

            actionNode.node.set('data', {
              ...actionNodeData,
              status: nodeStatus,
              attribute: revertedAttribute
            })
          }
          break
      }
      userActionHistory.set(userId, userStack)
    })
  },

  initAllYDoc: (yDoc: Y.Doc, yProvider: any, clearStorageMutation: () => void) => {

    yDoc.gcFilter = () => true 
    yDoc.transact(() => {

      const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
      const yEdges = yDoc.getArray<Edge>('edges')
      const userActionHistory = yDoc.getMap<UserStack>('userActionHistory')
      const projectHistory = yDoc.getArray<ProjectHistoryItem>('projectHistory')
  
      yNodes.delete(0, yNodes.length)
      yEdges.delete(0, yEdges.length)
      userActionHistory.clear()
      projectHistory.delete(0, projectHistory.length)
    })
    clearStorageMutation()

    yProvider.disconnect()
    yDoc.destroy()
  },

  CreateCommandList: (yDoc: Y.Doc, userId?: string) => {
    if(!yDoc) return
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const projectHistory = yDoc.getArray<ProjectHistoryItem>('projectHistory')

    const command_list: CommandList = []
    const commandMap: Record<string, 
      Record<string, (node: Node, userId?: string) => CommandItem>> = {

      Compute: {
        add: (node, userId) => CommandService.createComputeCommand(node, userId!),
        edit: (node) => CommandService.updateComputeCommand(node),
        remove: (node) => CommandService.deleteComputeCommand(node),
      },

      ManagedDatabase: {
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

      FirewallGroup: {
        add: (node) => CommandService.createFirewallCommand(node),
        edit: (node) => CommandService.updateFirewallCommand(node),
        remove: (node) => CommandService.deleteFirewallCommand(node),
      },
    }

    yDoc.transact(() => {
      const history = projectHistory.toArray()

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
        if (!command) return
        
        if (status === 'edit' || status === 'remove') {
          const initCreateCommand = commandMap[type]?.['add']
          if (initCreateCommand) {
            command_list.push(initCreateCommand(node, node.id))
          }
        }
        command_list.push(command(node, userId))

        if(node.data.type === 'BlockStorage') {
          const nodeHistory = history.filter(item => item.nodeId === node.id)
          const attachedChanges = nodeHistory.flatMap(item => 
            item.changes.filter(c => c.property === 'attached_to_instance')
          )
          const prevAttachTo = attachedChanges.length > 0 
            ? attachedChanges[attachedChanges.length - 1]?.prev?.toString()
            : null
          
          if(prevAttachTo) {
            const firstAttach = CommandService.attachCommand(node, prevAttachTo)
            command_list.push(firstAttach)
            const detachCommand = CommandService.detachCommand(node)
            command_list.push(detachCommand)
          }
          const currAttachTo = node.data.attribute.attached_to_instance
          const attachCommand = CommandService.attachCommand(node, currAttachTo)
          command_list.push(attachCommand)
        }

        if (node.data.type === 'FirewallGroup' && node.data.attribute.rules) {
          const ruleCommands = CommandService.createRuleCommands(node)
          command_list.push(...ruleCommands)
        }

      })
    })
    return command_list
  },

}
