'use client'
import Image from "next/image"
import { Box, Copy } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

function InfoIcon({ label }: { label: string }) {
  return (
    <div className="rounded-full bg-gray-400 w-4 h-4 flex items-center justify-center">
      <p className="text-white text-sm">{label}</p>
    </div>
  )
}

export default function SpecBar() {
  return (
    <div className="fixed top-[60px] right-0 bg-white border-l w-[256px] h-screen z-50">
      
      <div className="flex gap-3 items-center px-4 py-3 border-b">
        <Box size={20} />
        <h3 className="text-sm font-medium">Instance</h3>
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h3 className="text-xs text-gray-500">Stauts</h3>
        <Button
            className={cn("px-3 h-7 rounded-sm bg-yellow-500")}
          >
            status
        </Button>
      </div>

      <div className="flex flex-col space-y-4 px-4 py-4 border-b">
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">Location</h3>
          <div className="flex items-center gap-3">
            <Image
              alt="region"
              src={"/flag-for-south-korea.svg"}
              width={25}
              height={25}
            >
            </Image>
            <p className="text-sm">icn1, Seoul</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">IP Adress</h3>
          <div className="flex justify-between items-center">
            <p className="text-sm">64.176.217.21</p>
            <Copy size={18} className="text-gray-500"/>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 px-4 py-4 border-b">
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">vCPU/s</h3>
          <p className="text-sm">1 vCPU</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">RAM</h3>
          <p className="text-sm">1024.00MB</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">Storage</h3>
          <p className="text-sm">25 GB SSD</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">Bandwidht</h3>
          <div className="flex items-center gap-3">
            <p className="text-sm text-[#8171E8]">0.34 GB</p>
            <InfoIcon label="?"/>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 px-4 py-4 border-b">
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">Label</h3>
          <p className="text-sm text-[#8171E8]">autcloud_be</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">OS</h3>
          <p className="text-sm">Ubuntu 22.04 x64</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-gray-500">Auto Backups</h3>
          <div className="flex items-center gap-3">
            <p className="text-sm text-red-600">Not Enabled</p>
            <InfoIcon label="!"/>
          </div>
        </div>
      </div>
      
    </div>
  )
}