'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InfoItem, AttributeSection, InfoIcon } from '../ui/attributeBar'
import { Copy } from 'lucide-react'
import { ComputeAttributeType } from "@/types/type"
import { useEffect, useState, useMemo } from 'react'
import { RegionsArray } from '@/options/resourceOptions'

interface ComputeAttributeProps {
  attribute: ComputeAttributeType
}

export default function ComputeAttribute({ attribute: initAttribute }: ComputeAttributeProps) {
  const [attribute, setAttribute] = useState(initAttribute)

  useEffect(() => {
    setAttribute(initAttribute)
  }, [initAttribute])

  // 지역 ID에서 국기 이미지 경로 매핑
  const regionInfo = useMemo(() => {

    let regionId = attribute.region_id
    const region = RegionsArray.find(r => r.id === regionId)
    return {
      flag: region?.flag || '/flag-icn.svg',
    }
  }, [attribute.region_id])
  
  return (
    <>
      <div className="flex justify-between items-center px-4 py-2.5 border-b">
        <h3 className="text-xs text-gray-500">Stauts</h3>

        <Button
          className={cn('px-2.5 h-7 rounded-sm pointer-events-none text-xs', {
            'bg-green-500': attribute.status === 'running',
            'bg-yellow-500': attribute.status === 'pending',
            'bg-red-500': attribute.status === 'stopped',
          })}
        >
          {attribute.status}
        </Button>
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
            <p className="text-xs">{attribute.ip_address}</p>
            <Copy size={18} className="text-gray-500 hover:text-[#8171E8]" />
          </div>
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label="vCPU/s">{`${attribute.vcpu} vCPU`}</InfoItem>
        <InfoItem label="RAM">{`${attribute.ram} MB`}</InfoItem>
        <InfoItem label="Disk">{`${attribute.disk} GB`}</InfoItem>
        <InfoItem label="Bandwidht">
          <p className="text-xs text-[#8171E8]">{`${attribute.bandwidth} GB`}</p>
          <InfoIcon label="?" />
        </InfoItem>
        <InfoItem label="Monthly Cost">{`$${attribute.monthly_cost} per Month`}</InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label='Firewall Group'>
          {attribute.group_id || "Set up a Firewall"}
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