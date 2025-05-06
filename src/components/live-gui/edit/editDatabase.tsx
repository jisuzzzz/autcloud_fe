import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { InfoItem, SpecSection, InfoIcon } from "../specBar"
import { DatabaseSpecType } from "@/lib/projectDB"
import { useForm } from "react-hook-form"

interface DatabaseSpecProps {
  spec: DatabaseSpecType
  onEdit: (data: DatabaseSpecType) => void
}

export default function EditDatabaseSpec({spec, onEdit}:DatabaseSpecProps) {
  const { register, handleSubmit } = useForm<DatabaseSpecType>({
    defaultValues: spec
  })
  
  const onSubmit = (data:DatabaseSpecType) => {
    if(onEdit) {
      onEdit(data)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 items-center px-4 py-3 border-b justify-center">
        <Image
          alt="managed database"
          src={"/aut-database.svg"}
          width={25}
          height={25}
          className="rounded-xs"
        ></Image>
        <h3 className="text-sm font-medium">Managed Database</h3>
        <Button type="submit" className="px-3 py-1 h-8 text-xs">
            Save Changes
        </Button>
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
        <InfoItem label="ID">
          {spec.id}
        </InfoItem>
        <InfoItem label="Node-Plan">
          {spec.node_plan}
        </InfoItem>
        <InfoItem label="Cluster Created">
          {spec.cluster_created}
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="DB Engine">
          {spec.db_engine}
        </InfoItem>
        <InfoItem label="Latest Backup">
          {spec.latest_backup}
        </InfoItem>
        <InfoItem label="Replica Nodes">
          {spec.replica_nodes ? "Yes": "No"}
        </InfoItem>
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
        <InfoItem label="Label">
          <p className="text-sm text-[#8171E8]">{spec.label}</p>
        </InfoItem>
        <InfoItem label="Tag">
          <p className="text-sm text-[#8171E8]">{spec.tag}</p>
          <InfoIcon label="?" />
        </InfoItem>
      </SpecSection>
    </form>
  )
}

