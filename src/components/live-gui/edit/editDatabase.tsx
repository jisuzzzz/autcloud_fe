import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InfoItem, AttributeSection } from '../ui/attributeBar'
import { DatabaseAttributeType } from "@/types/type"
import { useForm } from 'react-hook-form'
import SelectBox from '@/components/custom/ui/dropDown/selectBox'
import { DatabasePlans } from '@/options/dbOptions'
import { RegionsArray } from '@/options/resourceOptions'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'

interface DatabaseAttributeProps {
  attribute: DatabaseAttributeType
  onEdit: (data: DatabaseAttributeType) => void
  onClose: () => void
}

export default function EditDatabaseAttribute({ attribute, onEdit, onClose }: DatabaseAttributeProps) {
  const { register, handleSubmit, setValue, watch } = useForm<DatabaseAttributeType>({
    defaultValues: attribute,
  })

  const [filteredDBOptions, setFilteredDBOptions] = useState<any[]>([])

  const [selectedAttribute, setSelectedAttribute] = useState({
    vcpu: attribute.vcpu,
    ram: attribute.ram,
    disk: attribute.disk,
    replica_nodes: attribute.replica_nodes,
    monthly_cost: attribute.monthly_cost,
  })
  const db_engines = ['pg','mysql']

  const watchedValues = watch()
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const hasAnyChanges = Object.keys(attribute).some(key => {
      const field = key as keyof DatabaseAttributeType
      return watchedValues[field] !== attribute[field]
    })
    setHasChanges(hasAnyChanges)
  }, [watchedValues, attribute])

  const isValueChanged = (property: keyof DatabaseAttributeType) => {
    const currValue = watch(property)
    return currValue !== attribute[property]
  }

  const regionOptions = RegionsArray.map(region => ({
    value: region.id,
    label: `${region.city} (${region.id})`,
    flag: region.flag
  }))

  const filterDBOptions = (region_id: string) => {
    if (region_id) {
      const filtered = DatabasePlans.filter(option => 
        option.regions.includes(region_id)
      ).map(option => ({
        plan: option.plan,
        region: region_id,
        engine: option.supported_engines,
        vcpu: option.attribute.vcpu_count,
        ram: option.attribute.ram,
        disk: option.attribute.disk,
        monthly_cost: option.monthly_cost,
        replica_nodes: option.numbers_of_node
      }))
      
      setFilteredDBOptions(filtered)
    } else {
      setFilteredDBOptions([])
    }
  }

  useEffect(() => {
    if (attribute.region_id) {
      
      filterDBOptions(attribute.region_id)
    }
  }, [])

  const handleRegionChange = (region_id: string) => {
    const selectedRegion = RegionsArray.find(r => r.id === region_id)
    if(!selectedRegion) return

    setValue('region_id', region_id)
    setValue('region', selectedRegion.city)
    filterDBOptions(region_id)
  }

  const handleDBPlanChange = (plan: string) => {
    const selected = filteredDBOptions.find(opt => opt.plan === plan)
    if (selected) {
      setValue('plan', plan)
      setValue('vcpu', selected.vcpu)
      setValue('ram', selected.ram)
      setValue('disk', selected.disk)
      setValue('replica_nodes', selected.replica_nodes)
      setValue('monthly_cost', selected.monthly_cost)

      setSelectedAttribute({
        vcpu: selected.vcpu,
        ram: selected.ram,
        disk: selected.disk,
        replica_nodes: selected.replica_nodes,
        monthly_cost: selected.monthly_cost,
      })
    }
  }

  const handleEngineChange = (engine: string) => {
    setValue('db_engine', engine)
    setValue('db_version', engine.includes('pg') ? '15' : '8')
  }

  const onSubmit = (data: DatabaseAttributeType) => {
    if (onEdit) {
      onEdit(data)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-4 py-2 border-b justify-between">
        <div className='gap-3 flex items-center'>
          <Image
            alt="managed database"
            src={'/aut-manageddatabase.svg'}
            width={23.5}
            height={23.5}
            className="rounded-xs"
          ></Image>
          <h3 className="text-xs font-medium">Managed Database</h3>
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
        <h3 className="text-xs text-gray-500">Stauts</h3>
        <Button
          className={cn('px-2.5 h-7 rounded-sm pointer-events-none text-xs', {
            'bg-green-500': attribute.status === 'running',
            'bg-yellow-500': attribute.status === 'pending',
            'bg-red-500': attribute.status === 'stopped',
          })}
        >
          {attribute.status}
        </Button>
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
            option={filteredDBOptions.map(opt => ({
              value: opt.plan,
              label: opt.plan
            }))}
            placeholder={attribute.plan || "Select compute type"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('plan') ? "text-blue-500 font-medium" : ""
            )}
            onChange={handleDBPlanChange}
          />
        </InfoItem>
        <InfoItem label="DB Engine">
          <SelectBox 
            option={db_engines.map(engine => ({
              value: engine,
              label: engine === 'pg' ? 'PostgreSQL 15' : engine === 'mysql' ? 'MySQL 8' : engine
            }))}
            placeholder={(attribute.db_engine === 'pg' ? 'PostgreSQL' : 'MySQL' ) + " " + attribute.db_version || "Select database engine"}
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full", 
              isValueChanged('db_engine') ? "text-blue-500 font-medium" : ""
            )}
            onChange={handleEngineChange}
          />
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
            {`${selectedAttribute.disk} GB`}
          </div>
        </InfoItem>
        <InfoItem label="Replica Nodes">
          <div className={cn("h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm", 
            isValueChanged('replica_nodes') ? "text-blue-500 font-medium" : "")}>
            {`${selectedAttribute.replica_nodes} Node`}
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
