'use client'
import React from 'react'
import Image from 'next/image'
import { useOthers, useSelf } from '@liveblocks/react'

const resourceIcons = {
  Compute: '/aut-compute.svg',
  ObjectStorage: '/aut-obj-storage.svg',
  Database: '/aut-database.svg',
  BlockStorage: '/aut-block-storage.svg',
  FireWall: '/aut-firewall.svg'
}

interface NodeProps {
  id:string
  data: {
    type: string
    isConfirm: boolean
  }
  selected: boolean
}

export default function ResourceNode({ id, data, selected=false }: NodeProps) {
  const users = useOthers()
  const me = useSelf()
  const myColor = me?.info?.color as string || '#FFCA28'
  //  다른 사용자가 점유중인 노드 확인
  const isOccupiedByOthers = users.some(user => 
    Array.isArray(user.presence.selectedNodes) && 
    user.presence.selectedNodes.includes(id)
  )
  return (
    <>
      <div className={`
        w-15 h-15 bg-white p-2
        ${selected ? 'ring-2' : ''}
        ${!data.isConfirm ? 'shadow-[0_0_15px_rgba(34,197,94,0.7)]' : ''}
        ${isOccupiedByOthers ? 'opacity-70 cursor-not-allowed' : ''}
        flex flex-col items-center justify-center`}
        style={{
          ...(selected && {'--tw-ring-color': myColor}),
          // 다른 유저가 점유중이면 상호작용 불가
          pointerEvents: isOccupiedByOthers ? 'none' : 'auto'
        }}
      >
        <Image
          alt='resources-icons'
          src={resourceIcons[data.type as keyof typeof resourceIcons]}
          fill
          className="object-contain rounded-xs"
        />
        <div className="fixed top-[60px] text-xs font-medium text-gray-700 text-center mt-1">
          {data.type}
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
    </>
  )
}

{/* <Handle 
type="target" 
position={Position.Bottom} 
style={{ background: '#3b82f6', width: '16px', height: '16px' }}
isConnectable={true}
id="bottom"
/> */}