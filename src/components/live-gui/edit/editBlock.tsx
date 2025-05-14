'use client'
import Image from "next/image"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import SelectBox from "@/components/custom/selectBox"
import { BlockStorageSpecType } from "@/lib/projectDB"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { eventBus } from "@/services/eventBus"
import { RegionsArray } from "@/lib/resourceOptions"
import { cn } from "@/lib/utils"
import { useYjsStore } from "@/lib/useYjsStore"
import { Node, Edge } from "reactflow"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface BlockStorageSpecProps {
  spec: BlockStorageSpecType
  onEdit: (data: BlockStorageSpecType) => void
  onClose: () => void
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
}

export default function EditBlockStorageSpec({spec, onEdit, onClose, setEdges}:BlockStorageSpecProps) {
  const {yDoc} = useYjsStore()
  const [hasChanges, setHasChanges] = useState(false)
  
  const yNodes = yDoc.getArray<Node>('nodes')
  const nodes = yNodes.toArray() as Node[]

  const { register, handleSubmit, setValue, watch } = useForm<BlockStorageSpecType>({
    defaultValues: spec
  })
  
  const watchedValues = watch()
  
  useEffect(() => {
    const hasAnyChange = Object.keys(spec).some(key => {
      const field = key as keyof BlockStorageSpecType
      return watchedValues[field] !== spec[field]
    })
    
    setHasChanges(hasAnyChange)
  }, [watchedValues, spec])
  
  const computeNodes = nodes.filter(node => 
    node.data.type === 'Compute' &&
    node.data.spec.status !== 'remove'
  ).map(node => ({
    value: node.id,
    label: node.data.spec.label
  }))

  const handleAttachChange = (computeId: string) => {
    setValue('attached_to', computeId)
  }

  const isValueChanged = (property: keyof BlockStorageSpecType) => {
    const currValue = watch(property)
    return currValue !== spec[property]
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
    
    setValue('region', regionWithCity)
  }
  
  const onSubmit = (data:BlockStorageSpecType) => {
    if(onEdit) {
      onEdit(data)
      
      const computeId = data.attached_to
      if(computeId) {
        setEdges(prev => prev.map(edge => 
          edge.target === spec.attached_to
            ? {
              ...edge,
              target: computeId
            }
            : edge
        ))
      }
      eventBus.publish('blockSpecUpdated', data)
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
            disabled={!hasChanges}
          >
            Save
          </Button>
        </div>
      </div>

      <SpecSection>
        <InfoItem label="Region">
          <SelectBox 
            option={regionOptions}
            placeholder={spec.region || "Select region"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('region') ? "text-blue-500 font-medium" : "")}
            onChange={handleRegionChange}
            showFlags={true}
          />
        </InfoItem>

        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">{"Attatch to"}</h3>
          <SelectBox
            option={computeNodes}
            placeholder={nodes.find(node => node.id === spec.attached_to)?.data.spec.label || "Select compute"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('attached_to') ? "text-blue-500 font-medium" : "")}
            onChange={handleAttachChange}
          />
          <p className="text-xs text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </SpecSection>
        
      <SpecSection>
        <InfoItem label="Type">{spec.type}</InfoItem>
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

      <SpecSection>
        <InfoItem label="Label">
          <Input
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm", 
              isValueChanged('label') ? "text-blue-500 font-medium" : "text-[#8171E8]")}
            {...register('label')}
          />
        </InfoItem>
      </SpecSection>
    </form>
  )
}