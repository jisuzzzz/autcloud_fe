import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import { Copy } from "lucide-react"

export default function ComputeSpec() {
  return (
    <>
      <div className="flex gap-3 items-center px-4 py-3 border-b">
        <Image
          alt="compute instance"
          src={"/aut-compute.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Instance</h3>
      </div>
      

      <div className="flex justify-between items-center px-4 py-2.5 border-b">
        <h3 className="text-xs text-gray-500">Stauts</h3>
        <Button
            className={cn("px-3 h-7 rounded-sm bg-yellow-500")}
          >
            status
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
            <p className="text-sm">icn1, Seoul</p>
          </div>
        </InfoItem>

        <InfoItem label="IP Adress">
          <div className="flex w-full justify-between items-center">
            <p className="text-sm">64.176.217.21</p>
            <Copy size={18} className="text-gray-500"/>
          </div>
        </InfoItem>
      </SpecSection>
      
      <SpecSection>
        <InfoItem label="vCPU/s">
          1 vCPU
        </InfoItem>
        <InfoItem label="RAM">
          1024.00MB
        </InfoItem>
        <InfoItem label="Storage">
          25 GB SSD
        </InfoItem>
        <InfoItem label="Bandwidht">
          <p className="text-sm text-[#8171E8]">0.34 GB</p>
          <InfoIcon label="?" />
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">autcloud_be</p>
        </InfoItem>
        <InfoItem label="OS">
          Ubuntu 22.04 x64
        </InfoItem>
        <InfoItem label="Auto Backups">
          <p className="text-sm text-red-600">Not Enabled</p>
          <InfoIcon label="!"/>
        </InfoItem>
      </SpecSection>
    </>
  )
}