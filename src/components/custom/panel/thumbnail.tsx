'use client';
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { toPng } from 'html-to-image'
import ReactFlow, { Node,} from 'reactflow'
import 'reactflow/dist/style.css'
import { ResourceConfig, ProjectTemplate } from "@/types/type"
import Image from 'next/image'


const ThumbnailNode = ({ data }:{data:any}) => {
  return (
    <div className="w-9 h-9 relative flex flex-col items-center justify-center">
      <Image
        alt='resources-icons'
        src={resourceIcons[data.type as keyof typeof resourceIcons]}
        fill
        className="object-contain rounded-xs"
      />
      <div className="fixed top-[40px] w-[50px] text-[9px] font-medium text-gray-700 text-center mt-1">
        {data.type}
      </div>
    </div>
  );
};

const resourceIcons = {
  Compute: '/aut-compute.svg',
  ObjectStorage: '/aut-objectstorage.svg',
  Database: '/aut-database.svg',
  BlockStorage: '/aut-blockstorage.svg',
  FireWall: '/aut-firewall.svg'
};

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
  const ref = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const nodes: Node[] = useMemo(() => {
    return project.initial_resources.map((resource: ResourceConfig) => ({
      id: resource.id,
      type: 'resource',
      position: {
        x: resource.position.x * (width / 300),
        y: resource.position.y * (height / 500),
      },
      data: {
        label: resource.attribute.label || resource.type,
        type: resource.type
      },
    }));
  }, [project, width, height]);

  useEffect(() => {
    // ReactFlow가 렌더링되고 난 후에 이미지 생성
    const timer = setTimeout(async () => {
      if (ref.current) {
        try {
          const dataUrl = await toPng(ref.current, {
            quality: 1,
            width,
            height,
          });
          setImageUrl(dataUrl);
        } catch (error) {
          console.error('Error generating thumbnail:', error);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [width, height]);

  return (
    <div
      ref={ref}
      style={{
        width,
        height,
        background: 'F2F2F2',
        overflow: 'hidden'
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Project thumbnail"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          fitView
          zoomOnScroll={false}
          panOnScroll={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}

        >
        </ReactFlow>
      )}
    </div>
  );
};

export default ProjectThumbnail;