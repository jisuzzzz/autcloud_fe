'use client'
import Image from "next/image"
import { InfoItem, AttributeSection } from "../ui/attributeBar"
import SelectBox from "@/components/custom/ui/dropDown/selectBox"
import { ObjectStorageAttributeType } from "@/types/type"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { ObjectPlan, ObjectRegion, ObjectStorageOptions } from "@/options/objectStorageOptions"
import { cn } from "@/lib/utils"

interface AddNewObjectStorageProps {
  onAdd: (data: ObjectStorageAttributeType) => void
  onClose: () => void
}

export default function AddNewObjectStorage({onClose, onAdd}: AddNewObjectStorageProps) {
  const [filteredOptions, setFilteredOptions] = useState<any[]>([])
  const [isFormValid, setIsFormValid] = useState(false)

  const defaultValues: Partial<ObjectStorageAttributeType> = {
    label: "",
    region: "",
    plan: "",
    tier_id: "",
    cluster_id: "",
    price: "",
    disk_gb_price: "",
    bw_gb_price: "",
    ratelimit_ops_secs: "",
    ratelimit_ops_bytes: ""
  }

  const [selectedAttribute, setSelectedAttribute] = useState({
    price: '',
    disk_gb_price: '',
    bw_gb_price: '',
    ratelimit_ops_secs: '',
    ratelimit_ops_bytes: ''
  })

  const { register, handleSubmit, setValue, watch } = useForm<ObjectStorageAttributeType>({
    defaultValues,
    mode: "onChange"
  })

  const watchedValues = watch()
  const { region, label, plan, tier_id, cluster_id } = watchedValues

  useEffect(() => {
    setIsFormValid(!!region && !!label && !!plan && !!tier_id && !!cluster_id)
  }, [region, label, plan, tier_id, cluster_id])

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
      setValue('price', selected.price)
      setValue('ratelimit_ops_secs', selected.ratelimit_ops_secs)
      setValue('ratelimit_ops_bytes', selected.ratelimit_ops_bytes)
      setValue('disk_gb_price', selected.disk_gb_price)
      setValue('bw_gb_price', selected.bw_gb_price)
      
      setSelectedAttribute({
        price: selected.price,
        disk_gb_price: selected.disk_gb_price,
        bw_gb_price: selected.bw_gb_price,
        ratelimit_ops_secs: selected.ratelimit_ops_secs,
        ratelimit_ops_bytes: selected.ratelimit_ops_bytes
      })
    }
  }

  const handlePlanChange = (tier_id: string) => {
    setValue('tier_id', tier_id)
    // Find the plan name from ObjectPlan
    const selectedPlan = ObjectPlan.find(plan => plan.tier_id === tier_id)
    if (selectedPlan) {
      setValue('plan', selectedPlan.plan)
    }
    
    // Clear the currently selected region and related fields
    setValue('cluster_id', '')
    setValue('region', '')
    
    // Filter available options for this tier
    filterObjectOtions(tier_id)
  }
  
  const onSubmit = (data: ObjectStorageAttributeType) => {
    if(onAdd) {
      onAdd(data)
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
          <h3 className="text-xs font-medium">Object Storage</h3>
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
        <InfoItem label="Plan">
          <div className="flex flex-col w-full">
            <SelectBox 
              option={planOptions}
              placeholder="Select plan"
              className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full" 
              onChange={handlePlanChange}
            />
            {!plan && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>
        <InfoItem label="Region">
          <div className='flex flex-col w-full' style={{ cursor: !tier_id ? 'not-allowed' : 'default' }}>
            <SelectBox 
              option={filteredOptions.map(opt => ({
                value: opt.cluster_id,
                label: opt.region
              }))}
              placeholder="Select region"
              className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full",
                !tier_id ? "cursor-not-allowed pointer-events-none" : ""
              )}
              onChange={handleRegionChange}
            />
            {!region && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        {tier_id && cluster_id && (
          <>
            <InfoItem label="Price">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2">
                ${selectedAttribute.price}
                <p className="text-[11px] text-gray-400">per Month</p>
              </div>
            </InfoItem>
            <InfoItem label="Storage Price">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2">
                ${selectedAttribute.disk_gb_price}/GB
                <p className="text-[11px] text-gray-400">over 1000GB</p>
              </div>
            </InfoItem>
            <InfoItem label="Transfer Price">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2">
                ${selectedAttribute.bw_gb_price}/GB
                <p className="text-[11px] text-gray-400">over 1000GB</p>
              </div>
            </InfoItem>
            <InfoItem label="Rate Limit Ops/Sec">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2">
                {selectedAttribute.ratelimit_ops_secs}
                <p className="text-[11px] text-gray-400">ops/sec</p>
              </div>
            </InfoItem>
            <InfoItem label="Rate Limit Ops/bytes">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm gap-2">
                {selectedAttribute.ratelimit_ops_bytes}
                <p className="text-[11px] text-gray-400">bytes/sec</p>
              </div>
            </InfoItem>
          </>
        )}
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