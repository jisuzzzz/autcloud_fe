import SideBar from "@/components/custom/sidebar"
import Header from "@/components/custom/header"
import CloudFlow from "@/components/gui/canvas";

export default async function ProjectIdPage({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const param = await params;
  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1">
        <Header projectId={param.projectId} />
        <CloudFlow />
      </div>
    </div>
  )
}