import Image from "next/image"
import { SpecSection } from "../specBar"
import { Plus, Minus } from "lucide-react"
import { FirewallSpecType } from "@/lib/projectDB"
import { EditButton } from "@/components/custom/actionButtons"

interface FireWallSpecProps {
  spec: FirewallSpecType
  setNodes: () => void
}

export default function FirewallSpec({spec,setNodes}:FireWallSpecProps) {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="gap-3 flex items-center">
          <Image
            alt="firewall"
            src={"/aut-firewall.svg"}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-sm font-medium">Firewall</h3>
        </div>
        <EditButton setNodes={setNodes}/>
      </div>

      <SpecSection>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">Action</p>
          <Plus size={16} className="text-gray-600" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{spec.action}</p>
          <Minus size={16} className="text-gray-600" />
        </div>
      </SpecSection>
    </>
  )
}