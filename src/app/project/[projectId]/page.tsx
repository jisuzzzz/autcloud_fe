import { Room } from "@/components/live-gui/room";
import { YjsReactFlow } from "@/components/live-gui/yjsRflow";
import { getProjectById } from "@/lib/projectDB";
import GetSessionClient from "@/components/custom/getSessionClient";

export default async function ProjectIdPage({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const param = await params;
  const project = getProjectById(param.projectId)

  return (
    <>
      <GetSessionClient project_id={param.projectId} />
      <Room projectId={param.projectId}>
        <YjsReactFlow 
          project1={project || {
            id: param.projectId,
            name: "project_name",
            description: "project_description",
            initial_resources: []
          }}
        />
      </Room>
    </>
  )
}