'use client'
import Image from "next/image"
import { InfoItem, AttributeSection, InfoIcon } from "../ui/attributeBar"
import SelectBox from "@/components/custom/ui/dropDown/selectBox"
import { BlockStorageAttributeType } from "@/types/type"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { RegionsArray } from "@/options/resourceOptions"
import { useYjsStore } from "@/lib/hooks/useYjsStore"
import { Node, Edge } from "reactflow"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import * as Y from 'yjs'


interface AddNewBlockStorageProps {
  onAdd: (data: BlockStorageAttributeType) => void
  onClose: () => void
}

export default function AddNewBlockStorage({onClose, onAdd}: AddNewBlockStorageProps) {
  const {yDoc} = useYjsStore()
  const [isFormValid, setIsFormValid] = useState(false)
  
  const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
  const nodes = yNodes.toArray().map(ynode => ({
    id: ynode.get('id') as string,
    type: ynode.get('type') as string,
    position: ynode.get('position'),
    data: ynode.get('data')
  })) as Node[]
  
  const yEdges = yDoc.getArray<Edge>('edges')
  const edges = yEdges.toArray() as Edge[]
  
  const defaultValues = {
    id: '',
    region: '',
    region_id: '',
    type: "NVMe",
    mount_id: "ewr-a23cda1547af4b",
    attached_to: '',
    size: "1",
    label: '',
  }

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues,
    mode: "onChange"
  })

  const region = watch('region')
  const label = watch('label')
  const attached_to = watch('attached_to')
  
  useEffect(() => {
    setIsFormValid(!!region && !!label && !!attached_to)
  }, [region, label, attached_to])

  const connectedComputeIds = edges.map(edge => edge.target)

  const computeNodes = nodes
    .filter(node => 
      node.data.type === 'Compute' &&
      node.data.attribute.status !== 'remove' &&
      !connectedComputeIds.includes(node.id)
    )
    .map(node => ({
      value: node.id,
      label: node.data.attribute.label
    }))

  const handleAttachChange = (computeId: string) => {
    setValue('attached_to', computeId)
  }

  const regionOptions = RegionsArray.map(region => ({
    value: region.id,
    label: `${region.city} (${region.id})`,
    flag: region.flag
  }))

  const handleRegionChange = (region_id: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region_id)
    if(!selectedRegion) return

    setValue('region_id', region_id)
    setValue('region', selectedRegion.city)
  }

  const onSubmit = (data:BlockStorageAttributeType) => {
    if(onAdd){
      onAdd(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-4 py-2 border-b justify-between">
        <div className="gap-3 flex items-center">
          <Image
            alt="block storage"
            src={"/aut-blockstorage.svg"}
            width={23.5}
            height={23.5}
            className="rounded-xs"
          ></Image>
          <h3 className="text-xs font-medium">Block Storage</h3>
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

      <AttributeSection>
        <InfoItem label="Region">
          <div className="flex flex-col w-full">
            <SelectBox 
              option={regionOptions}
              placeholder={"Select region"}
              className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full" 
              onChange={handleRegionChange}
              showFlags={true}
            />
            {!region && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
          
        </InfoItem>
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <SelectBox
            option={computeNodes}
            placeholder={"Select compute"}
            className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full"
            onChange={handleAttachChange}
          />
          {!attached_to && <p className="text-xs text-blue-400 mt-1">* Required field</p>}
          <p className="text-[11px] text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
        </AttributeSection>

        <AttributeSection>
        <InfoItem label="Type">{defaultValues.type}</InfoItem>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs text-gray-500">{"Mount ID"}</h3>
            <InfoIcon label="?"/>
          </div>
          <p className="text-xs">{defaultValues.mount_id}</p>
        </div>
        <InfoItem label="Size">
          <p className="text-xs">{defaultValues.size}</p>
        </InfoItem>

      </AttributeSection>

      <AttributeSection>
        <InfoItem label="Label">
          <div className="flex flex-col w-full">
            <Input
              placeholder="Input label"
              className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm"
              {...register('label', { required: true })}
            />
            {!label && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>

        </InfoItem>
      </AttributeSection>
    </form>
  )
}