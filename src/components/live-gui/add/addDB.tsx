import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InfoItem, SpecSection } from '../specBar';
import { DatabaseSpecType } from '@/lib/projectDB';
import { useForm } from 'react-hook-form';
import SelectBox from '@/components/custom/selectBox';
import { DatabasePlans } from '@/lib/dbOptions';
import { RegionsArray } from '@/lib/resourceOptions';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface DatabaseSpecProps {
  onAdd: (data: DatabaseSpecType) => void;
  onClose: () => void;
}

export default function AddNewDatabase({ onAdd, onClose }: DatabaseSpecProps) {
  const { register, handleSubmit, setValue, watch } = useForm<DatabaseSpecType>({
    defaultValues: {
      status: "pending",
      plan: "",
      db_engine: "",
      db_version: "",
      latest_backup: "2 hours ago",
      vcpu_count: "", 
      ram: "", 
      disk: "",
      replica_nodes: "",
      region_id: "",
      region: "",
      label: "",
      monthly_cost:""
    }
  });

  const [filteredDBOptions, setFilteredDBOptions] = useState<any[]>([])

  const region = watch('region')
  const dbPlan = watch('plan')
  const engine = watch('db_engine')
  const label = watch('label')

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(!!region && !!dbPlan && !!engine && !!label)
  }, [region, dbPlan, engine, label])

  const [selectedSpec, setSelectedSpec] = useState({
    vcpu_count: '',
    ram: '',
    disk: '',
    replica_nodes: '',
    monthly_cost: '',
  })
  const db_engines = ['pg','mysql']

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
        vcpu: option.spec.vcpu_count,
        ram: option.spec.ram,
        disk: option.spec.disk,
        monthly_cost: option.monthly_cost,
        replica_nodes: option.numbers_of_node
      }))
      
      setFilteredDBOptions(filtered)
    } else {
      setFilteredDBOptions([])
    }
  }

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
      setValue('vcpu_count', selected.vcpu)
      setValue('ram', selected.ram)
      setValue('disk', selected.disk)
      setValue('replica_nodes', selected.replica_nodes)
      setValue('monthly_cost', selected.monthly_cost)

      setSelectedSpec({
        vcpu_count: selected.vcpu,
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

  const onSubmit = (data: DatabaseSpecType) => {
    if (onAdd) {
      onAdd(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-4 py-2 border-b justify-between">
        <div className='gap-3 flex items-center'>
          <Image
            alt="managed database"
            src={'/aut-database.svg'}
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
            disabled={!isFormValid}
          >
            Save
          </Button>
        </div>
      </div>

      <SpecSection>
        <InfoItem label="Region">
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
              option={filteredDBOptions.map(opt => ({
                value: opt.plan,
                label: opt.plan
              }))}
              placeholder={"Select Database Plan"}
              className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full",
                !watch('region') ? "cursor-not-allowed pointer-events-none" : ""
              )}
              onChange={handleDBPlanChange}
            />
            {!dbPlan && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>
        <InfoItem label="DB Engine">
          <div className='flex flex-col w-full'>
            <SelectBox 
              option={db_engines.map(engine => ({
                value: engine,
                label: engine === 'pg' ? 'PostgreSQL 15' : engine === 'mysql' ? 'MySQL 8' : engine
              }))}
              placeholder={"Select database engine"}
              className="h-9 text-xs bg-[#F1F5F9] border-none rounded-sm w-full"
              onChange={handleEngineChange}
            />
            {!engine && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
          </div>
        </InfoItem>
      </SpecSection>

      {region && dbPlan && engine &&(
        <>
          <SpecSection>
            <InfoItem label="vCPU/s">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`${selectedSpec.vcpu_count} vCPU`}
              </div>
            </InfoItem>
            <InfoItem label="RAM">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`${selectedSpec.ram} MB`}
              </div>
            </InfoItem>
            <InfoItem label="Disk">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`${selectedSpec.disk} GB`}
              </div>
            </InfoItem>
            <InfoItem label="Replica Nodes">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`${selectedSpec.replica_nodes} Node`}
              </div>
            </InfoItem>
            <InfoItem label="Monthly Cost">
              <div className="h-9 w-full flex items-center px-3 text-xs bg-white shadow-none border rounded-sm">
                {`$${selectedSpec.replica_nodes} per Month`}
              </div>
            </InfoItem>
          </SpecSection>
        </>
      )}
      <SpecSection>
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
      </SpecSection>
    </form>
  );
}
