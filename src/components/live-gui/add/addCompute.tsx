'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InfoItem, AttributeSection, InfoIcon } from '../attributeBar'
import { Copy } from 'lucide-react'
import { ComputeAttributeType } from '@/lib/projectDB'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { ComputeOptions } from '@/lib/computeOptions'
import { RegionsArray, OSArray } from '@/lib/resourceOptions'
import SelectBox from '@/components/custom/selectBox'
import { useState, useEffect } from 'react'
import { useYjsStore } from '@/lib/useYjsStore'
import { Node } from 'reactflow'
import * as Y from 'yjs'

interface AddNewResourceProps {
  onAdd: (data: ComputeAttributeType) => void
  onClose: () => void
}

export default function AddNewCompute({onAdd, onClose}:AddNewResourceProps) {

  const {yDoc} = useYjsStore()
  
  const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
  const nodes = yNodes.toArray().map(ynode => ({
    id: ynode.get('id') as string,
    type: ynode.get('type') as string,
    position: ynode.get('position'),
    data: ynode.get('data')
  })) as Node[]

  const { register, handleSubmit, setValue, watch }  = useForm({
    defaultValues: {
      region: '',
      region_id: '',
      plan: '',
      os_id: '',
      os: '',
      vcpu: '',
      ram: '',
      disk: '',
      bandwidth: '',
      status: 'running',
      ip_address: '64.176.217.21',
      label: '',
      auto_backups: 'enable',
      monthly_cost: '',
      group_id: '',
    },
    mode: "onChange"
  })

  const [filteredComputeOptions, setFilteredComputeOptions] = useState<any[]>([])

  const region = watch('region')
  const computePlan = watch('plan')
  const os = watch('os')
  const label = watch('label')

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(!!region && !!computePlan && !!os && !!label)
  }, [region, computePlan, os, label])

  const firewallGroup = nodes
    .filter(node => 
      node.data.type === 'FireWall' &&
      node.data.attribute.status !== 'remove' 
    ).map(node => ({
      value: node.id.toString(),
      label: node.data.attribute.label 
    }))

  const handleFirewallChange = (firewallId: string) => {
    setValue('group_id', firewallId)
  }

  const [selectedAttribute, setSelectedAttribute] = useState({
    vcpu: '',
    ram: '',
    disk: '',
    bandwidth: '',
    monthly_cost: ''
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

  const filterComputeOptions = (region_id: string) => {
    if (region_id) {
      const filtered = ComputeOptions.filter(option => 
        option.regions.includes(region_id)
      ).map(option => ({
        plan: option.plan,
        region: region_id,
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

  const handleRegionChange = (region_id: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region_id)
    if(!selectedRegion) return

    setValue('region_id', region_id)
    setValue('region', selectedRegion.city)
    filterComputeOptions(region_id)
  }

  const handleOsChange = (os_id: string) => {
    const selectedOs = OSArray.find(os => String(os.id) === os_id);
    if (selectedOs) {
      setValue('os_id', String(selectedOs.id))
      setValue('os', selectedOs.name)
    }
  }

  const handleComputePlanChange = (plan: string) => {
    const selected = filteredComputeOptions.find(opt => opt.plan === plan)
    if (selected) {
      setValue('plan', plan)

      setValue('vcpu', selected.vcpu)
      setValue('ram', selected.ram)
      setValue('disk', selected.disk)
      setValue('bandwidth', selected.bandwidth)
      setValue('monthly_cost', selected.monthly_cost)

      setSelectedAttribute({
        vcpu: selected.vcpu,
        ram: selected.ram,
        disk: selected.disk,
        bandwidth: selected.bandwidth,
        monthly_cost: selected.monthly_cost,
      })
    }
  }

  const onSubmit = (data: ComputeAttributeType) => {
    if (onAdd) {
      onAdd(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <div className="gap-3 flex items-center">
          <Image
            alt="compute instance"
            src={'/aut-compute.svg'}
            width={23.5}
            height={23.5}
            className="rounded-xs"
          ></Image>
          <h3 className="text-xs font-medium">Instance</h3>
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
        <InfoItem label="region">
          <div className='flex flex-col w-full'>
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

        <InfoItem label='Plan'>
          <div className='flex flex-col w-full' style={{ cursor: !watch('region') ? 'not-allowed' : 'default' }}>
            <SelectBox 
              option={filteredComputeOptions.map(opt => ({
                value: opt.plan,
                label: opt.plan
              }))}
              placeholder={"Select compute type"}
              className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full",
                !watch('region') ? "cursor-not-allowed pointer-events-none" : ""
              )}
              onChange={handleComputePlanChange}
            />
            {!computePlan && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>

        <InfoItem label="OS">
          <div className='flex flex-col w-full'>
            <SelectBox 
              option={OsOptions}
              placeholder={"Select OS"}
              className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full"
              onChange={handleOsChange}
            />
            {!os && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>

        <InfoItem label="IP Address">
          <div className="flex w-full justify-between items-center">
            <p className="text-xs">{"64.176.217.21"}</p>
            <Copy size={18} className="text-gray-500" />
          </div>
        </InfoItem>
      </AttributeSection>
        
      {region && computePlan && os && (
        <>
          <AttributeSection>
            <InfoItem label="vCPU/s">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`${selectedAttribute.vcpu} vCPU`}
              </div>
            </InfoItem>
            <InfoItem label="RAM">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`${selectedAttribute.ram} MB`}
              </div>
            </InfoItem>
            <InfoItem label="Disk">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`${selectedAttribute.disk} GB`}
              </div>
            </InfoItem>
            <InfoItem label="Bandwidth">
              <div className="h-9 w-full flex items-center px-3 text-xs text-[#8171E8] bg-white shadow-none border rounded-sm">
                {`${selectedAttribute.bandwidth} GB`}
                <div className='ml-2'>
                  <InfoIcon label="?" />
                </div>
              </div>
            </InfoItem>
            <InfoItem label="Monthly Cost">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`$${selectedAttribute.monthly_cost} per Month`}
              </div>
            </InfoItem>
          </AttributeSection>
        </>
      )}
      <AttributeSection>
        <InfoItem label='Firewall'>
          <SelectBox
            option={firewallGroup}
            placeholder='Select firewall group'
            className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full"
            onChange={handleFirewallChange}
          >
          </SelectBox>
        </InfoItem>
        <InfoItem label="Label">
          <div className='flex flex-col w-full'>
            <Input
              placeholder='Input label'
              className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm")}
              {...register('label')}
            />
            {!label && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>
      </AttributeSection>
    </form>
  )
}