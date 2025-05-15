import Image from "next/image"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import SelectBox from "@/components/custom/selectBox"
import { RegionsArray } from "@/lib/resourceOptions"
import { ObjectStorageOptions } from "@/lib/objectStorageOptions"
import { InfoItem, SpecSection } from "../specBar"
import { ObjectStorageSpecType } from "@/lib/projectDB"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { eventBus } from "@/services/eventBus"
import { useState, useEffect } from "react"

interface ObectStorageSpecProps {
  spec: ObjectStorageSpecType
  onEdit: (data: ObjectStorageSpecType) => void
  onClose: () => void
}

export default function EditObjectStorageSpec({spec, onClose, onEdit}: ObectStorageSpecProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ObjectStorageSpecType>({
    defaultValues: spec
  })

  const watchedValues = watch()
  const [hasChanges, setHasChanges] = useState(false)
  const [filteredObjectOptions, setFilteredObjectOptions] = useState<any[]>([])
  const [selectedPrice, setSelectedPrice] = useState({
    price: spec.price,
  })

  useEffect(() => {
    const hasAnyChanges = Object.keys(spec).some(key => {
      const field = key as keyof ObjectStorageSpecType
      return watchedValues[field] !== spec[field]
    })
    setHasChanges(hasAnyChanges)
  }, [watchedValues, spec])

  const isValueChanged = (property: keyof ObjectStorageSpecType) => {
    const currValue = watch(property)
    return currValue !== spec[property]
  }

  const regionOptions = RegionsArray.map(region => ({
    value: region.id,
    label: `${region.city} (${region.id})`,
    flag: region.flag
  }))

  const filterObjectOtions = (region: string) => {
    if(region) {
      const filtered = ObjectStorageOptions.filter(option =>
        option.regions.includes(region)
      ).map(option => ({
        id: option.id,
        region: region,
        plan: option.plan,
        price: option.price,
      }))
      setFilteredObjectOptions(filtered)
    } else {
      setFilteredObjectOptions([])
    }
  }

  const handleRegionChange = (region: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region)
    const regionWithCity = selectedRegion ? 
      `${selectedRegion.city} (${region})` : 
      region
    
    setValue('region', regionWithCity)
    filterObjectOtions(region)
  }

  const handlePlanChange = (id: string) => {
    const selected = filteredObjectOptions.find(opt => opt.id === id)
    if(selected) {
      setValue('id', id)
      setValue('plan', selected.plan)
      setValue('price', `${selected.price}`)

      setSelectedPrice({
        price: selected.price
      })
    }
  }
  
  const onSubmit = (data:ObjectStorageSpecType) => {
    if(onEdit) {
      onEdit(data)
      eventBus.publish('objectSpecUpdated', data)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-4 py-2 border-b justify-between">
        <div className="gap-3 flex items-center">
          <Image
            alt="object storage"
            src={"/aut-objectstorage.svg"}
            width={23.5}
            height={23.5}
            className="rounded-xs"
          ></Image>
          <h3 className="text-sm font-medium">Object Storage</h3>
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
        <InfoItem label="Plan">
          <SelectBox 
            option={filteredObjectOptions.map(opt => ({
              value: opt.id,
              label: opt.plan
            }))}
            placeholder={spec.plan || "Select compute type"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('region') ? "text-blue-500 font-medium" : "")}
            onChange={handlePlanChange}
          />
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="price">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2", 
            isValueChanged('price') ? "text-blue-500 font-medium" : "")}>
            ${selectedPrice.price}
            <p className="text-[11px] text-gray-400">per Month</p>
          </div>
        </InfoItem>
        <InfoItem label="Storage Price">
          <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2">
            ${spec.storage_price}
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2">
            ${spec.transfer_price}
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Label">
          <Input
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm", 
              isValueChanged('label') ? "text-blue-500 font-medium" : "")}
            {...register('label')}
          />
        </InfoItem>
      </SpecSection>
    </form>
  )
}