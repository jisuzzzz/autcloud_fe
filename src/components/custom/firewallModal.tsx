'use client'
import Modal from "./modal"
import SelectBox from "./selectBox"
import { X as Xicon } from "lucide-react"
import { Input } from "../ui/input"
import { InfoIcon } from "../live-gui/specBar"

interface FirewallModalProps {
  onClose: () => void
}

function FreWallOptionRow({ label, children}: {label: string, children: React.ReactNode}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600">{label}</p>
      {typeof children === "string" 
      ? <p className="text-sm text-gray-600">{children}</p> 
      : children}
    </div>
  )
}

const OPTION_TEMPLEATE = [
  
]

export default function FirewallModal({onClose}: FirewallModalProps) {
  return (
    <Modal
      onClose={onClose}
      className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
    >
      <div className="w-[470px] h-auto bg-white border rounded-sm">
        <div className="px-5 py-3 w-full flex items-center justify-between border-b">
          <div className="flex gap-2">
            <p>id</p>
            <p>Action</p>
          </div>
          <button onClick={onClose}>
            <Xicon size={20}/>
          </button>
        </div>
        <div className="px-5 py-3 flex flex-col space-y-4">

          <FreWallOptionRow label="Action">Option</FreWallOptionRow>

          <FreWallOptionRow label="Added items">
            <SelectBox option={"Option"} className="w-[260px]"/>
          </FreWallOptionRow>
          <FreWallOptionRow label="IP">
            <div className="gap-2 flex flex-row">
              <SelectBox option={"IPv4"} className="w-[91px]"/>
              <Input 
                className="w-[161px] h-10 shadow-none placeholder:text-black"
                placeholder="192.168.1.1"
              />
            </div>
          </FreWallOptionRow>
          <FreWallOptionRow label="ID">id</FreWallOptionRow>
          <FreWallOptionRow label="protocol">
            <SelectBox option={"SSH"} className="w-[260px]"/>
          </FreWallOptionRow>
          <FreWallOptionRow label="Port (or range)">
              <div className="-ml-10">
                <InfoIcon label="?"/>
              </div>
              <Input 
                className="w-[260px] h-10 shadow-none placeholder:text-black"
                placeholder="placeholder"
              />
          </FreWallOptionRow>
          <FreWallOptionRow label="Source">
            <SelectBox option={"Option"} className="w-[260px]"/>
          </FreWallOptionRow>
          <FreWallOptionRow label="Note">
            <Input 
              className="w-[260px] h-10 shadow-none placeholder:text-black"
              placeholder="placeholder"
            />
          </FreWallOptionRow>
        </div>
      </div>
    </Modal>
  )
}