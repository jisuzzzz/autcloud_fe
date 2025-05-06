import Image from "next/image"
import { SpecSection } from "../specBar"
import { Minus } from "lucide-react"
import { FirewallSpecType } from "@/lib/projectDB"
import { AddActionButton } from "@/components/custom/actionButtons"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

interface FireWallSpecProps {
  spec: FirewallSpecType
  onEdit: (data: FirewallSpecType) => void
}

export default function EditFirewallSpec({spec, onEdit}:FireWallSpecProps) {
  const { register, handleSubmit } = useForm<FirewallSpecType>({
    defaultValues: spec
  })
  
  const onSubmit = (data:FirewallSpecType) => {
    if(onEdit) {
      onEdit(data)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 items-center px-4 py-3 border-b justify-between">
        <Image
          alt="firewall"
          src={"/aut-firewall.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Firewall</h3>
        <Button type="submit" className="px-3 py-1 h-8 text-xs">
            Save Changes
        </Button>
      </div>

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
    </form>
  )
}