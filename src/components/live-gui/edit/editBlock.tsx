import Image from "next/image"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import SelectBox from "@/components/custom/selectBox"
import { BlockStorageSpecType } from "@/lib/projectDB"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

interface BlockStorageSpecProps {
  spec: BlockStorageSpecType
  onEdit: (data: BlockStorageSpecType) => void
}

export default function EditBlockStorageSpec({spec, onEdit}:BlockStorageSpecProps) {

  const { register, handleSubmit } = useForm<BlockStorageSpecType>({
    defaultValues: spec
  })
  
  const onSubmit = (data:BlockStorageSpecType) => {
    if(onEdit) {
      onEdit(data)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 items-center px-4 py-3 border-b justify-between">
        <Image
          alt="block storage"
          src={"/aut-block-storage.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Block Storage</h3>
        <Button type="submit" className="px-3 py-1 h-8 text-xs">
            Save Changes
        </Button>
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
            <SelectBox option={spec.attached_to} className="w-full"/>
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
    </form>
  )
}