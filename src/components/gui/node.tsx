'use client'
import React from 'react'
import Image from 'next/image'
import { Handle, Position } from 'reactflow'
import { useFlowMapStore } from '@/store/flowMapStore'

const resourceIcons = {
  EC2: '/logos_aws-ec2.svg',
  S3: '/logos_aws-s3.svg',
  RDS: '/logos_aws-rds.svg',
}

interface NodeProps {
  data: {
    type: string
  }
  selected: boolean
}

export default function ResourceNode({ data, selected }: NodeProps) {
  return (
    <div className={`
      w-20 h-20 bg-white rounded-lg p-2
      ${selected ? 'ring-2 ring-yellow-300' : 'ring-1 ring-gray-200'}
      hover:shadow-xl transition-shadow duration-200
      flex flex-col items-center justify-center
    `}>
      {/* <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: '#3b82f6', width: '16px', height: '16px' }}
        isConnectable={true}
        id="right"
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ background: '#3b82f6', width: '16px', height: '16px' }}
        isConnectable={true}
        id="left"
      />
      <Handle 
        type="source" 
        position={Position.Top} 
        style={{ background: '#3b82f6', width: '16px', height: '16px' }}
        isConnectable={true}
        id="top"
      />
      <Handle 
        type="target" 
        position={Position.Bottom} 
        style={{ background: '#3b82f6', width: '16px', height: '16px' }}
        isConnectable={true}
        id="bottom"
      /> */}
      <div className="relative w-10 h-10">
        <Image
          fill
          className="object-contain"
          alt='aws-icons'
          src={resourceIcons[data.type as keyof typeof resourceIcons]}
        />
      </div>
      <div className="text-xs font-medium text-gray-700 text-center mt-1">
        {data.type}
      </div>
    </div>
  )
}