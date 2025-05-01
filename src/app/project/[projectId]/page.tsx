import { Room } from "@/components/live-gui/room";
import { YjsReactFlow } from "@/components/live-gui/yjsRflow";
import { getProjectById } from "@/lib/projectDB";

export default async function ProjectIdPage({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const param = await params;
  const project = getProjectById(param.projectId)
  // console.log(project)
  return (
    <Room projectId={param.projectId}>
      <YjsReactFlow initial_resources={project?.initial_resources || []} />
    </Room>
  )
}