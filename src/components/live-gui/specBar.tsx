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
  ResourceConfig,
  ComputeSpecType,
  DatabaseSpecType,
  BlockStorageSpecType,
  ObjectStorageSpecType,
  FirewallSpecType,
} from '@/lib/projectDB';
import Image from 'next/image';
import { StartEditButton } from './resourceEdit';

interface SpecBarProps {
  resources: ResourceConfig[];
}

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
          <p className="text-sm">{children}</p>
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
      className={cn('flex flex-col space-y-4 px-4 py-4 border-b', className)}
    >
      {children}
    </div>
  );
}

export default function SpecBar({ resources }: SpecBarProps) {
  const [selectedResource, setSelectedResource] =
    useState<ResourceConfig | null>(null);
  const me = useSelf();
  const [isEditing] = useState(false);

  useEffect(() => {
    // 유저가 처음 선택한 노드 id
    const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0];
    // console.log(selectedNodeId)
    if (selectedNodeId && resources) {
      const resource = resources.find((r) => r.id === selectedNodeId);
      setSelectedResource(resource || null);
    } else {
      setSelectedResource(null);
    }
  }, [me?.presence.selectedNodes, resources]);

  const getResourceType = (type: string) => {
    switch (type) {
      case 'Compute':
        return 'Instance';
      case 'Database':
        return 'Managed Database';
      case 'BlockStorage':
        return 'Block Storage';
      case 'ObjectStorage':
        return 'Object Storage';
      case 'FireWall':
        return 'Firewall';
      default:
        return 'Resource';
    }
  };

  return selectedResource ? (
    <div className="md:block hidden fixed top-[55px] right-0 bg-white border-l w-[256px] h-screen z-40">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="gap-3 flex items-center">
          <Image
            alt="compute instance"
            src={`/aut-${selectedResource.type.toLowerCase()}.svg`}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-sm font-medium">
            {getResourceType(selectedResource.type)}
          </h3>
        </div>
        {!isEditing && selectedResource.type === 'Compute' && (
          <StartEditButton
            spec={selectedResource.spec as ComputeSpecType}
            type="Compute"
          />
        )}
        {!isEditing && selectedResource.type === 'Database' && (
          <StartEditButton
            spec={selectedResource.spec as DatabaseSpecType}
            type="Database"
          />
        )}
        {!isEditing && selectedResource.type === 'BlockStorage' && (
          <StartEditButton
            spec={selectedResource.spec as BlockStorageSpecType}
            type="BlockStorage"
          />
        )}
        {!isEditing && selectedResource.type === 'ObjectStorage' && (
          <StartEditButton
            spec={selectedResource.spec as ObjectStorageSpecType}
            type="ObjectStorage"
          />
        )}
        {!isEditing && selectedResource.type === 'FireWall' && (
          <StartEditButton
            spec={selectedResource.spec as FirewallSpecType}
            type="FireWall"
          />
        )}
      </div>
      {selectedResource.type === 'Compute' && (
        <ComputeSpec spec={selectedResource.spec as ComputeSpecType} />
      )}
      {selectedResource.type === 'Database' && (
        <DatabaseSpec spec={selectedResource.spec as DatabaseSpecType} />
      )}
      {selectedResource.type === 'BlockStorage' && (
        <BlockStorageSpec
          spec={selectedResource.spec as BlockStorageSpecType}
        />
      )}
      {selectedResource.type === 'ObjectStorage' && (
        <ObjectStorageSpec
          spec={selectedResource.spec as ObjectStorageSpecType}
        />
      )}
      {selectedResource.type === 'FireWall' && (
        <FirewallSpec spec={selectedResource.spec as FirewallSpecType} />
      )}
    </div>
  ) : null;
}
