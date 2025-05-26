import Image from 'next/image'
import { InfoItem, AttributeSection } from '../ui/attributeBar'
import { DatabaseAttributeType } from "@/types/type"
import { useEffect, useState, useMemo } from "react"
import { getRegionFlag } from '@/lib/helpers/getRegionFlag'

interface DatabaseAttributeProps {
  attribute: DatabaseAttributeType
}

const statusConfig = {
  running: 'bg-green-400',
  pending: 'bg-yellow-400',
  stopped: 'bg-red-400',
}

export default function DatabaseAttribute({ attribute:localAttribute }: DatabaseAttributeProps) {
  const [attribute, setAttribute] = useState(localAttribute)

  useEffect(() => {
    setAttribute(localAttribute)
  }, [localAttribute])

  const regionInfo = useMemo(() => {
    return getRegionFlag(attribute.region_id)
  }, [attribute.region_id])
  
  return (
    <>
      <div className="flex justify-between items-center px-4 py-2.5 border-b">
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
