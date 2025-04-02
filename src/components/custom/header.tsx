'use client'
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import ShareModal from "./shareModal"

export default function Header() {
  const [isModalOpen, setIsModalOepn] = useState(false)

  const handleOpenModal = () => setIsModalOepn(true)
  const handleCloseModal = () => setIsModalOepn(false)

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search files..." className="pl-9" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className={cn("px-4 rounded-sm")}
          onClick={handleOpenModal}
        >
          Share
        </Button>
        {isModalOpen && (
          <ShareModal 
            onClose={handleCloseModal}
          />
        )}
      </div>
    </header>
  )
}