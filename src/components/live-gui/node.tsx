'use client'
import Image from 'next/image'
import { useOthers, useSelf } from '@liveblocks/react'
import { ComputeAttributeType, DatabaseAttributeType, BlockStorageAttributeType, ObjectStorageAttributeType, FirewallAttributeType } from '@/lib/projectDB'
import { Handle, Position } from 'reactflow'

const resourceIcons = {
  Compute: '/aut-compute.svg',
  ObjectStorage: '/aut-objectstorage.svg',
  Database: '/aut-database.svg',
  BlockStorage: '/aut-blockstorage.svg',
  FireWall: '/aut-firewall.svg'
}

interface NodeProps {
  id:string
  data: {
    type: string
    status: string
    attribute: ComputeAttributeType | DatabaseAttributeType | BlockStorageAttributeType | ObjectStorageAttributeType | FirewallAttributeType
  }
  selected: boolean
}

export default function ResourceNode({ id, data, selected=false }: NodeProps) {
  const users = useOthers()
  const me = useSelf()
  const myColor = me?.info?.color as string || '#FFCA28'

  const isMySelected = Array.isArray(me?.presence.selectedNodes) && 
    me?.presence.selectedNodes.includes(id)

  const isOccupiedByOthers = users.some(user => 
    Array.isArray(user.presence.selectedNodes) && 
    user.presence.selectedNodes.includes(id)
  )
  
  return (
    <>
      <div 
        className={`
          w-13 h-13 relative
          ${isMySelected ? 'ring-2' : ''}
          ${data.status === 'add' ? 'shadow-[0_0_15px_rgba(34,197,94,0.7)]' : ''}
          ${data.status === 'remove' ? 'shadow-[0_0_15px_rgba(239,68,68,0.7)]' : ''}
          ${data.status === 'edit' ? 'shadow-[0_0_15px_rgba(59,130,246,0.7)]' : ''}
          flex flex-col items-center justify-center`
        }
        style={{
          ...(isMySelected && {'--tw-ring-color': myColor}),
          pointerEvents: isOccupiedByOthers ? 'none' : 'auto'
        }}
      >
        <Image
          alt='resources-icons'
          src={resourceIcons[data.type as keyof typeof resourceIcons]}
          fill
          priority
          className="object-contain rounded-xs"
        />
        <div className="fixed top-[60px] w-[200px] text-xs font-medium text-gray-700 text-center mt-1">
          {data.attribute.label}
        </div>
      </div>
      {users.map(({ connectionId, info, presence }) => {
       if(Array.isArray(presence.selectedNodes) && presence.selectedNodes.includes(id)) {
          return (
            <div 
              key={connectionId}
              className='absolute pointer-events-none inset-0'
            >
              <div
                className="absolute -inset-[1px] border-[2px] border-solid"
                style={{
                  borderColor: info?.color as string,
                }}
              />
              <div 
                className="absolute -top-[29px] right-0 py-0 px-1.5 rounded text-xs leading-5 h-5 text-white"
                style={{ background: info?.color as string }}
              >
                {info?.name}
              </div>
            </div>
          )
        }
        return null
      })}
    
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          opacity: 0,
          pointerEvents: 'none'
        }}
        isConnectable={false}
        id="left"
      />
      
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          opacity: 0,
          pointerEvents: 'none'
        }}
        isConnectable={false}
        id="right"
      />

      <Handle 
        type="target" 
        position={Position.Bottom} 
        style={{ 
          opacity: 0,
          pointerEvents: 'none'
        }}
        isConnectable={false}
        id="bottom"
      />

      <Handle 
        type="source" 
        position={Position.Top} 
        style={{ 
          opacity: 0,
          pointerEvents: 'none'
        }}
        isConnectable={false}
        id="top"
      />

    </>
  )
}