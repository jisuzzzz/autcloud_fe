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
import { useYjsStore } from '@/lib/useYjsStore'
import { Node, Edge, MarkerType } from 'reactflow'

interface EditComputeSpecProps {
  spec: ComputeSpecType
  onEdit: (data: ComputeSpecType) => void
  onClose: () => void
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
  id: string
}

export default function EditComputeSpec({
  spec,
  onEdit,
  onClose,
  setEdges,
  id,
}: EditComputeSpecProps) {

  const {yDoc} = useYjsStore()

  const yNodes = yDoc.getArray<Node>('nodes')
  const nodes = yNodes.toArray() as Node[]

  const { register, handleSubmit, setValue, watch } = useForm<ComputeSpecType>({
    defaultValues: spec,
  })

  const [selectedSpec, setSelectedSpec] = useState({
    vcpu: spec.vcpu,
    ram: spec.ram,
    disk: spec.disk,
    bandwidth: spec.bandwidth,
    monthly_cost: spec.monthly_cost
  })

  const watchedValues = watch()
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const hasAnyChanges = Object.keys(spec).some(key => {
      const field = key as keyof ComputeSpecType
      return watchedValues[field] !== spec[field]
    })
    setHasChanges(hasAnyChanges)
  }, [watchedValues, spec])

  const firewallGroup = nodes
    .filter(node => 
      node.data.type === 'FireWall' &&
      node.data.spec.status !== 'remove' 
    ).map(node => ({
      value: node.id,
      label: node.data.spec.label 
  }))

  const handleFirewallChange = (firewallId: string) => {
    setValue('group_id', firewallId)
  }


  const isValueChanged = (property: keyof ComputeSpecType) => {
    const currValue = watch(property)
    return currValue !== spec[property]
  }

  const [filteredComputeOptions, setFilteredComputeOptions] = useState<any[]>([])

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

  useEffect(() => {
    if (spec.region_id) {
      filterComputeOptions(spec.region_id)
    }
  }, [])

  const handleRegionChange = (region_id: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region_id)
    if(selectedRegion) {
      setValue('region_id', region_id)
      setValue('region', selectedRegion.city)
    }
    // setValue('plan', '')

    filterComputeOptions(region_id)
  }

  const handleOsChange = (osId: string) => {
    const selectedOs = OSArray.find(os => String(os.id) === osId)
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

      setSelectedSpec({
        vcpu: selected.vcpu,
        ram: selected.ram,
        disk: selected.disk,
        bandwidth: selected.bandwidth,
        monthly_cost: selected.monthly_cost
      })
    }
  }

  const onSubmit = (data: ComputeSpecType) => {
    if (onEdit) {
      onEdit(data)
      const firewallId = data.group_id
      if((firewallId === '') || !firewallId) return
      setEdges(prev => {
        const existingEdge = prev.find(edge => edge.target === spec.group_id)

        if (existingEdge) {
          // 원래 엣지가 있으면 그거 업데이트
          return prev.map(edge =>
            edge.target === spec.group_id
              ? { ...edge, target: firewallId }
              : edge
          )
        } else {
          // 엣지 없으면 새로 추가
          return [
            ...prev,
            {
              id: `e-${id}-${Date.now()}`,
              source: id,
              target: firewallId,
              sourceHandle: 'top',
              targetHandle: 'bottom',
              type: 'edge',
              markerEnd: {
                type: MarkerType.Arrow,
                width: 20,
                height: 20,
                color: '#6E6E6E'
              },
            },
          ]
        }
      })
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
            disabled={!hasChanges}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2.5 border-b">
        <h3 className="text-xs text-gray-500">Status</h3>
        <Button
          className={cn('px-2.5 h-7 rounded-sm pointer-events-none text-xs', {
            'bg-green-500': spec.status === 'running',
            'bg-yellow-500': spec.status === 'pending',
            'bg-red-500': spec.status === 'stopped',
          })}
        >
          {spec.status}
        </Button>
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

        <InfoItem label='Plan'>
          <SelectBox 
            option={filteredComputeOptions.map(opt => ({
              value: opt.plan,
              label: opt.plan
            }))}
            placeholder={spec.plan || "Select compute type"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('plan') ? "text-blue-500 font-medium" : ""
            )}
            onChange={handleComputePlanChange}
          />
        </InfoItem>

        <InfoItem label="OS">
          <SelectBox 
            option={OsOptions}
            placeholder={spec.os}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('os') ? "text-blue-500 font-medium" : "")}
            onChange={handleOsChange}
          />
        </InfoItem>

        <InfoItem label="IP Address">
          <div className="flex w-full justify-between items-center">
            <p className="text-xs">{spec.ip_address}</p>
            <Copy size={18} className="text-gray-500" />
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="vCPU/s">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('vcpu') ? "text-blue-500 font-medium" : "")}>
            {`${selectedSpec.vcpu} vCPU`}
          </div>
        </InfoItem>
        <InfoItem label="RAM">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('ram') ? "text-blue-500 font-medium" : "")}>
            {`${selectedSpec.ram} MB`}
          </div>
        </InfoItem>
        <InfoItem label="Disk">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('disk') ? "text-blue-500 font-medium" : "")}>
            {`${selectedSpec.disk} GB`}
          </div>
        </InfoItem>
        <InfoItem label="Bandwidth">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('bandwidth') ? "text-blue-500 font-medium" : "")}>
            {`${selectedSpec.bandwidth} GB`}
            <div className='ml-2'>
              <InfoIcon  label="?" />
            </div>
          </div>
        </InfoItem>
        <InfoItem label="Monthly Cost">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('monthly_cost') ? "text-blue-500 font-medium" : "")}>
            {`$${selectedSpec.monthly_cost} per Month`}
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label='Firewall'>
          <SelectBox
            option={firewallGroup}
            placeholder={spec.group_id || 'Select firewall group'}
            className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full"
            onChange={handleFirewallChange}
          >
          </SelectBox>
        </InfoItem>
        <InfoItem label="Label">
          <Input
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm", 
              isValueChanged('label') ? "text-blue-500 font-medium" : "")}
            {...register('label')}
          />
        </InfoItem>

        <InfoItem label="Auto Backups">
          {spec.auto_backups === "enable" ? (
            <p className="text-xs text-green-600">Enabled</p>
          ) : (
            <p className="text-xs text-red-600">Not Enabled</p>
          )}
        </InfoItem>
      </SpecSection>
    </form>
  )
}
