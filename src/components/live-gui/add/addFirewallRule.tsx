'use client'
import Modal from "../../custom/modal"
import SelectBox from "../../custom/selectBox"
import { Input } from "../../ui/input"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FirewallRuleType } from "@/lib/projectDB"
import { useForm } from 'react-hook-form'
import { AttributeSection, InfoItem } from "../attributeBar"

interface FirewallModalProps {
  onClose: () => void
  onSave: (rule: FirewallRuleType) => void
}


const PROTOCOL_OPTIONS = [
  { value: 'tcp', label: 'TCP' },
  { value: 'udp', label: 'UDP' },
  { value: 'icmp', label: 'ICMP' },
  { value: 'gre', label: 'GRE' },
  { value: 'esp', label: 'ESP' },
  { value: 'ah', label: 'AH' }
]

const IP_TYPE_OPTIONS = [
  { value: 'IPv4', label: 'IPv4' },
  { value: 'IPv6', label: 'IPv6' }
]

export default function AddNewwFirewallRule({ onClose, onSave }: FirewallModalProps) {
  
  const { register, handleSubmit, setValue, watch } = useForm<FirewallRuleType>({
    defaultValues: {
      action: 'accept',
      port: '80',
      ip_type: '',
      protocol: '',
      subnet: '0.0.0.0',
      subnet_size: 0,
      notes: 'new rule'
    },
    mode: "onChange"
  })

  const port = watch('port')
  const ip_type = watch('ip_type')
  const protocol = watch('protocol')
  const subnet = watch('subnet')
  const subnet_size = watch('subnet_size')
  const notes = watch('notes')

  
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(!!protocol && !!subnet && !!subnet_size && !!ip_type && !!notes && !!port)
  }, [protocol, subnet, subnet_size, ip_type, notes, port])
  
  
  const handleProtocolChange = (protocol: string) => {
    setValue('protocol', protocol)
  }
  
  const handleIpTypeChange = (ipType: string) => {
    setValue('ip_type', ipType)
  }
  
  const onSubmit = (data: FirewallRuleType) => {
    if (onSave) {
      onSave(data)
    }
    onClose()
  }

  return (
    <Modal className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[400px] h-auto bg-white border rounded-sm">
        <div className="px-4 py-2 w-full flex items-center justify-between border-b">
          <div className="flex gap-2">
            <h3 className="text-xs font-medium">Add Firewall Rule</h3>
          </div>
          <div className='flex items-center gap-3'>
            <Button type='button' onClick={onClose} className='px-3 py-1 h-[30px] rounded-sm text-xs bg-gray-50 hover:bg-violet-50 text-black border'>
              Cancel
            </Button>
            <Button 
              type="button" 
              className="px-3 py-1 h-[30px] rounded-sm text-xs bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF]"
              disabled={!isFormValid}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </div>
        
        <AttributeSection>
          <InfoItem label="Protocol">
            <div className="flex flex-col w-full">
              <SelectBox 
                option={PROTOCOL_OPTIONS} 
                className="w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm"
                placeholder={"Select protocol"}
                onChange={handleProtocolChange}
              />
              {!protocol && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
            </div>
          </InfoItem>
          
          <InfoItem label="IP Type">
            <div className="flex flex-col w-full">
              <SelectBox 
                option={IP_TYPE_OPTIONS} 
                className="w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm"
                placeholder={"Select IP type"}
                onChange={handleIpTypeChange}
              />
              {!ip_type && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
            </div>
          </InfoItem>
          
          <InfoItem label="Port (or range)">
            <Input 
              className="w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm"
              placeholder="80"
              {...register('port')}
            />
          </InfoItem>
          
          <InfoItem label="Subnet">
            <div className="flex flex-col w-full">
              <Input 
                className="w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm"
                placeholder="0.0.0.0"
                {...register('subnet')}
              />
              {!subnet && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
            </div>
          </InfoItem>
          
          <InfoItem label="Subnet Size">
            <div className="flex flex-col w-full">
              <Input 
                className="w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm"
                placeholder="0"
                type="number"
                {...register('subnet_size', { 
                  valueAsNumber: true
                })}
              />
              {!subnet_size && <p className="text-[11px] text-blue-400 mt-1">* Required field</p>}
            </div>
          </InfoItem>
          
          <InfoItem label="Notes">
            <Input 
              className="w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm"
              placeholder="Rule description"
              {...register('notes')}
            />
          </InfoItem>
        </AttributeSection>
      </div>
    </Modal>
  )
}