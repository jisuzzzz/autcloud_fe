import Image from "next/image"
import { InfoItem, SpecSection } from "../specBar"
import { ObjectStorageSpecType } from "@/lib/projectDB"
import { useEffect, useState } from "react"
import { eventBus } from "@/services/eventBus"

interface ObectStorageSpecProps {
  spec: ObjectStorageSpecType
}

export default function ObjectStorageSpec({spec}: ObectStorageSpecProps) {
  const [specState, setSpec] = useState(spec)
  useEffect(() => {
    // 이벤트 구독
    const unsubscribe = eventBus.subscribe('objectSpecUpdated', (updatedSpec) => {
      setSpec(prevSpec => ({ ...prevSpec, ...updatedSpec }))
    })
    
    // 컴포넌트 언마운트시 구독 해제
    return () => unsubscribe();
  }, [])
  return (
    <>
      <SpecSection>
        <h2 className="font-semibold text-[13px]">Storage Information</h2>
        <InfoItem label="Label">
          <p className="text-[13px] text-[#8171E8]">{spec.label}</p>
        </InfoItem>
        <InfoItem label="Location">
          <div className="flex items-center gap-3">
            <Image
              alt="region"
              src={"/flag-icn.svg"}
              width={25}
              height={25}
            ></Image>
            <p className="text-[13px]">{spec.location}</p>
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Tier">
          {spec.tier}
        </InfoItem>
        <InfoItem label="Storage Price">
          <p className="text-[13px]">{spec.storage_price}</p>
          <p className="text-[13px] text-gray-400">over 1000GB</p>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <p className="text-[13px]">{spec.transfer_price}</p>
          <p className="text-[13px] text-gray-400">over 1000GB</p>
        </InfoItem>
      </SpecSection>
    </>
  )
}