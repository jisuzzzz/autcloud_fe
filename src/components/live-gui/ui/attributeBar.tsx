'use client'
import { cn } from '@/lib/utils'
import ComputeAttribute from '../attribute/compute'
import DatabaseAttribute from '../attribute/database'
import BlockStorageAttribute from '../attribute/block-storage'
import ObjectStorageAttribute from '../attribute/object-storage'
import FirewallAttribute from '../attribute/firewall'
import { useState, useEffect } from 'react'
import { useSelf } from '@liveblocks/react'
import {
  ComputeAttributeType,
  DatabaseAttributeType,
  BlockStorageAttributeType,
  ObjectStorageAttributeType,
  FirewallAttributeType,
  ResourceNodeType,
} from "@/types/type"
import Image from 'next/image'
import StartEditButton from '../edit/resourceEdit'
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import { Edge, Node } from 'reactflow'
import * as Y from 'yjs'
import { useStorage } from '@liveblocks/react'
import { LiveMap } from '@liveblocks/node'

export function InfoIcon({ label }: { label: string }) {
  return (
    <div className="rounded-full bg-gray-400 w-4 h-4 flex items-center justify-center">
      <p className="text-white text-sm">{label}</p>
    </div>
  )
}

export function InfoItem({
  label,
  children,
  icon,
}: {
  label: string
  children: React.ReactNode
  icon?: React.ReactNode
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
  )
}

export function AttributeSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('flex flex-col font-mono text-xs space-y-2 px-4 py-4 border-b', className)}
    >
      {children}
    </div>
  )
}

interface AttributeBarProps {
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
}

export default function AttributeBar({setEdges}: AttributeBarProps) {

  const [selectedResource, setSelectedResource] = useState<Node | null>(null)
  const me = useSelf()
  const  {yDoc} = useYjsStore()

  const resourceAttribute = useStorage((root) => {
    const store = root.attributeStore as unknown as LiveMap<string, any>
    return selectedResource ? store.get(selectedResource.id) : null
  })


  useEffect(() => {
    if (!yDoc) return

    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')

    const updateAttributeBar = () => {
      const attributeBarNodes = yNodes.toArray().map(ynode => ({
        id: ynode.get('id') as string,
        type: ynode.get('type') as string,
        position: ynode.get('position'),
        data: ynode.get('data')
      })) as Node[]
      
      const selectedNodeId = (me?.presence.selectedNodes as string[])?.[0]
      if (selectedNodeId) {
        const resource = attributeBarNodes.find((r) => r.id === selectedNodeId)
        setSelectedResource(resource || null)
      } else {
        setSelectedResource(null)
      }
    }

    updateAttributeBar()

    const observer = () => updateAttributeBar()
    yNodes.observeDeep(observer)

    return () => {
      yNodes.unobserveDeep(observer)
    }
  }, [yDoc, me?.presence.selectedNodes])
  //md:block hidden 

  return selectedResource ? (
    <div className="md:block hidden  fixed top-[55px] right-0 bg-white border-l w-[256px] h-screen z-40">
      <div className="flex justify-between items-center px-4 py-3 border-b font-mono">
        <div className="gap-3 flex items-center">
          <Image
            alt="compute instance"
            src={`/aut-${selectedResource.data.type.toLowerCase()}.svg`}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-xs font-medium">
            {selectedResource?.data?.attribute.label}
          </h3>
        </div>
        <StartEditButton
          resource={selectedResource as ResourceNodeType}
          setEdges={setEdges}
        />
      </div>
      {selectedResource.data.type === 'Compute' && (
        <ComputeAttribute 
          attribute={resourceAttribute as ComputeAttributeType} />
      )}
      {selectedResource.data.type === 'ManagedDatabase' && (
        <DatabaseAttribute 
          attribute={resourceAttribute as DatabaseAttributeType} />
      )}
      {selectedResource.data.type === 'BlockStorage' && (
        <BlockStorageAttribute
          attribute={resourceAttribute as BlockStorageAttributeType} />
      )}
      {selectedResource.data.type === 'ObjectStorage' && (
        <ObjectStorageAttribute
          attribute={resourceAttribute as ObjectStorageAttributeType}
        />
      )}
      {selectedResource.data.type === 'FirewallGroup' && (
        <FirewallAttribute attribute={selectedResource.data.attribute as FirewallAttributeType} />
      )}
    </div>
  ) : null
}