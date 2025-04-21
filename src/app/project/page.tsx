import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Folder, Search } from "lucide-react"
import Image from "next/image"
import SideBar from "@/components/custom/sidebar"
import Link from "next/link"
import {CreateButton, MenuButton} from "@/components/custom/actionButtons"

function FileCard({ id, name, description, thumbnail }: { id: string; name: string; description: string; thumbnail: string }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <Link href={`/project/${id}`}>
        <div className="aspect-[4/3] relative">
          <Image
            src={thumbnail}
            alt={`${name}-image`}
            fill
            className="h-full w-full object-cover rounded-sm"
          />
        </div>
      </Link>
      <div className="pt-4 flex justify-between items-start">
        <Link href={`/project/${id}`}>
          <span>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </span>
        </Link>
        <MenuButton projectId={id}/>
      </div>
    </div>
  )
}

const PROJECT_TEMPLATES = [
  {
    id: "9cd47912-c94a-451f-a1a2-ec5b2097c461",
    name: "project-example-1-api-test",
    description: "project-example-1-api-test"
  },
  {
    id: "601f9404-1cea-431d-88ac-a5fadaffc36e",
    name: "project-example-2-api-test",
    description: "project-example-2-api-test",
  }
]

export default function ProjectPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search files..." className="pl-9" />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <CreateButton />
            
            <Button variant="outline">
              <Upload size={16}/>
              Upload
            </Button>
            <Button variant="outline">
              <Folder size={16}/>
              Create folder
            </Button>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECT_TEMPLATES.map((project) => (
              <FileCard 
                key={project.id}
                id={project.id}
                name={project.name}
                description={project.description}
                thumbnail="/img-placeholder.svg"
              />      
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

