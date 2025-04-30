'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import ShareModal from "../custom/shareModal"
import Image from "next/image"
import { Node } from "reactflow"

interface HeaderProps {
  projectId: string
  setNodes: (updater: (prev: Node[]) => Node[]) => void
}

export default function Header({ projectId, setNodes }: HeaderProps) {
  const [isModalOpen, setIsModalOepn] = useState(false)

  const handleOpenModal = () => setIsModalOepn(true)
  const handleCloseModal = () => setIsModalOepn(false)

  const handleClickPuhblish = () => {
    setNodes((prev: Node[]) => 
      prev.map(node => ({
        ...node,
        data: {
          ...node.data,
          isNew: false
        }
      }))
    )
  }

  return (
    <header className="fixed z-50">
      <div className="flex items-center justify-between w-screen h-[60px] border-b px-6 py-4">
        <div className="flex gap-6">
          <h1 className="text-xl font-bold">AutCloud</h1>
          <div className="flex gap-4">
            <p className="text-gray-500">Project</p>
            <p>/</p>
            <p>{"project_name"}</p>
          </div>
          
        </div>
        <div className="flex items-center gap-3">
          <div className="flex">
            <Image
              alt="userBadge"
              src={"/jisu-profile-y.png"}
              width={30}
              height={30}
              className="rounded-full border border-white"
            >
            </Image>
            <Image
              alt="userBadge"
              src={"/jisu-profile-g.png"}
              width={30}
              height={30}
              className="rounded-full border border-white -ml-1.5"
            >
            </Image>
            <Image
              alt="userBadge"
              src={"/jisu-profile-b.png"}
              width={30}
              height={30}
              className="rounded-full border border-white -ml-1.5"
            >
            </Image>
          </div>
          <Button
            className={cn("px-3 rounded-sm h-9 bg-[#E9E9E9]")}
            onClick={handleOpenModal}
          >
            <p className="text-black font-normal">Share</p>
          </Button>
          <Button
            onClick={handleClickPuhblish}
            className={cn("px-3 rounded-sm h-9 bg-[#7768E6]")}
          >
            Publish
          </Button>
          
          {isModalOpen && (
            <ShareModal
              projectId={projectId}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </header>
  )
}