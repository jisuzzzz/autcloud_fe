'use client'
import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import ShareModal from "../custom/shareModal"
import { Node } from "reactflow"
import { useSelf, useOthersMapped } from "@liveblocks/react"
import Avatar from "./avator"

interface HeaderProps {
  projectId: string
  projectName: string
  setNodes: (updater: (prev: Node[]) => Node[]) => void
}

// React.memo -> 컴포넌트 자체를 메모이제이션
const Avatars = React.memo(function Avatars() {
  const me = useSelf((me) => me.info);
  const users = useOthersMapped((others) => others.info);
  return (
    <div className="rounded-md min-h-[32px] w-full flex items-center justify-end">
      {users.slice(0, 3).map(([connectionId, info]) => {
        return (
          <Avatar
            key={connectionId}
            src={info?.avatar}
            name={info?.name}
            color={info?.color as string}
          />
        )
      })}
      {me && (
        <Avatar 
          key="me"
          src={me.avatar}
          name="You"
          color={me.color as string}
        />
      )}
    </div>
  )
})

export default function FlowHeader({ projectId, projectName, setNodes }: HeaderProps) {
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
      <div className="flex items-center justify-between bg-white w-screen h-[55px] border-b px-6 py-4">
        
        <div className="flex gap-6 items-center">
          <h1 className="text-xl font-bold">AutCloud</h1>
          <div className="flex gap-4">
            <p className="text-gray-500">{"Project"}</p>
            <p>/</p>
            <p>{projectName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Avatars />
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