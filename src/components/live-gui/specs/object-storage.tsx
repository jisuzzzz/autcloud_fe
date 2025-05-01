import Image from "next/image"
import { InfoItem, SpecSection } from "../specBar"

export default function ObjectStorageSpec() {
  return (
    <>
      <div className="flex gap-3 items-center px-4 py-3 border-b">
        <Image
          alt="object storage"
          src={"/aut-obj-storage.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Object Storage</h3>
      </div>

      <SpecSection>
        <h2 className="font-semibold text-sm">Storage Information</h2>
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">Test</p>
        </InfoItem>
        <InfoItem label="Location">
          <div className="flex items-center gap-3">
            <Image
              alt="region"
              src={"/flag-for-south-korea.svg"}
              width={25}
              height={25}
            ></Image>
            <p className="text-sm">icn1, Seoul</p>
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Tier">
          Standard
        </InfoItem>
        <InfoItem label="Storage Price">
          <p className="text-sm">$0.018/GB</p>
          <p className="text-sm text-gray-400">over 1000GB</p>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <p className="text-sm">$0.018/GB</p>
          <p className="text-sm text-gray-400">over 1000GB</p>
        </InfoItem>
      </SpecSection>
    </>
  )
}