import { InfoItem, AttributeSection } from "../ui/attributeBar"
import { ObjectStorageAttributeType } from "@/types/type"
import { useEffect, useState } from "react"

interface ObectStorageAttributeProps {
  attribute: ObjectStorageAttributeType
}

export default function ObjectStorageAttribute({attribute: localAttribute}: ObectStorageAttributeProps) {
  const [attribute, setAttribute] = useState(localAttribute)
  useEffect(() => {
    setAttribute(localAttribute)
  }, [localAttribute])

  return (
    <>
      <AttributeSection>
        <InfoItem label="Region">
          <div className="flex items-center gap-2">
            <p className="text-xs">{attribute.region}</p>
          </div>
        </InfoItem>
        <InfoItem label="Plan">
          <p className="text-xs">{attribute.plan}</p>
        </InfoItem>
      </AttributeSection>
      <AttributeSection>
        <InfoItem label="Price">
          <div className="flex items-center gap-1">
            <p className="text-xs">${attribute.price}</p>
            <p className="text-[11px] text-gray-400">per Month</p>
          </div>
        </InfoItem>
        <InfoItem label="Storage Price">
          <div className="flex items-center gap-1">
            <p className="text-xs">${attribute.disk_gb_price}/GB</p>
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <div className="flex items-center gap-1">
            <p className="text-xs">${attribute.bw_gb_price}/GB</p>
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Rate Limit Ops/Sec">
          <div className="flex items-center gap-1">
            <p className="text-xs">{attribute.ratelimit_ops_secs}</p>
            <p className="text-[11px] text-gray-400">ops/sec</p>
          </div>
        </InfoItem>
        <InfoItem label="Rate Limit Ops/bytes">
          <div className="flex items-center gap-1">
            <p className="text-xs">{attribute.ratelimit_ops_bytes}</p>
            <p className="text-[11px] text-gray-400">bytes/sec</p>
          </div>
        </InfoItem>
      </AttributeSection>
    </>
  )
}