import Image from "next/image"
import { SpecSection, InfoItem } from "../specBar"
import { Edit, Trash2 } from "lucide-react"
import { FirewallSpecType, FirewallRuleType } from "@/lib/projectDB"
import { AddRuleButton } from "@/components/custom/actionButtons"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import EditFirewallRule from "./editRules"

interface FireWallSpecProps {
  spec: FirewallSpecType
  onEdit: (data: FirewallSpecType) => void
  onClose: () => void
}

export default function EditFirewallSpec({spec, onEdit, onClose}:FireWallSpecProps) {
  const { register, handleSubmit, setValue, watch } = useForm<FirewallSpecType>({
    defaultValues: spec
  })

  const watchedValues = watch()
  const [hasChanges, setHasChanges] = useState(false)
  const [editRuleIndex, setEditRuleIndex] = useState<number | null>(null)
  const [isEditRuleModalOpen, setIsEditRuleModalOpen] = useState(false)

  const handleEditRule = (idx: number) => {
    setEditRuleIndex(idx)
    setIsEditRuleModalOpen(true)
  }

  const handleRuleModalClose = () => {
    setIsEditRuleModalOpen(false)
    setEditRuleIndex(null)
  }
  
  const handleDeleteRule = (idx: number) => {
    // 삭제할 규칙 확인
    if (window.confirm('이 규칙을 삭제하시겠습니까?')) {
      // 규칙 배열 복사
      const updatedRules = [...watchedValues.rules]
      // 해당 인덱스의 규칙 삭제
      updatedRules.splice(idx, 1)
      // 폼 업데이트
      setValue('rules', updatedRules)
      setHasChanges(true)
    }
  }
  
  const handleSaveRule = (ruleData: FirewallRuleType) => {
    const updatedRules = [...watchedValues.rules]
    
    if (editRuleIndex !== null) {
      updatedRules[editRuleIndex] = ruleData
    } 
    
    setValue('rules', updatedRules)
    setHasChanges(true)
    handleRuleModalClose()
  }

  const handleAddRule = (ruleData: FirewallRuleType) => {
    // console.log(ruleData)
    const updatedRules = [...watchedValues.rules]
    updatedRules.push(ruleData)
    // console.log(updatedRules)

    setValue('rules', updatedRules)
    setHasChanges(true)
    handleRuleModalClose()
  }
  
  const onSubmit = (data:FirewallSpecType) => {
    if(onEdit) {
      onEdit(data)
    }
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

      <SpecSection>
        <InfoItem label="Description">
          <Input
            className={cn("h-9 text-xs bg-[#F1F5F9] border-none rounded-sm")}
            {...register('label')}
            onChange={() => setHasChanges(true)}
          />
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs text-gray-500">Rules</h3>
          <AddRuleButton onSave={handleAddRule} />
        </div>

        {watchedValues.rules.map((rule, idx) => (
          <div key={idx} className="border rounded-md mb-2.5 px-4 py-3 bg-white text-xs text-gray-700 space-y-1.5">
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs font-semibold">Rule {idx + 1}: {rule.notes}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEditRule(idx)}
                  className="text-gray-500 hover:text-[#8171E8]"
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteRule(idx)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 text-xs">
              <div className="text-gray-500">Action:</div>
              <div className="font-medium">{rule.action}</div>

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
        ))}
      </SpecSection>
      
      {isEditRuleModalOpen && editRuleIndex !== null && (
        <EditFirewallRule
          onClose={handleRuleModalClose}
          rule={watchedValues.rules[editRuleIndex]}
          onSave={handleSaveRule}
        />
      )}
    </form>
  )
}