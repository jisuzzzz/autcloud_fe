import { InfoItem, SpecSection } from "../specBar"
import { ObjectStorageSpecType } from "@/lib/projectDB"
import { useEffect, useState } from "react"

interface ObectStorageSpecProps {
  spec: ObjectStorageSpecType
}

export default function ObjectStorageSpec({spec: localSpec}: ObectStorageSpecProps) {
  const [spec, setSpec] = useState(localSpec)
  useEffect(() => {
    setSpec(localSpec)
  }, [localSpec])

  return (
    <>
      <SpecSection>
        <InfoItem label="Region">
          <div className="flex items-center gap-2">
            <p className="text-xs">{spec.region}</p>
          </div>
        </InfoItem>
        <InfoItem label="Plan">
          <p className="text-xs">{spec.plan}</p>
        </InfoItem>
      </SpecSection>
      <SpecSection>
        <InfoItem label="Price">
          <div className="flex items-center gap-1">
            <p className="text-xs">${spec.price}</p>
            <p className="text-[11px] text-gray-400">per Month</p>
          </div>
        </InfoItem>
        <InfoItem label="Storage Price">
          <div className="flex items-center gap-1">
            <p className="text-xs">${spec.disk_gb_price}/GB</p>
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <div className="flex items-center gap-1">
            <p className="text-xs">${spec.bw_gb_price}/GB</p>
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Rate Limit Ops/Sec">
          <div className="flex items-center gap-1">
            <p className="text-xs">{spec.ratelimit_ops_secs}</p>
            <p className="text-[11px] text-gray-400">ops/sec</p>
          </div>
        </InfoItem>
        <InfoItem label="Rate Limit Ops/bytes">
          <div className="flex items-center gap-1">
            <p className="text-xs">{spec.ratelimit_ops_bytes}</p>
            <p className="text-[11px] text-gray-400">bytes/sec</p>
          </div>
        </InfoItem>
      </SpecSection>
    </>
  )
}