'use client'
import React, { useCallback } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  ConnectionMode,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ResourceNode from './node'

const nodeTypes = {
  resource: ResourceNode,
}

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

export default function CloudFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params: Connection) => {
      // 새로운 엣지 객체 생성
      const newEdge = {
        ...params,  // 기본 연결 정보 (source, target 등) 복사
        type: 'smoothstep',  // 부드러운 곡선 형태의 연결선
        animated: true,      // 연결선에 애니메이션 효과 추가
        style: { stroke: '#94a3b8' }  // 연결선 색상을 회색으로 설정
      }
      // 기존 엣지 배열에 새로운 엣지 추가
      setEdges((eds) => addEdge(newEdge, eds))
    },
    [setEdges],  // 의존성 배열
  )

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        connectionMode={ConnectionMode.Loose}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}