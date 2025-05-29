'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InfoItem, AttributeSection, InfoIcon } from '../ui/attributeBar'
import { Copy } from 'lucide-react'
import { ComputeAttributeType } from "@/types/type"
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { ComputeOptions } from '@/options/computeOptions'
import { RegionsArray, OSArray } from '@/options/resourceOptions'
import SelectBox from '@/components/custom/ui/dropDown/selectBox'
import { useState, useEffect } from 'react'
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import { Node, Edge, MarkerType } from 'reactflow'
import * as Y from 'yjs'

interface EditComputeAttributeProps {
  attribute: ComputeAttributeType
  onEdit: (data: ComputeAttributeType) => void
  onClose: () => void
  setEdges: (updater: (prev: Edge[]) => Edge[]) => void
  id: string
}

const statusConfig = {
  running: 'bg-green-400',
  pending: 'bg-yellow-400',
  stopped: 'bg-red-400',
}

export default function EditComputeAttribute({
  attribute,
  onEdit,
  onClose,
  setEdges,
  id,
}: EditComputeAttributeProps) {

  const {yDoc} = useYjsStore()

  const yNodes = yDoc.getArray<Y.Map<any>>('nodes')
  const nodes = yNodes.toArray().map(ynode => ({
    id: ynode.get('id') as string,
    type: ynode.get('type') as string,
    position: ynode.get('position'),
    data: ynode.get('data')
  })) as Node[]

  const { register, handleSubmit, setValue, watch } = useForm<ComputeAttributeType>({
    defaultValues: attribute,
  })

  const [selectedAttribute, setSelectedAttribute] = useState({
    vcpu: attribute.vcpu,
    ram: attribute.ram,
    disk: attribute.disk,
    disk_type: attribute.disk_type,
    bandwidth: attribute.bandwidth,
    monthly_cost: attribute.monthly_cost
  })

  const watchedValues = watch()
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const hasAnyChanges = Object.keys(attribute).some(key => {
      const field = key as keyof ComputeAttributeType
      return watchedValues[field] !== attribute[field]
    })
    setHasChanges(hasAnyChanges)
  }, [watchedValues, attribute])

  const firewallGroup = nodes
    .filter(node => 
      node.data.type === 'FirewallGroup' &&
      node.data.attribute.status !== 'remove' 
    ).map(node => ({
      value: node.id,
      label: node.data.type
  }))

  const handleFirewallChange = (firewallId: string) => {
    setValue('firewall_group_id', firewallId)
  }


  const isValueChanged = (property: keyof ComputeAttributeType) => {
    const currValue = watch(property)
    return currValue !== attribute[property]
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
    if (attribute.region_id) {
      filterComputeOptions(attribute.region_id)
    }
  }, [])

  const handleRegionChange = (region_id: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region_id)
    if(selectedRegion) {
      setValue('region_id', region_id)
      setValue('region', selectedRegion.city)
    }

    filterComputeOptions(region_id)
  }

  const handleOsChange = (osId: string) => {
    const selectedOs = OSArray.find(os => os.id === Number(osId))
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
      setValue('disk_type', selected.disk_type)
      setValue('bandwidth', selected.bandwidth)
      setValue('monthly_cost', selected.monthly_cost)

      setSelectedAttribute({
        vcpu: selected.vcpu,
        ram: selected.ram,
        disk: selected.disk,
        disk_type: selected.disk_type,
        bandwidth: selected.bandwidth,
        monthly_cost: selected.monthly_cost
      })
    }
  }

  const onSubmit = (data: ComputeAttributeType) => {
    if (onEdit) {
      onEdit(data)
      const firewallId = data.firewall_group_id
      if((firewallId === '') || !firewallId) return
      setEdges(prev => {
        const existingEdge = prev.find(edge => edge.target === attribute.firewall_group_id)

        if (existingEdge) {
          // 원래 엣지가 있으면 그거 업데이트
          return prev.map(edge =>
            edge.target === attribute.firewall_group_id
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
            alt="compute compute"
            src={'/aut-compute.svg'}
            width={23.5}
            height={23.5}
            className="rounded-xs"
          ></Image>
          <h3 className="text-xs font-medium">Compute</h3>
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
        <div className="flex items-center gap-2">
          <div className={`rounded-full w-2 h-2 ${statusConfig[attribute.status as keyof typeof statusConfig]}`} />
          <p className="text-xs">{attribute.status}</p>
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

        <InfoItem label='Plan'>
          <SelectBox 
            option={filteredComputeOptions.map(opt => ({
              value: opt.plan,
              label: opt.plan
            }))}
            placeholder={attribute.plan || "Select compute type"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('plan') ? "text-blue-500 font-medium" : ""
            )}
            onChange={handleComputePlanChange}
          />
        </InfoItem>

        <InfoItem label="OS">
          <SelectBox 
            option={OsOptions}
            placeholder={attribute.os}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('os') ? "text-blue-500 font-medium" : "")}
            onChange={handleOsChange}
          />
        </InfoItem>

        <InfoItem label="IP Address">
          <div className="flex w-full justify-between items-center">
            <p className="text-xs">{attribute.main_ip}</p>
            <Copy size={18} className="text-gray-500" />
          </div>
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label="vCPU/s">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('vcpu') ? "text-blue-500 font-medium" : "")}>
            {`${selectedAttribute.vcpu} vCPU`}
          </div>
        </InfoItem>
        <InfoItem label="RAM">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('ram') ? "text-blue-500 font-medium" : "")}>
            {`${selectedAttribute.ram} MB`}
          </div>
        </InfoItem>
        <InfoItem label="Disk">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('disk') ? "text-blue-500 font-medium" : "")}>
            {attribute.disk_type} {`${selectedAttribute.disk} GB`}
          </div>
        </InfoItem>
        <InfoItem label="Bandwidth">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('bandwidth') ? "text-blue-500 font-medium" : "")}>
            {`${selectedAttribute.bandwidth} GB`}
            <div className='ml-2'>
              <InfoIcon  label="?" />
            </div>
          </div>
        </InfoItem>
        <InfoItem label="Monthly Cost">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('monthly_cost') ? "text-blue-500 font-medium" : "")}>
            {`$${selectedAttribute.monthly_cost} per Month`}
          </div>
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        <InfoItem label='Firewall'>
          <SelectBox
            option={firewallGroup}
            placeholder={attribute.firewall_group_id || 'Select firewall group'}
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
          {attribute.auto_backups === "enable" ? (
            <p className="text-xs text-green-600">Enabled</p>
          ) : (
            <p className="text-xs text-red-600">Not Enabled</p>
          )}
        </InfoItem>
      </AttributeSection>
    </form>
  )
}
