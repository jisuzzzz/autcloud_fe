import { Room } from "@/components/live-gui/core/room"
import { LiveFlowMap } from "@/components/live-gui/core/LiveFlowMap"
// import { getProjectById } from "@/lib/db/projectDB"
import GetSessionClient from "@/lib/hooks/getSessionClient"

export default async function ProjectIdPage({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const param = await params;
  // const project = getProjectById(param.projectId)

  return (
    <>
      {/* <GetSessionClient project_id={param.projectId} /> */}
      <Room projectId={param.projectId}>
        <LiveFlowMap
          // project1={project ?|| {
          //   id: param.projectId,
          //   name: "project_name",
          //   description: "project_description",
          //   initial_resources: []
          // }}
        />
      </Room>
    </>
  )
}