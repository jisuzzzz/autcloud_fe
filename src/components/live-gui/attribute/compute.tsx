'use client'
import Image from 'next/image'
import { InfoItem, AttributeSection, InfoIcon } from '../ui/attributeBar'
import { Copy } from 'lucide-react'
import { ComputeAttributeType } from "@/types/type"
import { useEffect, useState, useMemo } from 'react'
import { getRegionFlag } from '@/lib/helpers/getRegionFlag'
import * as Y from 'yjs'
import { useYjsStore } from '@/lib/hooks/useYjsStore'


interface ComputeAttributeProps {
  attribute: ComputeAttributeType
}

const statusConfig = {
  running: 'bg-green-400',
  pending: 'bg-yellow-400',
  stopped: 'bg-red-400',
}

export default function ComputeAttribute({ attribute: initAttribute }: ComputeAttributeProps) {
  const [attribute, setAttribute] = useState(initAttribute)
  const { yDoc } = useYjsStore()

  useEffect(() => {
    setAttribute(initAttribute)
  }, [initAttribute])

  const firewallGroupLabel = useMemo(() => {
    const firewallGroupId = attribute.firewall_group_id || ''
    const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
    const nodeIdx = yNodes.toArray().findIndex(node => node.get('id') === firewallGroupId)
    if (nodeIdx === -1) return null
  
    const node = yNodes.get(nodeIdx)
    if (!node) return null

    const nodeData = node.get('data')
    return nodeData ? nodeData.attribute.label : null 
  }, [attribute.firewall_group_id])

  const regionInfo = useMemo(() => {
    return getRegionFlag(attribute.region_id)
  }, [attribute.region_id])
  
  return (
    <>
      <div className="flex justify-between items-center px-4 py-2.5 border-b font-mono">
        <h3 className="text-xs text-gray-500">Stauts</h3>

        <div className="flex items-center gap-2">
          <div className={`rounded-full w-2 h-2 ${statusConfig[attribute.status as keyof typeof statusConfig]}`} />
          <p className="text-xs">{attribute.status}</p>
        </div>
      </div>

      <AttributeSection>
        <InfoItem label="Region">
          <div className="flex items-center gap-2">
            <Image
              alt="region"
              src={regionInfo.flag}
              width={21}
              height={21}
            ></Image>
            <p className="text-xs">{`${attribute.region} (${attribute.region_id})`}</p>
          </div>
        </InfoItem>
        
        <InfoItem label='Plan'>{attribute.plan}</InfoItem>
        <InfoItem label="OS">{attribute.os}</InfoItem>
        <InfoItem label="IP Adress">
          <div className="flex w-full justify-between items-center">
            <p className="text-xs">{attribute.main_ip}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(attribute.main_ip);
              }}
              className="text-gray-500 hover:text-[#8171E8] cursor-pointer"
            >
              <Copy size={18} />
             </button>
          </div>
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label="vCPU/s">{`${attribute.vcpu} vCPU`}</InfoItem>
        <InfoItem label="RAM">{`${attribute.ram} MB`}</InfoItem>
        <InfoItem label="Disk"><p className='text-xs'>{attribute.disk_type} {`${attribute.disk} GB`}</p></InfoItem>
        <InfoItem label="Bandwidht">
          {`${attribute.bandwidth} GB`}
          <InfoIcon label="?" />
        </InfoItem>
        <InfoItem label="Monthly Cost">{`$${attribute.monthly_cost} per Month`}</InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label='Firewall Group'>
          <p className="text-xs text-[#8171E8]">{firewallGroupLabel || "Set up a Firewall"}</p>
        </InfoItem>
        <InfoItem label="Auto Backups">
          {attribute.auto_backups === "enable" ? (
            <p className="text-xs text-green-600">Enabled</p>
          ) : (
            <p className="text-xs text-red-600">Not Enabled</p>
          )}
          <InfoIcon label="!" />
        </InfoItem>
      </AttributeSection>
    </>
  )
}