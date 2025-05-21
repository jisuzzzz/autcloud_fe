import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InfoItem, AttributeSection } from '../ui/attributeBar'
import { DatabaseAttributeType } from "@/types/type"
import { useEffect, useState, useMemo } from "react"
import { RegionsArray } from '@/options/resourceOptions'

interface DatabaseAttributeProps {
  attribute: DatabaseAttributeType
}

export default function DatabaseAttribute({ attribute:localAttribute }: DatabaseAttributeProps) {
  const [attribute, setAttribute] = useState(localAttribute)

  useEffect(() => {
    setAttribute(localAttribute)
  }, [localAttribute])
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
        <InfoItem label="ID">{attribute.plan}</InfoItem>
        <InfoItem label="DB Engine">{(attribute.db_engine === 'pg' ? 'PostgreSQL' : 'MySQL' ) + " " + attribute.db_version}</InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label="vCPU/s">{`${attribute.vcpu} vCPU`}</InfoItem>
        <InfoItem label="RAM">{`${attribute.ram} MB`}</InfoItem>
        <InfoItem label="Disk">{`${attribute.disk} GB`}</InfoItem>
        <InfoItem label="Replica Nodes">
          {`${attribute.replica_nodes} Node`}
        </InfoItem>
        <InfoItem label="Monthly Cost">{`$${attribute.monthly_cost} per Month`}</InfoItem>
        
      </AttributeSection>
      <AttributeSection>
        <InfoItem label="Latest Backup">{attribute.latest_backup}</InfoItem>
      </AttributeSection>
    </>
  )
}
