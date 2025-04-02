import SideBar from "@/components/custom/sidebar"
import Header from "@/components/custom/header"
export default function ProjectIdPage({
  params
}: {
  params: Promise<{projectId:string}>
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1">
        <Header />
      </div>
    </div>
  )
}