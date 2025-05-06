import Image from "next/image"
import { InfoItem, SpecSection } from "../specBar"
import { Plus, Minus } from "lucide-react"
import { FirewallSpecType } from "@/lib/projectDB"
import { AddActionButton } from "@/components/custom/actionButtons"

interface FireWallSpecProps {
  spec: FirewallSpecType
}

export default function FirewallSpec({spec}:FireWallSpecProps) {
  return (
    <>
      <SpecSection>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">Action</p>
            <AddActionButton />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{spec.label}</p>
          <Minus size={16} className="text-gray-600 hover:text-[#8171E8]" />
        </div>
      </SpecSection>
    </>
  )
}