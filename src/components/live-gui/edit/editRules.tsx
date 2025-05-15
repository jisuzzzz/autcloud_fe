'use client'
import Modal from "../../custom/modal"
import SelectBox from "../../custom/selectBox"
import { Input } from "../../ui/input"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FirewallRuleType } from "@/lib/projectDB"
import { useForm } from 'react-hook-form'
import { cn } from "@/lib/utils"
import { SpecSection, InfoItem } from "../specBar"

interface FirewallModalProps {
  onClose: () => void
  rule: FirewallRuleType
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
  { value: 'v4', label: 'IPv4' },
  { value: 'v6', label: 'IPv6' }
]

export default function EditFirewallRule({ onClose, rule, onSave }: FirewallModalProps) {
  const [hasChanges, setHasChanges] = useState(false)
  
  const { register, handleSubmit, setValue, watch } = useForm<FirewallRuleType>({
    defaultValues: rule
  })
  
  const watchedValues = watch()
  
  useEffect(() => {
    if (!rule) return
    
    const hasAnyChange = Object.keys(rule).some(key => {
      const field = key as keyof FirewallRuleType
      return watchedValues[field] !== rule[field]
    })
    
    setHasChanges(hasAnyChange)
  }, [watchedValues, rule])
  
  const isValueChanged = (property: keyof FirewallRuleType) => {
    if (!rule) return false
    const currValue = watch(property)
    return currValue !== rule[property]
  }
  
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
            <h3 className="text-xs font-medium">Edit Firewall Rule</h3>
          </div>
          <div className='flex items-center gap-3'>
            <Button type='button' onClick={onClose} className='px-3 py-1 h-[30px] rounded-sm text-xs bg-gray-50 hover:bg-violet-50 text-black border'>
              Cancel
            </Button>
            <Button 
              type="button" 
              className="px-3 py-1 h-[30px] rounded-sm text-xs bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF]"
              disabled={!hasChanges}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </div>

        <SpecSection>
          <InfoItem label="Protocol">
            <SelectBox 
              option={PROTOCOL_OPTIONS} 
              className={cn("w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm", 
                isValueChanged('protocol') ? "text-blue-500 font-medium" : "")}
              placeholder={rule.protocol}
              onChange={handleProtocolChange}
            />
          </InfoItem>
          
          <InfoItem label="IP Type">
            <SelectBox 
              option={IP_TYPE_OPTIONS} 
              className={cn("w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm"
                , isValueChanged('ip_type') ? "text-blue-500 font-medium" : "")}
              placeholder={rule.ip_type}
              onChange={handleIpTypeChange}
            />
          </InfoItem>
          
          <InfoItem label="Port (or range)">
            <Input 
              className={cn("w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm", 
                isValueChanged('port') ? "text-blue-500 font-medium" : "")}
              placeholder={rule.port}
              {...register('port')}
            />
          </InfoItem>
          
          <InfoItem label="Subnet">
            <Input 
              className={cn("w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm", isValueChanged('subnet') ? "text-blue-500 font-medium" : "")}
              placeholder={rule.subnet}
              {...register('subnet')}
            />
          </InfoItem>
          
          <InfoItem label="Subnet Size">
            <Input 
              className={cn("w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm", isValueChanged('subnet_size') ? "text-blue-500 font-medium" : "")}
              placeholder={String(rule.subnet_size)}
              type="number"
              {...register('subnet_size', { 
                valueAsNumber: true,
              })}
            />
          </InfoItem>
          
          <InfoItem label="Notes">
            <Input 
              className={cn("w-full h-9 flex items-center px-3 text-xs bg-[#F1F5F9] border-none rounded-sm", isValueChanged('notes') ? "text-blue-500 font-medium" : "")}
              placeholder={rule.notes}
              {...register('notes')}
            />
          </InfoItem>
        </SpecSection>
        
      </div>
    </Modal>
  )
}