'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InfoItem, SpecSection, InfoIcon } from './specBar'
import { Copy } from 'lucide-react'
import { ComputeSpecType } from '@/lib/projectDB'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { ComputeOptions } from '@/lib/computeOptions'
import { RegionsArray, OSArray } from '@/lib/resourceOptions'
import SelectBox from '@/components/custom/selectBox'
import { useState } from 'react'

interface AddNewResourceProps {
  onAdd: (data: ComputeSpecType) => void
  onClose: () => void
}

export default function AddNewResource({onAdd, onClose}:AddNewResourceProps) {
  const { register, handleSubmit, setValue, watch }  = useForm({
    defaultValues: {
      location: '',
      id: '',
      os: '',
      vcpu: '',
      ram: '',
      storage: '',
      bandwidth: '',
      status: 'running',
      ip_address: '64.176.217.21',
      label: 'compute-1212',
      auto_backups: false
    }
  })

  const [filteredComputeOptions, setFilteredComputeOptions] = useState<any[]>([])

  const location = watch('location')
  const computeId = watch('id')
  const os = watch('os')

  const [selectedSpec, setSelectedSpec] = useState({
    vcpu: '',
    ram: '',
    storage: '',
    bandwidth: '',
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
    if (onAdd) {
      onAdd(data)
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
          <h3 className="text-[13px] font-medium">Instance</h3>
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

      <SpecSection>
        <InfoItem label="Location">
          <SelectBox 
            option={regionOptions}
            placeholder={"Select region"}
            className="h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full"
            onChange={handleRegionChange}
            showFlags={true}
          />
        </InfoItem>

        <InfoItem label='Compute ID'>
          <div className='w-full' style={{ cursor: !watch('location') ? 'not-allowed' : 'default' }}>
            <SelectBox 
              option={filteredComputeOptions.map(opt => ({
                value: opt.id,
                label: opt.id
              }))}
              placeholder={"Select compute type"}
              className={cn("h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full",
                !watch('location') ? "cursor-not-allowed pointer-events-none" : ""
              )}
              onChange={handleComputeIdChange}
            />
          </div>
        </InfoItem>

        <InfoItem label="OS">
          <SelectBox 
            option={OsOptions}
            placeholder={"Select OS"}
            className="h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm w-full"
            onChange={handleOsChange}
          />
        </InfoItem>

        <InfoItem label="IP Address">
          <div className="flex w-full justify-between items-center">
            <p className="text-[13px]">{"64.176.217.21"}</p>
            <Copy size={18} className="text-gray-500" />
          </div>
        </InfoItem>
      </SpecSection>
        
      {location && computeId && os && (
        <>
          <SpecSection>
            <InfoItem label="vCPU/s">
              <div className="h-9 w-full flex items-center px-3 text-[13px] bg-[#F1F5F9] border-none rounded-sm">
                {selectedSpec.vcpu}
              </div>
            </InfoItem>
            <InfoItem label="RAM">
              <div className="h-9 w-full flex items-center px-3 text-[13px] bg-[#F1F5F9] border-none rounded-sm">
                {selectedSpec.ram}
              </div>
            </InfoItem>
            <InfoItem label="Storage">
              <div className="h-9 w-full flex items-center px-3 text-[13px] bg-[#F1F5F9] border-none rounded-sm">
                {selectedSpec.storage}
              </div>
            </InfoItem>
            <InfoItem label="Bandwidth">
              <div className="h-9 w-full flex items-center px-3 text-[13px] text-[#8171E8] bg-[#F1F5F9] border-none rounded-sm">
                {selectedSpec.bandwidth}
                <div className='ml-2'>
                  <InfoIcon label="?" />
                </div>
              </div>
            </InfoItem>
          </SpecSection>
        </>
      )}
      <SpecSection>
        <InfoItem label="Label">
          <Input
            className={cn("h-9 text-[13px] bg-[#F1F5F9] border-none rounded-sm")}
            {...register('label')}
          />
        </InfoItem>
      </SpecSection>
    </form>
  )
}