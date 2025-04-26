'use client'

import { useCallback, useEffect, useRef, useState } from 'react' 
import ReactFlow, {
  MiniMap, Controls, Background,
  useNodesState, useEdgesState, addEdge,
  Connection, Edge, Node, BackgroundVariant, ConnectionMode,
  EdgeChange, NodeChange, MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { WebrtcProvider } from 'y-webrtc'
import ResourceNode from './node'
import ArrowEdge from './edge'
import { useFlowMapStore } from '@/store/flowMapStore'


interface User {
  id: string
  name: string
  color: string
}

const nodeTypes = { resource: ResourceNode }
const edgeTypes = { edge: ArrowEdge }

const initialNodes: Node[] = [
  {
    id: '1',                         
    type: 'resource',  
    position: { x: 500, y: 300 },
    data: { type: 'EC2' },
  },
  {
    id: '2',
    type: 'resource',
    position: { x: 400, y: 400 },
    data: { type: 'S3' },
  },
  {
    id: '3',
    type: 'resource',
    position: { x: 600, y: 400 },
    data: { type: 'RDS' },
  },
]

export default function FlowMap() {
  const { 
    nodes, edges, setNodes, setEdges, 
    updateNodePosition, initYjs, yDoc, 
    pushToUndoStack, undo, 
    initUserStacks, userId, userName,
  } = useFlowMapStore()

  const [selectedNodes, setSelectedNodes] = useState<Node[]>([])
  const [connectedUsers, setConnectedUsers] = useState<User[]>([])
  
  const [clipboard, setClipboard] = useState<{nodes: Node[], edges: Edge[]} | null>(null)

  const webRtcProviderRef = useRef<WebrtcProvider>(null)

  const getCurrentUserId = useCallback(() => {
    const state = webRtcProviderRef.current?.awareness.getLocalState()
    return state?.user?.id || null
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!webRtcProviderRef.current) return
      const userId = getCurrentUserId()
      if(!userId) return

      if (event.metaKey || event.ctrlKey) {
        switch(event.key) {
          case 'c':
            if (selectedNodes.length > 0) {
              setClipboard({
                nodes: selectedNodes,
                edges: edges.filter(e => 
                  selectedNodes.some(n => n.id === e.source || n.id === e.target)
                )
              })
            }
            break

          case 'v':
            if (clipboard) {
              let counter = 0;
              const newNodes = clipboard.nodes.map(node => ({
                ...node,
                id: `${node.id}-${Date.now()}-${counter++}`,
                position: {
                  x: node.position.x + 50,
                  y: node.position.y + 50
                }
              }))

              pushToUndoStack(userId, {
                type: 'add',
                nodes: newNodes,
                timestamp: Date.now()
              })

              setNodes([...nodes, ...newNodes])
            }
            break

          case 'z':
            undo(userId)
            break

          case 'x':
            if (selectedNodes.length > 0) {
              setClipboard({
                nodes: selectedNodes,
                edges: edges.filter(e => 
                  selectedNodes.some(n => n.id === e.source || n.id === e.target)
                )
              })

              pushToUndoStack(userId, {
                type: 'remove',
                nodes: selectedNodes,
                timestamp: Date.now()
              })

              setNodes(nodes.filter(n => 
                !selectedNodes.find(sn => sn.id === n.id)
              ))
            }
            break
        }
      }
    }

    // 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown)

    // 클린업 함수
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedNodes, clipboard, nodes, edges, setNodes, pushToUndoStack, undo, getCurrentUserId])

  useEffect(() => {
    if(yDoc === null) {
      initYjs(initialNodes, [])
    }
  }, [])

  useEffect(() => {
    if(yDoc) {
      initUserStacks()
    }
  }, [yDoc])

  useEffect(() => {
    if(yDoc && !webRtcProviderRef.current) {
      const webrtcProvider = new WebrtcProvider('cloud-diagram', yDoc, {
        signaling: [
          'wss://signaling.yjs.dev',
          'wss://y-webrtc-signaling-eu.herokuapp.com',
          'wss://y-webrtc-signaling-us.herokuapp.com'
        ],
        password: '1234'
      })
      webRtcProviderRef.current = webrtcProvider

      const userColor = getRandomColor()
      webrtcProvider.awareness.setLocalStateField('user', {
        id: userId,
        name: userName,
        color: userColor
      })

      const trackConnectedUsers = () => {
        const states = Array.from(webrtcProvider.awareness.getStates().values())
        const users = states
          .filter(state => state.user)
          .map(state => ({
            id: state.user.id,
            name: state.user.name,
            color: state.user.color
          }))
        setConnectedUsers(users)
      }

      webrtcProvider.awareness.on('change', trackConnectedUsers)
      trackConnectedUsers()
    }
  }, [yDoc, userId, userName])

  const handleNodeSelected = useCallback(({ nodes }: { nodes: Node[] }) => {
    setSelectedNodes(nodes)
  }, [])

  const handleNodePosition = useCallback((changes: NodeChange[]) => {
    const positionChange = changes.find(change => change.type === 'position')

    if (positionChange && 'position' in positionChange && positionChange.position) {
      updateNodePosition(positionChange.id, positionChange.position)
    }
  }, [updateNodePosition])

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <div className="absolute top-22 right-4 z-10">
        <div className="flex gap-2">
          {connectedUsers.map((user) => (
            <div
              key={user.id}
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: user.color, color: 'white' }}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodePosition}
        onSelectionChange={handleNodeSelected}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        connectionMode={ConnectionMode.Strict}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

function getRandomColor() {
  const colors = [
    '#2196F3',  // Material Blue
    '#F44336',  // Material Red
    '#4CAF50',  // Material Green
    '#FFC107',  // Material Amber
    '#9C27B0'   // Material Purple
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}