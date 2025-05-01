import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"

export default function DatabaseSpec() {
  return (
    <>
      <div className="flex gap-3 items-center px-4 py-3 border-b">
        <Image
          alt="managed database"
          src={"/aut-database.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Managed Database</h3>
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
        <InfoItem label="ID">
          e.g.999c0000-0000-0000-0000-00000000000000
        </InfoItem>
        <InfoItem label="Node-Plan">
          vultr-dbaas-startup-cc-1-55-2
        </InfoItem>
        <InfoItem label="Node-Plan">
          3 hours ago
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="DB Engine">
          PostgreSQL
        </InfoItem>
        <InfoItem label="Latest Backup">
          2 hours ago
        </InfoItem>
        <InfoItem label="Replica Nodes">
          Yes
        </InfoItem>
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
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">test</p>
        </InfoItem>
        <InfoItem label="Tag">
          <p className="text-sm text-[#8171E8]">[Click here to set]</p>
          <InfoIcon label="?" />
        </InfoItem>
      </SpecSection>
    </>
  )
}

