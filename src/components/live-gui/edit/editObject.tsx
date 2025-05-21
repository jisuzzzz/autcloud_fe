import Image from "next/image"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import SelectBox from "@/components/custom/selectBox"
import { InfoItem, AttributeSection } from "../attributeBar"
import { ObjectStorageAttributeType } from "@/lib/projectDB"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ObjectPlan, ObjectStorageOptions } from "@/lib/objectStorageOptions"

interface ObectStorageAttributeProps {
  attribute: ObjectStorageAttributeType
  onEdit: (data: ObjectStorageAttributeType) => void
  onClose: () => void
}

export default function EditObjectStorageAttribute({attribute, onClose, onEdit}: ObectStorageAttributeProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ObjectStorageAttributeType>({
    defaultValues: attribute
  })

  const watchedValues = watch()
  const [hasChanges, setHasChanges] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<any[]>([])
  const [selectedAttribute, setSelectedAttribute] = useState({
    price: attribute.price,
    ratelimit_ops_secs: attribute.ratelimit_ops_secs,
    ratelimit_ops_bytes: attribute.ratelimit_ops_bytes,
    disk_gb_price: attribute.disk_gb_price,
    bw_gb_price: attribute.bw_gb_price,
  })

  useEffect(() => {
    if(attribute.tier_id) {
      filterObjectOtions(attribute.tier_id)
    }
  }, [])

  useEffect(() => {
    const hasAnyChanges = Object.keys(attribute).some(key => {
      const field = key as keyof ObjectStorageAttributeType
      return watchedValues[field] !== attribute[field]
    })
    setHasChanges(hasAnyChanges)
  }, [watchedValues, attribute])

  const isValueChanged = (property: keyof ObjectStorageAttributeType) => {
    const currValue = watch(property)
    return currValue !== attribute[property]
  }

  const planOptions = ObjectPlan.map(plan => ({
    value: plan.tier_id,
    label: plan.plan
  }))

  const filterObjectOtions = (tier_id: string) => {
    if(tier_id) {
      const filtered = ObjectStorageOptions.filter(option =>
        option.tier_id === tier_id
      ).map(option => ({
        cluster_id: option.cluster_id,
        tier_id: tier_id,
        region: option.city,
        plan: option.sales_name,
        price: option.price,
        ratelimit_ops_secs: option.ratelimit_ops_secs,
        ratelimit_ops_bytes: option.ratelimit_ops_bytes,
        disk_gb_price: option.disk_gb_price,
        bw_gb_price: option.bw_gb_price,
      }))
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions([])
    }
  }

  const handleRegionChange = (cluster_id: string) => {
    const selected = filteredOptions.find(opt => opt.cluster_id === cluster_id)
    if(selected) {
      setValue('cluster_id', cluster_id)
      setValue('region', selected.region)
      setValue('plan', selected.plan)
      setValue('price', selected.price)
      setValue('ratelimit_ops_secs', selected.ratelimit_ops_secs)
      setValue('ratelimit_ops_bytes', selected.ratelimit_ops_bytes)
      setValue('disk_gb_price', selected.disk_gb_price)
      setValue('bw_gb_price', selected.bw_gb_price)
      
      setSelectedAttribute({
        price: selected.price,
        ratelimit_ops_secs: selected.ratelimit_ops_secs,
        ratelimit_ops_bytes: selected.ratelimit_ops_bytes,
        disk_gb_price: selected.disk_gb_price,
        bw_gb_price: selected.bw_gb_price,
      })
    }
  }

  const handlePlanChange = (tier_id: string) => {
    setValue('tier_id', tier_id)
    const selectedPlan = ObjectPlan.find(plan => plan.tier_id === tier_id)
    if (selectedPlan) {
      setValue('plan', selectedPlan.plan)
    }
    setValue('cluster_id', '')
    setValue('region', '')
    
    filterObjectOtions(tier_id)
  }
  
  const onSubmit = (data: ObjectStorageAttributeType) => {
    if(onEdit) {
      onEdit(data)
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

      <AttributeSection>
        <InfoItem label="Plan">
          <SelectBox 
            option={planOptions}
            placeholder={watchedValues.plan || "Select plan"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('plan') ? "text-blue-500 font-medium" : "")}
            onChange={handlePlanChange}
          />
        </InfoItem>
        <InfoItem label="Region">
          <SelectBox 
            option={filteredOptions.map(opt => ({
              value: opt.cluster_id,
              label: opt.region
            }))}
            placeholder={watchedValues.region || "Select region"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('cluster_id') ? "text-blue-500 font-medium" : "")}
            onChange={handleRegionChange}
          />
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label="Price">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2", 
            isValueChanged('price') ? "text-blue-500 font-medium" : "")}>
            ${selectedAttribute.price}
            <p className="text-[11px] text-gray-400">per Month</p>
          </div>
        </InfoItem>
        <InfoItem label="Storage Price">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2",
            isValueChanged('disk_gb_price') ? "text-blue-500 font-medium" : "")}>
            ${selectedAttribute.disk_gb_price}
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2",
            isValueChanged('bw_gb_price') ? "text-blue-500 font-medium" : "")}>
            ${selectedAttribute.bw_gb_price}
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Rate Limit Ops/Sec">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2",
            isValueChanged('ratelimit_ops_secs') ? "text-blue-500 font-medium" : "")}>
            {selectedAttribute.ratelimit_ops_secs}
            <p className="text-[11px] text-gray-400">ops/sec</p>
          </div>
        </InfoItem>
        <InfoItem label="Rate Limit Ops/bytes">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2",
            isValueChanged('ratelimit_ops_bytes') ? "text-blue-500 font-medium" : "")}>
            {selectedAttribute.ratelimit_ops_bytes}
            <p className="text-[11px] text-gray-400">bytes/sec</p>
          </div>
        </InfoItem>
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