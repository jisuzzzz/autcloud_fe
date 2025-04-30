import { Room } from "@/components/live-gui/room";
import { YjsReactFlow } from "@/components/live-gui/yjsRflow";
import ToolBar from "@/components/live-gui/toolBar";
import SpecBar from "@/components/live-gui/specBar";
import Header from "@/components/live-gui/header";

export default async function ProjectIdPage({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const param = await params;
  return (
    <Room>
      {/* <Header projectId={param.projectId}/> */}
      {/* <ToolBar/> */}
      {/* <SpecBar /> */}
      <YjsReactFlow />
    </Room>
  )
}