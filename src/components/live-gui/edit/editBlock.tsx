'use client'
import Image from "next/image"
import { InfoItem, AttributeSection, InfoIcon } from "../ui/attributeBar"
import SelectBox from "@/components/custom/ui/dropDown/selectBox"
import { BlockStorageAttributeType } from "@/types/type"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { RegionsArray } from "@/options/resourceOptions"
import { cn } from "@/lib/utils"
import { useYjsStore } from "@/lib/hooks/useYjsStore"
import { Node, Edge, MarkerType } from "reactflow"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import * as Y from 'yjs'

interface BlockStorageAttributeProps {
  attribute: BlockStorageAttributeType
  onEdit: (data: BlockStorageAttributeType) => void
  onClose: () => void
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
  id: string
}

export default function EditBlockStorageAttribute({attribute, onEdit, onClose, setEdges, id}:BlockStorageAttributeProps) {
  const {yDoc} = useYjsStore()
  const [hasChanges, setHasChanges] = useState(false)
  
  const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
  const nodes = yNodes.toArray().map(ynode => ({
    id: ynode.get('id') as string,
    type: ynode.get('type') as string,
    position: ynode.get('position'),
    data: ynode.get('data')
  })) as Node[]

  const { register, handleSubmit, setValue, watch } = useForm<BlockStorageAttributeType>({
    defaultValues: attribute
  })
  
  const watchedValues = watch()
  
  useEffect(() => {
    const hasAnyChange = Object.keys(attribute).some(key => {
      const field = key as keyof BlockStorageAttributeType
      return watchedValues[field] !== attribute[field]
    })
    
    setHasChanges(hasAnyChange)
  }, [watchedValues, attribute])
  
  const computeNodes = nodes.filter(node => 
    node.data.type === 'Compute' &&
    node.data.attribute.status !== 'remove'
  ).map(node => ({
    value: node.id,
    label: node.data.attribute.label
  }))

  const handleAttachChange = (computeId: string) => {
    setValue('attached_to', computeId)
  }

  const isValueChanged = (property: keyof BlockStorageAttributeType) => {
    const currValue = watch(property)
    return currValue !== attribute[property]
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
    if(onEdit) {
      onEdit(data)
      
      const computeId = data.attached_to
      if(!computeId && (computeId === '')) return
      setEdges(prev => {
        const existingEdge = prev.find(edge => edge.target === attribute.attached_to)
        if(existingEdge) {
          return prev.map(edge =>
            edge.target === attribute.attached_to
              ? {...edge, target: computeId}
              : edge
          )
        } else {
          return [
            ...prev,
            {
              id: `e-${id}-${Date.now()}`,
              source: id,
              target: computeId,
              sourceHandle: 'right',
              targetHandle: 'left',
              type: 'edge',
              markerEnd: {
                type: MarkerType.Arrow,
                width: 20,
                height: 20,
                color: '#6E6E6E'
              },
            }
          ]
        }
      })
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

      <AttributeSection>
        <InfoItem label="Region">
          <SelectBox 
            option={regionOptions}
            placeholder={attribute.region || "Select region"}
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
            placeholder={nodes.find(node => node.id === attribute.attached_to)?.data.attribute.label || "Select compute"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('attached_to') ? "text-blue-500 font-medium" : "")}
            onChange={handleAttachChange}
          />
          <p className="text-xs text-gray-500">on this page, GB = 1024^3 bytes</p>
        </div>
      </AttributeSection>
        
      <AttributeSection>
        <InfoItem label="Type">{attribute.type}</InfoItem>
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

      <AttributeSection>
        <InfoItem label="Label">
          <Input
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm", 
              isValueChanged('label') ? "text-blue-500 font-medium" : "")}
            {...register('label')}
          />
        </InfoItem>
      </AttributeSection>
    </form>
  )
}