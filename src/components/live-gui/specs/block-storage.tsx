import Image from "next/image"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import { BlockStorageSpecType } from "@/lib/projectDB"
import { useEffect, useState, useMemo } from "react"
import { eventBus } from "@/services/eventBus"
import { RegionsArray } from "@/lib/resourceOptions"

interface BlockStorageSpecProps {
  spec: BlockStorageSpecType
}

export default function BlockStorageSpec({spec: localSpec }:BlockStorageSpecProps) {
  const [spec, setSpec] = useState(localSpec)

  useEffect(() => {
    setSpec(localSpec)
  }, [localSpec])
  
  useEffect(() => {
    // 이벤트 구독
    const unsubscribe = eventBus.subscribe('blockSpecUpdated', (updatedSpec) => {
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
              height={22}
            ></Image>
            <p className="text-xs">{spec.region}</p>
          </div>
        </InfoItem>

        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <div className="flex itmes-center">
            {/* <SelectBox option={spec.attached_to} className="w-full"/> */}
            <p className="text-xs text-[#8171E8]">{spec.attached_to}</p>
          </div>
          <p className="text-[12px] text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Type">
          {spec.type}
        </InfoItem>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs text-gray-500">{"Mount ID"}</h3>
            <InfoIcon label="?"/>
          </div>
          <p className="text-xs">{spec.mount_id}</p>
        </div>

        <InfoItem label="Size">
          <p className="text-xs text-[#8171E8]">{`${spec.size} GB`}</p>
        </InfoItem>
      </SpecSection>
    </>
  )
}