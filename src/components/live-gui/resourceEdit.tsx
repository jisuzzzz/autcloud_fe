'use client'

import { PencilLine } from 'lucide-react'
import { useState } from 'react'
import EditModal from '../custom/editModal'
import { 
  ComputeSpecType, DatabaseSpecType,
  BlockStorageSpecType, ObjectStorageSpecType, FirewallSpecType 
} from "@/lib/projectDB"
import { Button } from '../ui/button'

type SpecType = ComputeSpecType | DatabaseSpecType | BlockStorageSpecType | ObjectStorageSpecType | FirewallSpecType

export function SaveEditButton({ formId }: { formId?: string }) {
  
  return (
    <Button 
      type="submit"
      form={formId}
      className="px-3 w-[60px] py-1 rounded-sm h-8 text-xs bg-[#8171E8]">
      Save
    </Button>
  )
}

export function StartEditButton({spec, type}: {spec: SpecType, type:string}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
      >
        <PencilLine size={18} className="text-gray-500 hover:text-[#8171E8] hover:fill-[#8171E8]" />
      </button>
      {isModalOpen && (
        <EditModal spec={spec} onClose={() => setIsModalOpen(false)} type={type} />
      )}
    </>
  )
}