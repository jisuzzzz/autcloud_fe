import Image from "next/image"
import { InfoItem, SpecSection } from "../specBar"
import { ObjectStorageSpecType } from "@/lib/projectDB"
import { useEffect, useState, useMemo } from "react"
import { eventBus } from "@/services/eventBus"
import { RegionsArray } from "@/lib/resourceOptions"

interface ObectStorageSpecProps {
  spec: ObjectStorageSpecType
}

export default function ObjectStorageSpec({spec: localSpec}: ObectStorageSpecProps) {
  const [spec, setSpec] = useState(localSpec)
  useEffect(() => {
    setSpec(localSpec)
  }, [localSpec])
  
  useEffect(() => {
    // 이벤트 구독
    const unsubscribe = eventBus.subscribe('objectSpecUpdated', (updatedSpec) => {
      setSpec(prevSpec => ({ ...prevSpec, ...updatedSpec }))
    })
    
    // 컴포넌트 언마운트시 구독 해제
    return () => unsubscribe();
  }, [])
  const regionInfo = useMemo(() => {

    let regionId = spec.region
    const regionCodeMatch = spec.region.match(/\(([^)]+)\)/)
    if (regionCodeMatch) {
      regionId = regionCodeMatch[1]
    }
    
    const region = RegionsArray.find(r => r.id === regionId)
    return {
      flag: region?.flag || '/flag-icn.svg',
    };
  }, [spec.region])

  return (
    <>
      <SpecSection>
        <InfoItem label="Region">
          <div className="flex items-center gap-2">
            <Image
              alt="region"
              src={regionInfo.flag}
              width={21}
              height={21}
            ></Image>
            <p className="text-xs">{spec.region}</p>
          </div>
        </InfoItem>
        <InfoItem label="Plan">
          <p className="text-xs">{spec.plan}</p>
        </InfoItem>
        <InfoItem label="Price">
          <p className="text-xs">${spec.price}</p>
          <p className="text-[11px] text-gray-400">per Month</p>
        </InfoItem>
        <InfoItem label="Storage Price">
          <p className="text-xs">{`$${spec.storage_price}/GB`}</p>
          <p className="text-[11px] text-gray-400">over 1000GB</p>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <p className="text-xs">{`$${spec.transfer_price}/GB`}</p>
          <p className="text-[11px] text-gray-400">over 1000GB</p>
        </InfoItem>
      </SpecSection>
    </>
  )
}