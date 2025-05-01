import Image from "next/image"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function BlockStorageSpec() {
  return (
    <>
      <div className="flex gap-3 items-center px-4 py-3 border-b">
        <Image
          alt="block storage"
          src={"/aut-block-storage.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Block Storage</h3>
      </div>

      <SpecSection>
        <InfoItem label="ID">
          e.g.999c0000-0000-0000-0000-00000000000000
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
        <InfoItem label="Type">
          NVMe
        </InfoItem>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs text-gray-500">{"Mount ID"}</h3>
            <InfoIcon label="?"/>
          </div>
          <p className="text-sm">ewr-a23cda1547af4b</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <div className="flex itmes-center">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="1024.00 MB Ubuntu 22.04..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="U1">1024.00 MB Ubuntu 22.04...</SelectItem>
                <SelectItem value="U2">1024.00 MB Ubuntu 22.04...</SelectItem>
                <SelectItem value="U3">1024.00 MB Ubuntu 22.04...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Size">
          <p className="text-sm text-[#8171E8]">1 GB</p>
        </InfoItem>
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">[Click here to set]</p>
        </InfoItem>
      </SpecSection>

      <div className="flex flex-col p-4">
        <InfoItem label="Date Created">
          05/02/2025 01:09:20
        </InfoItem>
      </div>
    </>
  )
}