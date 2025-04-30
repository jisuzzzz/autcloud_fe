'use client'
import React from 'react'
import Image from 'next/image'

const resourceIcons = {
  Compute: '/aut-compute.svg',
  ObjectStorage: '/aut-obj-storage.svg',
  Database: '/aut-database.svg',
  BlockStorage: '/aut-block-storage.svg',
  FireWall: '/aut-firewall.svg'
}

interface NodeProps {
  data: {
    type: string
    isNew: boolean
  }
  selected: boolean
}

export default function ResourceNode({ data, selected=false }: NodeProps) {
  return (
    <div className={`
      w-15 h-15 bg-white p-2
      ${selected ? 'ring-2 ring-yellow-300' : ''}
      ${data.isNew ? 'shadow-[0_0_15px_rgba(34,197,94,0.7)]' : ''}
      flex flex-col items-center justify-center
    `}>
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
  )
}

{/* <Handle 
type="target" 
position={Position.Bottom} 
style={{ background: '#3b82f6', width: '16px', height: '16px' }}
isConnectable={true}
id="bottom"
/> */}