'use client'
import Image from "next/image"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import SelectBox from "@/components/custom/selectBox"
import { BlockStorageSpecType } from "@/lib/projectDB"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { RegionsArray } from "@/lib/resourceOptions"
import { useYjsStore } from "@/lib/useYjsStore"
import { Node, Edge } from "reactflow"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface AddNewBlockStorageProps {
  onAdd: (data: BlockStorageSpecType) => void
  onClose: () => void
}

export default function AddNewBlockStorage({onClose, onAdd}: AddNewBlockStorageProps) {
  const {yDoc} = useYjsStore()
  const [isFormValid, setIsFormValid] = useState(false)
  
  const yNodes = yDoc.getArray<Node>('nodes')
  const yEdges = yDoc.getArray<Edge>('edges')
  const nodes = yNodes.toArray() as Node[]
  const edges = yEdges.toArray() as Edge[]

  const defaultValues = {
    id: '',
    location: '',
    type: "NVMe",
    mount_id: "ewr-a23cda1547af4b",
    attached_to: '',
    size: "1GB",
    label: '',
    date_created: "05/12/2025 07:31:20"
  }

  const { register, handleSubmit, setValue, watch, formState } = useForm({
    defaultValues,
    mode: "onChange"
  })

  const location = watch('location')
  const label = watch('label')
  const attached_to = watch('attached_to')
  
  useEffect(() => {
    setIsFormValid(!!location && !!label && !!attached_to)
  }, [location, label, attached_to])

  const connectedComputeIds = edges.map(edge => edge.target)

  const computeNodes = nodes
    .filter(node => 
      node.data.type === 'Compute' &&
      node.data.spec.status !== 'remove' &&
      !connectedComputeIds.includes(node.id)
    )
    .map(node => ({
      value: node.id,
      label: node.data.spec.label
    }))

  const handleAttachChange = (computeId: string) => {
    setValue('attached_to', computeId)
  }

  const regionOptions = RegionsArray.map(region => ({
    value: region.id,
    label: `${region.city} (${region.id})`,
    flag: region.flag
  }))

  const handleRegionChange = (region: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region)
    const regionWithCity = selectedRegion ? 
      `${selectedRegion.city} (${region})` : 
      region
    
    setValue('location', regionWithCity)
  }

  const onSubmit = (data:BlockStorageSpecType) => {
    if(onAdd){
      onAdd(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-4 py-3 border-b justify-between">
        <div className="gap-3 flex items-center">
          <Image
            alt="block storage"
            src={"/aut-blockstorage.svg"}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-sm font-medium">Block Storage</h3>
        </div>
        <div className='flex items-center gap-3'>
          <Button type='button' onClick={onClose} className='px-3 py-1 h-[30px] rounded-sm text-xs bg-gray-50 hover:bg-violet-50 text-black border'>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="px-3 py-1 h-[30px] rounded-sm text-xs bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF]"
            disabled={!isFormValid}
          >
            Save
          </Button>
        </div>
      </div>

      <SpecSection>
        <InfoItem label="ID">
          {defaultValues.id || "Auto-generated"}
        </InfoItem>

        <InfoItem label="Location">
          <div className="flex flex-col w-full">
            <SelectBox 
              option={regionOptions}
              placeholder={"Select region"}
              className="h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full" 
              onChange={handleRegionChange}
              showFlags={true}
            />
            {!location && <p className="text-xs text-blue-400 mt-1">* Required field</p>}
          </div>
          
        </InfoItem>
        </SpecSection>

        <SpecSection>
        <InfoItem label="Type">{defaultValues.type}</InfoItem>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs text-gray-500">{"Mount ID"}</h3>
            <InfoIcon label="?"/>
          </div>
          <p className="text-[13px]">{defaultValues.mount_id}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <SelectBox
            option={computeNodes}
            placeholder={"Select compute"}
            className="h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full"
            onChange={handleAttachChange}
          />
          {!attached_to && <p className="text-xs text-blue-400 mt-1">* Required field</p>}
          <p className="text-xs text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Size">
          <p className="text-[13px]">{defaultValues.size}</p>
        </InfoItem>
        <InfoItem label="Label">
          <div className="flex flex-col w-full">
            <Input
              placeholder="Input label"
              className="h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm"
              {...register('label', { required: true })}
            />
            {!label && <p className="text-xs text-blue-400 mt-1">* Required field</p>}
          </div>

        </InfoItem>
      </SpecSection>
    </form>
  )
}