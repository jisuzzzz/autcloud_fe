import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Folder, Plus, Search } from "lucide-react"
import Image from "next/image"
import SideBar from "@/components/custom/sidebar"
import Link from "next/link"

function FileCard({ title, metadata, thumbnail }: { title: string; metadata: string; thumbnail: string }) {
  return (
    <Link
      href={`/project/${title}`}
    >
      <div className="overflow-hidden rounded-lg border bg-white p-4">
        <div className="aspect-[4/3] relative">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="h-full w-full object-cover rounded-sm"
          />
        </div>
        <div className="pt-4">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{metadata}</p>
        </div>
      </div>
    </Link>
  )
}


export default function FileManager() {
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
            <Button>
              <Plus size={16} />
              Create
            </Button>
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
            <FileCard title="Q4 Sales Deck" metadata="Shared folder • 8 presentations" thumbnail="/img-placeholder.svg" />
            <FileCard title="Product Videos" metadata="Shared folder • 5 videos" thumbnail="/img-placeholder.svg" />
            <FileCard title="ROI Calculator" metadata="Shared file • 1 Excel" thumbnail="/img-placeholder.svg" />
          </div>
        </div>
      </div>
    </div>
  )
}

