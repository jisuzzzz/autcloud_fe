'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useOthers, useSelf } from '@liveblocks/react'
import { ComputeSpecType, DatabaseSpecType, BlockStorageSpecType, ObjectStorageSpecType, FirewallSpecType } from '@/lib/projectDB'
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
    spec: ComputeSpecType | DatabaseSpecType | BlockStorageSpecType | ObjectStorageSpecType | FirewallSpecType
  }
  selected: boolean
}

export default function ResourceNode({ id, data, selected=false }: NodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const users = useOthers()
  const me = useSelf()
  const myColor = me?.info?.color as string || '#FFCA28'
  //  다른 사용자가 점유중인 노드 확인
  const isOccupiedByOthers = users.some(user => 
    Array.isArray(user.presence.selectedNodes) && 
    user.presence.selectedNodes.includes(id)
  )
  
  // 핸들이 보여야 하는지 여부 결정
  const showHandles = selected || isHovered;
  
  return (
    <>
      <div 
        className={`
          w-15 h-15 p-2 relative
          ${selected ? 'ring-2' : ''}
          ${data.status === 'add' ? 'shadow-[0_0_15px_rgba(34,197,94,0.7)]' : ''}
          ${data.status === 'remove' ? 'shadow-[0_0_15px_rgba(239,68,68,0.7)]' : ''}
          ${data.status === 'edit' ? 'shadow-[0_0_15px_rgba(234,179,8,0.7)]' : ''}
          ${isOccupiedByOthers ? 'opacity-70 cursor-not-allowed' : ''}
          flex flex-col items-center justify-center`
        }
        style={{
          ...(selected && {'--tw-ring-color': myColor}),
          pointerEvents: isOccupiedByOthers ? 'none' : 'auto'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          alt='resources-icons'
          src={resourceIcons[data.type as keyof typeof resourceIcons]}
          fill
          className="object-contain rounded-xs"
        />
        <div className="fixed top-[70px] w-[200px] text-xs font-medium text-gray-700 text-center mt-1">
          {data.spec.label}
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
      
      {/* 테두리 중앙에 위치한 핸들들 - 조건부 스타일 적용 */}
      <Handle 
        type="target" 
        position={Position.Bottom} 
        style={{ 
          width: '12px', 
          height: '12px', 
          border: '2px solid white',
          bottom: '-6px',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: '#8171E8',
          opacity: showHandles ? 1 : 0,
          transition: 'opacity 0.2s'
        }}
        isConnectable={true}
        id="bottom"
      />
      
      <Handle 
        type="source" 
        position={Position.Top} 
        style={{ 
          width: '12px', 
          height: '12px', 
          border: '2px solid white',
          top: '-6px',
          transform: 'translateX(-50%)',
          zIndex: 10,
          background: '#8171E8',
          opacity: showHandles ? 1 : 0,
          transition: 'opacity 0.2s'
        }}
        isConnectable={true}
        id="top"
      />
      
      <Handle 
        type="source" 
        position={Position.Left}
        style={{ 
          width: '12px', 
          height: '12px', 
          border: '2px solid white',
          left: '-6px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: '#8171E8',
          opacity: showHandles ? 1 : 0,
          transition: 'opacity 0.2s'
        }}
        isConnectable={true}
        id="left"
      />
      
      <Handle 
        type="target" 
        position={Position.Right} 
        style={{ 
          width: '12px', 
          height: '12px', 
          border: '2px solid white',
          right: '-6px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: '#8171E8',
          opacity: showHandles ? 1 : 0,
          transition: 'opacity 0.2s'
        }}
        isConnectable={true}
        id="right"
      />
    </>
  )
}