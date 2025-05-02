import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import { Copy } from "lucide-react"
import { EditButton } from "@/components/custom/actionButtons"
import { ComputeSpecType } from "@/lib/projectDB"

interface ComputeSpecProps{
  spec: ComputeSpecType
  setNodes: () => void
}

export default function ComputeSpec({spec,setNodes}:ComputeSpecProps) {
  return (
    <>
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <div className="gap-3 flex items-center">
          <Image
            alt="compute instance"
            src={"/aut-compute.svg"}
            width={25}
            height={25}
            className="rounded-xs"
          ></Image>
          <h3 className="text-sm font-medium">Instance</h3>
        </div>
        <EditButton setNodes={setNodes}/>
      </div>
      

      <div className="flex justify-between items-center px-4 py-2.5 border-b">
        <h3 className="text-xs text-gray-500">Stauts</h3>
        <Button
          className={cn(
          "px-2.5 h-7 rounded-sm pointer-events-none",
            {
              "bg-green-500": spec.status === "running",
              "bg-yellow-500": spec.status === "pending",
              "bg-red-500": spec.status === "stopped",
            }
          )}
        >
          {spec.status}
        </Button>
      </div>

      <SpecSection>
        <InfoItem label="Location">
          <div className="flex items-center gap-3">
            <Image
              alt="region"
              src={"/flag-for-south-korea.svg"}
              width={25}
              height={25}
            ></Image>
            <p className="text-sm">{spec.location}</p>
          </div>
        </InfoItem>

        <InfoItem label="IP Adress">
          <div className="flex w-full justify-between items-center">
            <p className="text-sm">{spec.ip_address}</p>
            <Copy size={18} className="text-gray-500"/>
          </div>
        </InfoItem>
      </SpecSection>
      
      <SpecSection>
        <InfoItem label="vCPU/s">
          {spec.vcpu}
        </InfoItem>
        <InfoItem label="RAM">
          {spec.ram}
        </InfoItem>
        <InfoItem label="Storage">
          {spec.storage}
        </InfoItem>
        <InfoItem label="Bandwidht">
          <p className="text-sm text-[#8171E8]">{spec.bandwidth}</p>
          <InfoIcon label="?" />
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">{spec.label}</p>
        </InfoItem>
        <InfoItem label="OS">
          {spec.os}
        </InfoItem>
        <InfoItem label="Auto Backups">
          {spec.auto_backups ? (
            <p className="text-sm text-green-600">Enabled</p>
          ) : (
            <p className="text-sm text-red-600">Not Enabled</p>
          )}
          <InfoIcon label="!"/>
        </InfoItem>
      </SpecSection>
    </>
  )
}