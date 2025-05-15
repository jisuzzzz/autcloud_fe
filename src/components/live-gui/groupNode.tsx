'use client'
import React, { useEffect, useState } from 'react'
import { Handle, NodeResizeControl, Position, useNodes, Node } from 'reactflow'
import Image from 'next/image'
import { FirewallSpecType } from '@/lib/projectDB'

interface GroupNodeProps {
  id: string
  data: {
    label: string
    status: string
    firewallSpec?: FirewallSpecType
    firewallId?: string
  }
  selected: boolean
}

interface ComputeNodeData {
  type: string
  spec: {
    group_id?: string
  }
}

export default function GroupNode({ id, data, selected = false }: GroupNodeProps) {
  const nodes = useNodes();
  const [computeNodes, setComputeNodes] = useState<Node[]>([]);
  
  useEffect(() => {
    if (nodes) {
      // Filter compute nodes that belong to this group
      const groupComputes = nodes.filter(node => {
        const nodeData = node.data as ComputeNodeData;
        return nodeData?.type === 'Compute' && nodeData?.spec?.group_id === id;
      });
      setComputeNodes(groupComputes);
    }
  }, [nodes, id]);

  return (
    <>
      <div
        className={`
          p-6 rounded-lg
          bg-gray-100/80 backdrop-blur-md
          border-2 border-dashed border-gray-300
          min-w-[250px] min-h-[180px]
          hover:bg-gray-100/60 transition-colors duration-200
          shadow-sm
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-700 mb-1 px-2 py-1 rounded bg-white/80 inline-block border border-gray-200 shadow-sm">
            {data.label || "Security Group"}
          </div>
          
          {/* Firewall icon and info in header */}
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <Image
                alt='firewall-icon'
                src='/aut-firewall.svg'
                fill
                className="object-contain"
              />
            </div>
            {data.firewallSpec && (
              <div className="text-xs bg-white/80 px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                {`${data.firewallSpec.rules.length} Rules`}
              </div>
            )}
          </div>
        </div>
        
        {/* Group content area where compute nodes will appear */}
        <div className="mt-2 text-xs text-gray-500">
          {computeNodes.length === 0 ? (
            <p className="text-center italic">No compute resources in this group</p>
          ) : (
            <p className="text-center">{`${computeNodes.length} compute resource${computeNodes.length > 1 ? 's' : ''}`}</p>
          )}
        </div>
      </div>
      
      {/* Resize control */}
      <NodeResizeControl
        minWidth={250}
        minHeight={180}
        style={{ 
          borderColor: '#E5E7EB',
          background: 'white',
          borderWidth: '1px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          bottom: '4px',
          right: '4px' 
        }}
      />
    </>
  )
}