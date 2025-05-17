'use client';
import { cn } from '@/lib/utils';
import ComputeSpec from './specs/compute';
import DatabaseSpec from './specs/database';
import BlockStorageSpec from './specs/block-storage';
import ObjectStorageSpec from './specs/object-storage';
import FirewallSpec from './specs/firewall';
import { useState, useEffect } from 'react';
import { useSelf } from '@liveblocks/react';
import {
  ComputeSpecType,
  DatabaseSpecType,
  BlockStorageSpecType,
  ObjectStorageSpecType,
  FirewallSpecType,
  ResourceNodeType,
} from '@/lib/projectDB';
import Image from 'next/image';
import { StartEditButton } from './resourceEdit';
import { useYjsStore } from '@/lib/useYjsStore';
import { Edge, Node } from 'reactflow';

export function InfoIcon({ label }: { label: string }) {
  return (
    <div className="rounded-full bg-gray-400 w-4 h-4 flex items-center justify-center">
      <p className="text-white text-sm">{label}</p>
    </div>
  );
}

export function InfoItem({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs text-gray-500">{label}</h3>
      <div className="flex items-center gap-2">
        {typeof children === 'string' ? (
          <p className="text-xs">{children}</p>
        ) : (
          children
        )}
        {icon}
      </div>
    </div>
  );
}

export function SpecSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('flex flex-col space-y-2 px-4 py-4 border-b', className)}
    >
      {children}
    </div>
  );
}

interface SpecBarProps {
  setNodes: (updater: (prev: Node[]) => Node[]) => void 
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
  node: Node
}

export default function SpecBar({setNodes, setEdges, node}: SpecBarProps) {

  const [selectedResource, setSelectedResource] = useState<Node | null>(null)
  const me = useSelf();
  const  {yDoc} = useYjsStore()

  useEffect(() => {
    setSelectedResource(node)
  }, [node])
  
  //md:block hidden 

  return selectedResource ? (
    <div className="fixed top-[55px] right-0 bg-white border-l w-[256px] h-screen z-40">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="gap-3 flex items-center">
          <Image
            alt="compute instance"
            src={`/aut-${selectedResource.data.type.toLowerCase()}.svg`}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-xs font-medium">
            {selectedResource?.data?.spec.label}
          </h3>
        </div>
        <StartEditButton
          resource={selectedResource as ResourceNodeType}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
      {selectedResource.data.type === 'Compute' && (
        <ComputeSpec spec={selectedResource.data.spec as ComputeSpecType} />
      )}
      {selectedResource.data.type === 'Database' && (
        <DatabaseSpec spec={selectedResource.data.spec as DatabaseSpecType} />
      )}
      {selectedResource.data.type === 'BlockStorage' && (
        <BlockStorageSpec
          spec={selectedResource.data.spec as BlockStorageSpecType}
        />
      )}
      {selectedResource.data.type === 'ObjectStorage' && (
        <ObjectStorageSpec
          spec={selectedResource.data.spec as ObjectStorageSpecType}
        />
      )}
      {selectedResource.data.type === 'FireWall' && (
        <FirewallSpec spec={selectedResource.data.spec as FirewallSpecType} />
      )}
    </div>
  ) : null;
}