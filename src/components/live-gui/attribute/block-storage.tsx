import Image from "next/image"
import { InfoItem, AttributeSection, InfoIcon } from "../ui/attributeBar"
import { BlockStorageAttributeType } from "@/types/type"
import { useEffect, useState, useMemo } from "react"
import { RegionsArray } from "@/options/resourceOptions"

interface BlockStorageAttributeProps {
  attribute: BlockStorageAttributeType
}

export default function BlockStorageAttribute({attribute: localAttribute }:BlockStorageAttributeProps) {
  const [attribute, setAttribute] = useState(localAttribute)
  
  useEffect(() => {
    setAttribute(localAttribute)
  }, [localAttribute])

  const regionInfo = useMemo(() => {

    let regionId = attribute.region_id
    const region = RegionsArray.find(r => r.id === regionId)
    return {
      flag: region?.flag || '/flag-icn.svg',
    };
  }, [attribute.region_id])
  
  return (
    <>
      <AttributeSection>
        <InfoItem label="Region">
          <div className="flex items-center gap-2">
            <Image
              alt="region"
              src={regionInfo.flag}
              width={21}
              height={22}
            ></Image>
            <p className="text-xs">{`${attribute.region} (${attribute.region_id})`}</p>
          </div>
        </InfoItem>

        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <div className="flex itmes-center">
            <p className="text-xs text-[#8171E8]">{attribute.attached_to}</p>
          </div>
          <p className="text-[12px] text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label="Type">
          {attribute.type}
        </InfoItem>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs text-gray-500">{"Mount ID"}</h3>
            <InfoIcon label="?"/>
          </div>
          <p className="text-xs">{attribute.mount_id}</p>
        </div>

        <InfoItem label="Size">
          <p className="text-xs text-[#8171E8]">{`${attribute.size} GB`}</p>
        </InfoItem>
      </AttributeSection>
    </>
  )
}