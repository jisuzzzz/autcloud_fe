import Image from "next/image"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import SelectBox from "@/components/custom/selectBox"
import { BlockStorageSpecType } from "@/lib/projectDB"
import { useEffect, useState } from "react"
import { eventBus } from "@/services/eventBus"

interface BlockStorageSpecProps {
  spec: BlockStorageSpecType
}

export default function BlockStorageSpec({spec}:BlockStorageSpecProps) {
  const [specState, setSpec] = useState(spec)
  useEffect(() => {
    // 이벤트 구독
    const unsubscribe = eventBus.subscribe('blockSpecUpdated', (updatedSpec) => {
      setSpec(prevSpec => ({ ...prevSpec, ...updatedSpec }))
    })
    
    // 컴포넌트 언마운트시 구독 해제
    return () => unsubscribe();
  }, [])
  
  return (
    <>
      <SpecSection>
        <InfoItem label="ID">
          {spec.label}
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
        <InfoItem label="Type">
          {spec.type}
        </InfoItem>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs text-gray-500">{"Mount ID"}</h3>
            <InfoIcon label="?"/>
          </div>
          <p className="text-[13px]">{spec.mount_id}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <div className="flex itmes-center">
            {/* <SelectBox option={spec.attached_to} className="w-full"/> */}
            <p className="text-[13px]">{spec.attached_to}</p>
          </div>
          <p className="text-[12px] text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Size">
          <p className="text-[13px] text-[#8171E8]">{spec.size}</p>
        </InfoItem>
        <InfoItem label="Label">
          <p className="text-[13px] text-[#8171E8]">{spec.label}</p>
        </InfoItem>
      </SpecSection>

      <div className="flex flex-col p-4">
        <InfoItem label="Date Created">
          {spec.date_created}
        </InfoItem>
      </div>
    </>
  )
}