'use client'
import Image from "next/image"
import { InfoItem, SpecSection } from "../specBar"
import SelectBox from "@/components/custom/selectBox"
import { ObjectStorageSpecType } from "@/lib/projectDB"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { RegionsArray } from "@/lib/resourceOptions"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { ObjectStorageOptions } from "@/lib/objectStorageOptions"
import { cn } from "@/lib/utils"

interface AddNewObjectStorageProps {
  onAdd: (data: ObjectStorageSpecType) => void
  onClose: () => void
}

export default function AddNewObjectStorage({onClose, onAdd}: AddNewObjectStorageProps) {

  const [filteredObjectOptions, setFilteredObjectOptions] = useState<any[]>([])
  const [isFormValid, setIsFormValid] = useState(false)

  const defaultValues = {
    id: "",
    label: "",
    region: "",
    plan: "",
    price: "",
    storage_price: "0.018/GB",
    transfer_price: "0.018/GB"
  }

  const [selectedPrice, setSelectedPrice] = useState({
    price: '',
  })

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues,
    mode: "onChange"
  })

  const region = watch('region')
  const label = watch('label')
  const plan = watch('plan')

  useEffect(() => {
    setIsFormValid(!!region && !!label && !!plan)
  }, [region, label, plan])

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
  
  const onSubmit = (data: ObjectStorageSpecType) => {
    if(onAdd) {
      onAdd(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-4 py-2 border-b justify-between">
        <div className="gap-3 flex items-center">
          <Image
            alt="block storage"
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
      <SpecSection>
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
        <InfoItem label="Plan">
          <div className='flex flex-col w-full' style={{ cursor: !watch('region') ? 'not-allowed' : 'default' }}>
            <SelectBox 
              option={filteredObjectOptions.map(opt => ({
                value: opt.id,
                label: opt.plan
              }))}
              placeholder={"Select compute type"}
              className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full",
                !watch('region') ? "cursor-not-allowed pointer-events-none" : ""
              )}
              onChange={handlePlanChange}
            />
            {!plan && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>
        {region && plan && (
            <>
              <InfoItem label="Price">
                <div className="h-9 w-full flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm gap-2">
                  ${selectedPrice.price}
                  <p className="text-[11px] text-gray-400">per Month</p>
                </div>
              </InfoItem>
            </>
        )}
        <InfoItem label="Storage Price">
          <div className="h-9 w-full flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm gap-2">
            ${defaultValues.storage_price}
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
        <InfoItem label="Transfer Price">
          <div className="h-9 w-full flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm gap-2">
            ${defaultValues.transfer_price}
            <p className="text-[11px] text-gray-400">over 1000GB</p>
          </div>
        </InfoItem>
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
      </SpecSection>
    </form>
  )
}