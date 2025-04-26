import SideBar from "@/components/custom/sidebar"
import Header from "@/components/custom/header"
import FlowMap from "@/components/gui/flowMap"
import ToolBar from "@/components/gui/toolbar"

export default async function ProjectIdPage({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const param = await params;
  return (
    <div className="flex min-h-screen bg-white">
      {/* <SideBar /> */}
      <ToolBar />
      <div className="flex-1">
        <Header projectId={param.projectId} />
        <FlowMap />
      </div>
    </div>
  )
}