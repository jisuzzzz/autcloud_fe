'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getProjectById } from '@/lib/projectDB'
import ProjectThumbnail from '@/components/live-gui/thumbnail'
import { motion } from 'framer-motion'

const DIAGRAMS = [
  getProjectById("37bfb83b-dd64-410b-81c5-7374b0c453e0"),
  getProjectById("8ab36845-d77c-482f-b9e3-5a4c31f89d52"),
  getProjectById("5cd92f34-a17b-429d-8e35-9bf72c680d13")
].filter(Boolean)

function getTotalMonthlyCost(resources: any[]) {
  return resources.reduce((sum, resource) => {
    const cost = Number(resource?.Attribute?.monthly_cost || resource?.attribute?.price || 0)
    return sum + cost
  }, 0)
}

function getMainAttributeInfo(resource: any) {
  const { type, attribute } = resource
  
  switch(type) {
    case 'Compute': return `Plan: ${attribute.plan} ($${attribute?.monthly_cost} /month)`
    case 'Database': return `Plan: ${attribute.plan} ($${attribute?.monthly_cost} /month)`
    case 'BlockStorage': return `${attribute.size}GB • ${attribute?.type}`
    case 'ObjectStorage': return `Plan: ${attribute.plan} ($${attribute?.price} /month)`
    case 'FireWall': return 'Security rules'
    default: return ''
  }
}

export default function Step3Page() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handlePrevious = () => router.back()
  const handleConfirm = () => {
    if (selectedId) {
      router.push(`/project/${selectedId}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex items-center justify-center">
      <div className='w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[60px] py-[20px]'>
        <div className="grid grid-cols-3 items-center mb-10 pt-4">
          <button
            onClick={handlePrevious}
            className="text-gray-500 text-[14px] justify-self-start hover:text-black cursor-pointer"
          >
            ← Back
          </button>

          <h2 className="text-[16px] sm:text-[18px] font-semibold justify-self-center">
            Choose a diagram
          </h2>
          
          <div />
        </div>

        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {DIAGRAMS.map((diagram) => diagram && (
            <div
              key={diagram.id}
              onClick={() => setSelectedId(diagram.id)}
              className={`w-full h-[480px] sm:h-[560px] rounded-xl border p-0 cursor-pointer
                transition-all overflow-hidden flex flex-col hover:shadow-lg
                ${diagram.id === selectedId ? 'border-gray-400 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <div className="w-full h-[180px] sm:h-[240px] bg-gray-50">
                <ProjectThumbnail
                  project={diagram}
                  width={380}
                  height={240}
                />
              </div>

              <div className="p-3 sm:p-4 flex-1 overflow-y-auto bg-white">
                <div className="mb-2 sm:mb-3">
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {diagram.description}
                  </p>
                  <p className="text-xs font-medium text-left text-gray-700 mt-2">
                    Total: ${getTotalMonthlyCost(diagram.initial_resources)} /month
                  </p>
                </div>

                <div className="space-y-1.5 sm:space-y-2 scrollbar-thin">
                  {diagram.initial_resources.map(resource => (
                    <div key={resource.id} className="text-xs p-2 sm:p-3 border rounded-md bg-gray-50">
                      <div className="font-medium mb-1">{resource.type}</div>
                      <div className="text-gray-500 truncate">
                        {getMainAttributeInfo(resource)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="flex w-full justify-center px-4">
          <Button 
            onClick={handleConfirm}
            disabled={!selectedId}
            className="w-full sm:w-[380px] md:w-[480px] bg-gray-50 hover:bg-gray-100 hover:border-gray-300 
              text-black border text-sm h-10 flex items-center cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
