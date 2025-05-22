import Image from "next/image"
import { AttributeSection, InfoItem } from "../ui/attributeBar"
import { FirewallAttributeType, FirewallRuleType } from "@/types/type"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import AddNewwFirewallRule from "./addFirewallRule"

interface FireWallAttributeProps {
  onAdd: (data: FirewallAttributeType) => void
  onClose: () => void
}

export default function AddNewFirewall({ onAdd, onClose }: FireWallAttributeProps) {
  const { register, handleSubmit, setValue, watch } = useForm<FirewallAttributeType>({
    defaultValues: {
      label: '',
      rules: []
    }
  })

  const watchedValues = watch()
  const [hasChanges, setHasChanges] = useState(false)
  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false)

  const handleOpenAddRuleModal = () => {
    setIsAddRuleModalOpen(true)
  }

  const handleRuleModalClose = () => {
    setIsAddRuleModalOpen(false)
  }
  
  const handleAddRule = (ruleData: FirewallRuleType) => {
    const updatedRules = [...watchedValues.rules, ruleData]
    setValue('rules', updatedRules)
    setHasChanges(true)
  }
  
  const onSubmit = (data: FirewallAttributeType) => {
    if (onAdd) {
      onAdd(data)
    }
    onClose()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 items-center px-4 py-2 border-b justify-between">
        <div className="gap-3 flex items-center">
          <Image
            alt="firewall"
            src={"/aut-firewall.svg"}
            width={23.5}
            height={23.5}
            className="rounded-xs"
          ></Image>
          <h3 className="text-xs font-medium">Firewall</h3>
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

      <AttributeSection>
        <InfoItem label="Description">
          <Input
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm")}
            {...register('label')}
            placeholder="Input label"
            onChange={() => setHasChanges(true)}
          />
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs text-gray-500">Rules</h3>
          <Button 
            type="button" 
            size="sm" 
            variant="ghost"
            className="px-2.5 py-1 text-xs hover:bg-violet-50 border rounded-sm"
            onClick={handleOpenAddRuleModal}
          >
            Add Rule
          </Button>
        </div>

        {watchedValues.rules?.length > 0 ? (
          watchedValues.rules.map((rule, idx) => (
            <div key={idx} className="border rounded-md mb-2.5 px-4 py-3 bg-white text-xs text-gray-700 space-y-1.5">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-semibold">Rule {idx + 1}: {rule.notes}</p>
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                <div className="text-gray-500">Action:</div>
                <div className="font-medium">{rule.action || '-'}</div>

                <div className="text-gray-500">Port:</div>
                <div className="font-medium">{rule.port}</div>

                <div className="text-gray-500">IP Type:</div>
                <div className="font-medium">{rule.ip_type}</div>

                <div className="text-gray-500">Protocol:</div>
                <div className="font-medium">{rule.protocol}</div>

                <div className="text-gray-500">Subnet:</div>
                <div className="font-medium">{rule.subnet}/{rule.subnet_size}</div>

                <div className="text-gray-500">Notes:</div>
                <div className="font-medium">{rule.notes || '-'}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center py-6 text-gray-400 text-xs">
            No rules added yet. Click "Add Rule" to create one.
          </div>
        )}
      </AttributeSection>
      
      {isAddRuleModalOpen && (
        <AddNewwFirewallRule
          onClose={handleRuleModalClose}
          onSave={handleAddRule}
        />
      )}
    </form>
  )
}