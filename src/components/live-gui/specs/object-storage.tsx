import Image from "next/image"
import { InfoItem, SpecSection } from "../specBar"
import { ObjectStorageSpecType } from "@/lib/projectDB"
import { EditButton } from "@/components/custom/actionButtons"

interface ObectStorageSpecProps {
  spec: ObjectStorageSpecType
  setNodes: () => void
}

export default function ObjectStorageSpec({spec,setNodes}: ObectStorageSpecProps) {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="gap-3 flex items-center">
          <Image
            alt="object storage"
            src={"/aut-obj-storage.svg"}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-sm font-medium">Object Storage</h3>
        </div>
        <EditButton setNodes={setNodes}/>
      </div>

      <SpecSection>
        <h2 className="font-semibold text-sm">Storage Information</h2>
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">{spec.label}</p>
        </InfoItem>
        <InfoItem label="Location">
          <div className="flex items-center gap-3">
            <Image
              alt="region"
              src={"/flag-for-south-korea.svg"}
              width={25}
              height={25}
            ></Image>
            <p className="text-sm">{spec.location}</p>
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Tier">
          {spec.tier}
        </InfoItem>
        <InfoItem label="Storage Price">
          <p className="text-sm">{spec.storage_price}</p>
          <p className="text-sm text-gray-400">over 1000GB</p>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <p className="text-sm">{spec.transfer_price}</p>
          <p className="text-sm text-gray-400">over 1000GB</p>
        </InfoItem>
      </SpecSection>
    </>
  )
}