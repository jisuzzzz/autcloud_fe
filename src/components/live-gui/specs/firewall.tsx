import Image from "next/image"
import { InfoItem, SpecSection } from "../specBar"
import { Plus, Minus } from "lucide-react"

export default function FirewallSpec() {
  return (
    <>
      <div className="flex gap-3 items-center px-4 py-3 border-b">
        <Image
          alt="firewall"
          src={"/aut-firewall.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Firewall</h3>
      </div>

      <SpecSection>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">Action</p>
          <Plus size={16} className="text-gray-600" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">action1</p>
          <Minus size={16} className="text-gray-600" />
        </div>
      </SpecSection>
    </>
  )
}