'use client'
import { InfoItem, AttributeSection } from "../ui/attributeBar"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FirewallAttributeType } from "@/types/type"
import { useState, useEffect } from "react"

interface FireWallAttributeProps {
  attribute: FirewallAttributeType
}

export default function FirewallAttribute({ attribute: localAttribute }: FireWallAttributeProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [attribute, setAttribute] = useState(localAttribute)

  useEffect(() => {
    setAttribute(localAttribute)
  }, [localAttribute])

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }


  return (
    <>
      <AttributeSection>
        <InfoItem label="Description">
          {attribute.label}
        </InfoItem>
      </AttributeSection>

      <AttributeSection>
        <h3 className="text-xs text-gray-500 mb-2">Rules</h3>
        {attribute.rules.map((rule, idx) => { 
          const isOpen = openIndex === idx
        
          return (
            <div key={idx} className="border rounded-md mb-2.5">
              <button
                className="flex justify-between items-center w-full h-9 px-3 py-2 hover:bg-violet-50 text-sm cursor-pointer"
                onClick={() => toggle(idx)}
              >
                <span className="font-medium text-xs">Rule {idx + 1}: {rule.notes || rule.port}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isOpen && (
                <div className="px-3 py-3 bg-white text-xs font-medium text-gray-700 space-y-4 border-t">
                  <div><span className="font-semibold">Action:</span> {rule.action}</div>
                  <div><span className="font-semibold">Port:</span> {rule.port}</div>
                  <div><span className="font-semibold">IP Type:</span> {rule.ip_type}</div>
                  <div><span className="font-semibold">Protocol:</span> {rule.protocol}</div>
                  <div><span className="font-semibold">Subnet:</span> {rule.subnet}/{rule.subnet_size}</div>
                  <div><span className="font-semibold">Notes:</span> {rule.notes}</div>
                </div>
              )}
            </div>
          )
        })}
      </AttributeSection>
    </>
  )
}