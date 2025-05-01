import Image from "next/image"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BlockStorageSpecType } from "@/lib/projectDB"

interface BlockStorageSpecProps {
  spec: BlockStorageSpecType
}

export default function BlockStorageSpec({spec}:BlockStorageSpecProps) {
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
          {spec.label}
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
        <InfoItem label="Type">
          {spec.type}
        </InfoItem>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs text-gray-500">{"Mount ID"}</h3>
            <InfoIcon label="?"/>
          </div>
          <p className="text-sm">{spec.mount_id}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <div className="flex itmes-center">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={spec.attached_to} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="U1">{spec.attached_to}</SelectItem>
                <SelectItem value="U2">{spec.attached_to}</SelectItem>
                <SelectItem value="U3">{spec.attached_to}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Size">
          <p className="text-sm text-[#8171E8]">{spec.size}</p>
        </InfoItem>
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">{spec.label}</p>
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