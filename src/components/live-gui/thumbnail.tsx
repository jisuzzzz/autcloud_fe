'use client';
import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Node,
  Edge,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ResourceConfig, ProjectTemplate } from '@/lib/projectDB';
import ResourceNode from './node';
import Image from 'next/image';

// 노드 스타일 정의
const nodeStyles = {
  Compute: { backgroundColor: '#e6f7ff', borderColor: '#1890ff' },
  Database: { backgroundColor: '#f6ffed', borderColor: '#52c41a' },
  BlockStorage: { backgroundColor: '#fff7e6', borderColor: '#fa8c16' },
  ObjectStorage: { backgroundColor: '#f9f0ff', borderColor: '#722ed1' },
  FireWall: { backgroundColor: '#fff1f0', borderColor: '#f5222d' },
};

// ResourceNode 컴포넌트를 기반으로 한 핸들러 없는 커스텀 노드
const ThumbnailNode = ({ data }) => {
  return (
    <div className="w-12 h-12 p-2 relative flex flex-col items-center justify-center">
      <Image
        alt='resources-icons'
        src={resourceIcons[data.type as keyof typeof resourceIcons]}
        fill
        className="object-contain rounded-xs"
      />
      <div className="fixed top-[70px] w-[200px] text-xs font-medium text-gray-700 text-center mt-1">
        {data.type}
      </div>
    </div>
  );
};

// 리소스 아이콘 정의
const resourceIcons = {
  Compute: '/aut-compute.svg',
  ObjectStorage: '/aut-objectstorage.svg',
  Database: '/aut-database.svg',
  BlockStorage: '/aut-blockstorage.svg',
  FireWall: '/aut-firewall.svg'
};

// 노드 타입 정의 수정
const nodeTypes = { 
  resource: ThumbnailNode 
};

interface ProjectThumbnailProps {
  project: ProjectTemplate;
  width?: number;
  height?: number;
}

const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({
  project,
  width = 300,
  height = 200,
}) => {
  // ResourceConfig를 ReactFlow의 Node 형식으로 변환
  const nodes: Node[] = useMemo(() => {
    return project.initial_resources.map((resource: ResourceConfig) => ({
      id: resource.id,
      type: 'resource', // 커스텀 노드 타입으로 변경
      position: {
        x: resource.position.x * 0.6, // 썸네일에 맞게 축소
        y: resource.position.y * 0.6, // 썸네일에 맞게 축소
      },
      data: {
        label: resource.spec.label || resource.type,
        type: resource.type
      },
    }));
  }, [project]);

  // // BlockStorage 타입의 리소스에서 엣지 생성
  // const edges: Edge[] = useMemo(() => {
  //   return project.initial_resources
  //     .filter(
  //       (resource) =>
  //         resource.type === 'BlockStorage' &&
  //         (resource.spec as any).attached_to
  //     )
  //     .map((resource) => ({
  //       id: `e-${resource.id}-${(resource.spec as any).attached_to}`,
  //       source: resource.id,
  //       target: (resource.spec as any).attached_to,
  //       type: 'default',
  //       markerEnd: {
  //         type: MarkerType.ArrowClosed,
  //         width: 10,
  //         height: 10,
  //       },
  //       style: { strokeWidth: 1 },
  //     }));
  // }, [project]);


  const allNodes = [ ...nodes];

  return (
    <div style={{ width, height, borderRadius: '8px', overflow: 'hidden' }}>
      <ReactFlow
        nodes={allNodes}
        // edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
        minZoom={0.5}
        maxZoom={0.5}
        // defaultZoom={0.5}
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
        // connectionMode={ConnectionMode.Loose}
      >
        {/* <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="#f0f0f0"
        /> */}
      </ReactFlow>
    </div>
  );
};

export default ProjectThumbnail;