'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InfoItem, SpecSection, InfoIcon } from '../specBar'
import { Copy } from 'lucide-react'
import { ComputeSpecType } from '@/lib/projectDB'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { ComputeOptions } from '@/lib/computeOptions'
import { RegionsArray, OSArray } from '@/lib/resourceOptions'
import SelectBox from '@/components/custom/selectBox'
import { useState, useEffect } from 'react'
import { eventBus } from '@/services/eventBus'

interface EditComputeSpecProps {
  spec: ComputeSpecType
  onEdit: (data: ComputeSpecType) => void
  onClose: () => void
}

export default function EditComputeSpec({
  spec,
  onEdit,
  onClose
}: EditComputeSpecProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ComputeSpecType>({
    defaultValues: spec,
  })

  const isValueChanged = (property: keyof ComputeSpecType) => {
    const currValue = watch(property)
    return currValue !== spec[property]
  }

  const [filteredComputeOptions, setFilteredComputeOptions] = useState<any[]>([])

  const [selectedSpec, setSelectedSpec] = useState({
    vcpu: spec.vcpu,
    ram: spec.ram,
    storage: spec.storage,
    bandwidth: spec.bandwidth,
  })

  const regionOptions = RegionsArray.map(region => ({
    value: region.id,
    label: `${region.city} (${region.id})`,
    flag: region.flag
  }))

  const OsOptions = OSArray.map(os => ({
    value: String(os.id),
    label: os.name
  }))

  
  const filterComputeOptions = (region: string) => {
    if (region) {
      const filtered = ComputeOptions.filter(option => 
        option.locations.includes(region)
      ).map(option => ({
        id: option.id,
        location: region,
        vcpu: option.vcpu_count,
        ram: option.ram,
        disk: option.disk,
        bandwidth: option.bandwidth,
        monthly_cost: option.monthly_cost,
        disk_type: option.disk_type
      }))
      setFilteredComputeOptions(filtered)
    } else {
      setFilteredComputeOptions([])
    }
  }

  useEffect(() => {
    if (spec.location) {
      const regionCodeMatch = spec.location.match(/\(([^)]+)\)/)
      const regionCode = regionCodeMatch ? regionCodeMatch[1] : spec.location
      
      filterComputeOptions(regionCode)
    }
  }, [])

  const handleRegionChange = (region: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region)
    const regionWithCity = selectedRegion ? 
      `${selectedRegion.city} (${region})` : 
      region
    
    setValue('location', regionWithCity)
    filterComputeOptions(region)
  }

  const handleOsChange = (osValue: string) => {
    const selectedOs = OSArray.find(os => String(os.id) === osValue);
    if (selectedOs) {
      setValue('os', selectedOs.name);
    }
  }

  const handleComputeIdChange = (id: string) => {
    const selected = filteredComputeOptions.find(opt => opt.id === id)
    if (selected) {
      setValue('id', id)

      setValue('vcpu', `${selected.vcpu} vCPU`)
      setValue('ram', `${selected.ram} MB`)
      setValue('storage', `${selected.disk} GB SSD`)
      setValue('bandwidth', `${selected.bandwidth} Mbps`)

      setSelectedSpec({
        vcpu: `${selected.vcpu} vCPU`,
        ram: `${selected.ram} MB`,
        storage: `${selected.disk} GB SSD`,
        bandwidth: `${selected.bandwidth} Mbps`,
      })
    }
  }

  const onSubmit = (data: ComputeSpecType) => {
    if (onEdit) {
      onEdit(data)
      // 로컬 UI 업데이트를 위한 이벤트 발행
      eventBus.publish('computeSpecUpdated', data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="gap-3 flex items-center">
          <Image
            alt="compute instance"
            src={'/aut-compute.svg'}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-sm font-medium">Instance</h3>
        </div>
        <div className='flex items-center gap-3'>
          <Button type='button' onClick={onClose} className='px-3 py-1 h-[30px] rounded-sm text-xs bg-gray-50 hover:bg-violet-50 text-black border'>
            Cancel
          </Button>
          <Button type="submit" className="px-3 py-1 h-[30px] rounded-sm text-xs bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF]">
            Save
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2.5 border-b">
        <h3 className="text-xs text-gray-500">Status</h3>
        <Button
          className={cn('px-2.5 h-7 rounded-sm pointer-events-none', {
            'bg-green-500': spec.status === 'running',
            'bg-yellow-500': spec.status === 'pending',
            'bg-red-500': spec.status === 'stopped',
          })}
        >
          {spec.status}
        </Button>
      </div>

      <SpecSection>
        <InfoItem label="Location">
          <SelectBox 
            option={regionOptions}
            placeholder={spec.location || "Select region"}
            className={cn("h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('location') ? "text-blue-500 font-medium" : "")}
            onChange={handleRegionChange}
            showFlags={true}
          />
        </InfoItem>

        <InfoItem label='Compute ID'>
          <SelectBox 
            option={filteredComputeOptions.map(opt => ({
              value: opt.id,
              label: opt.id
            }))}
            placeholder={spec.id || "Select compute type"}
            className={cn("h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('id') ? "text-blue-500 font-medium" : ""
            )}
            onChange={handleComputeIdChange}
          />
        </InfoItem>

        <InfoItem label="OS">
          <SelectBox 
            option={OsOptions}
            placeholder={spec.os}
            className={cn("h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('os') ? "text-blue-500 font-medium" : "")}
            onChange={handleOsChange}
          />
        </InfoItem>

        <InfoItem label="IP Address">
          <div className="flex w-full justify-between items-center">
            <p className="text-[13px]">{spec.ip_address}</p>
            <Copy size={18} className="text-gray-500" />
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="vCPU/s">
          <div className={cn("h-9 w-full flex items-center px-3 text-[13px] bg-[#F1F5F9] border-none rounded-sm", 
            isValueChanged('vcpu') ? "text-blue-500 font-medium" : "")}>
            {selectedSpec.vcpu}
          </div>
        </InfoItem>
        <InfoItem label="RAM">
          <div className={cn("h-9 w-full flex items-center px-3 text-[13px] bg-[#F1F5F9] border-none rounded-sm", 
            isValueChanged('ram') ? "text-blue-500 font-medium" : "")}>
            {selectedSpec.ram}
          </div>
        </InfoItem>
        <InfoItem label="Storage">
          <div className={cn("h-9 w-full flex items-center px-3 text-[13px] bg-[#F1F5F9] border-none rounded-sm", 
            isValueChanged('storage') ? "text-blue-500 font-medium" : "")}>
            {selectedSpec.storage}
          </div>
        </InfoItem>
        <InfoItem label="Bandwidth">
          <div className={cn("h-9 w-full flex items-center px-3 text-[13px] bg-[#F1F5F9] border-none rounded-sm", 
            isValueChanged('bandwidth') ? "text-blue-500 font-medium" : "")}>
            {selectedSpec.bandwidth}
            <div className='ml-2'>
              <InfoIcon  label="?" />
            </div>
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Label">
          <Input
            className={cn("h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm", 
              isValueChanged('label') ? "text-blue-500 font-medium" : "text-[#8171E8]")}
            {...register('label')}
          />
        </InfoItem>

        <InfoItem label="Auto Backups">
          {spec.auto_backups ? (
            <p className="text-[13px] text-green-600">Enabled</p>
          ) : (
            <p className="text-[13px] text-red-600">Not Enabled</p>
          )}
          <InfoIcon label="!" />
        </InfoItem>
      </SpecSection>
    </form>
  )
}
