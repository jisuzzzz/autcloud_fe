'use client'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react' 
import ReactFlow, {
  MiniMap, Controls, Background,
  useNodesState, useEdgesState, addEdge,
  Connection, Edge, Node, BackgroundVariant, ConnectionMode,
  EdgeChange, NodeChange, MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ResourceNode from './node'
import ArrowEdge from './edge'
import { useYjsStore } from '@/lib/useYjsStore'
import * as Y from 'yjs'
import { useMyPresence, useSelf } from '@liveblocks/react'
import ToolBar from './toolBar'
import SpecBar from './specBar'
import Header from './header'
import { ResourceConfig } from '@/lib/projectDB'
import { ProjectTemplate } from '@/lib/projectDB'
import { LiveFlowService } from '@/services/liveflow'

interface YjsReactFlowProps {
  project: ProjectTemplate  
}

const nodeTypes = { resource: ResourceNode }
const edgeTypes = { edge: ArrowEdge }

const convertToNodes = (resources: ResourceConfig[]): Node[] => {
  return resources.map(resource => ({
    id: resource.id,
    // react-flow node의 랜더링 지정 타입
    type: 'resource',
    position: { x: resource.position.x, y: resource.position.y },
    data: { 
      type: resource.type,
      isConfirm: resource.is_confirm,
      spec: resource.spec
    }
  }))
}

export function YjsReactFlow({ project }: YjsReactFlowProps) {
  const { initial_resources, name, id, description } = project
  // useMemo -> return data를 메모이제이션
  const initialNodes = useMemo(() => convertToNodes(initial_resources), [initial_resources]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  
  const { yDoc }  = useYjsStore()
  const [myPresence, setMyPresence] = useMyPresence()
  const [clipboard, setClipboard] = useState<{nodes: Node[]} | null>(null)
  const [occupiedNode, setoccupiedNode] = useState<Node[]>([])
  // console.log(myPresence)
  const user = useSelf()
  // console.log(user)
  
  useEffect(() => {
    if (!yDoc || !user?.id) return
    const yNodes = yDoc.getArray<Node>('nodes')
    // yNodes.delete(0, yNodes.length)
    LiveFlowService.initNodes(initialNodes, [], yDoc)
    LiveFlowService.initUserActionHistory(user.id, yDoc)
    
  
    const observer = (event: Y.YArrayEvent<Node>, tr: Y.Transaction) => {
      if (event.transaction.local) return
      const updatedNodes = yNodes.toArray() as Node[]
      setNodes(updatedNodes)
    }
    yNodes.observe(observer)

    return () => {
      yNodes.unobserve(observer)
    }
  }, [yDoc, user])

  const handleNodesChange = useCallback((changes: NodeChange[]) => {

    onNodesChange(changes)
    const positionChange = changes.find(change => 
      change.type === 'position' && 'position' in change
    )
    
    if (positionChange && 'position' in positionChange && positionChange.position) {
      LiveFlowService.updateNodePosition(
        positionChange.id,
        positionChange.position,
        yDoc
      )
    }
  }, [onNodesChange, LiveFlowService.updateNodePosition])

  // 노드 선택 처리
  const handleSelectionChange = useCallback(({ nodes: selectedNodes }: { nodes: Node[] }) => {
    const nodeIds = selectedNodes.map(node => node.id)
    setoccupiedNode(selectedNodes)
    setMyPresence({ selectedNodes: nodeIds })
  }, [setMyPresence])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(!yDoc || !user?.id) return
      
      if (event.metaKey || event.ctrlKey) {
        switch(event.key) {
          case 'c':
            if(myPresence === null) return
            setClipboard({ nodes: occupiedNode,})
            break
          
          case 'v':
            if(!clipboard) return
            const toPaste = clipboard.nodes[0]
            const newNode = {
              ...toPaste,
              id: `${toPaste.id}-${Date.now()}`,
              position: {
                x: toPaste.position.x + 50,
                y: toPaste.position.y + 50,
              },
              data: { 
                type: toPaste.data.type,
                isConfirm: true
              },
              selected: false
            }
            setNodes(prev => [...prev, newNode])
            LiveFlowService.addNode(newNode, yDoc)
            LiveFlowService.pushToUndoStack(user.id, {
              type: 'add',
              nodes: [newNode],
              timestamp: Date.now()
            }, yDoc)
            break

          case 'x':
            if(!occupiedNode) return
            setNodes(nodes.filter(n => !occupiedNode.find(sn => sn.id === n.id)))
            occupiedNode.forEach(node => {
              LiveFlowService.removeNode(node.id, yDoc)
            })
            LiveFlowService.pushToUndoStack(user.id, {
              type: 'remove',
              nodes: occupiedNode,
              timestamp: Date.now()
            }, yDoc)
            break
          
          case 'z':
            const undoNodes = LiveFlowService.undo(user.id, yDoc)
            // console.log(useLiveFlowStore.getState().nodes)
            if(!undoNodes) return
            setNodes(undoNodes)
            break
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [occupiedNode, clipboard, nodes, yDoc, user?.id])




  return (
    <div className="h-[calc(100vh)] w-full">
      <Header 
        projectId={id}
        projectName={name} 
        setNodes={setNodes}
      />
      <ToolBar userId={user?.id} setNodes={setNodes}/>
      <SpecBar project={project}/>
      <ReactFlow
        nodes={nodes}
        onSelectionChange={handleSelectionChange}
        onNodesChange={handleNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        connectionMode={ConnectionMode.Strict}
        proOptions={{ hideAttribution: true }}
      >
      </ReactFlow>
  </div>
  );
}
