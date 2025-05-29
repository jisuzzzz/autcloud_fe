'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import ProjectThumbnail from '@/components/custom/panel/thumbnail'
import { getFilteredOptions } from '@/lib/helpers/getFilteredOptions'
import { ProjectTemplate } from '@/types/type'
import ProjectCreateLoading from '../loading'
import { useParams } from 'next/navigation'
import { useProjectForm } from '@/context/ProjectFormContext'
import { getProjectById } from '@/lib/db/projectDB'

function getTotalMonthlyCost(resources: any[]): number {
  return resources.reduce((sum, resource) => {
    const type = resource?.type
    const attribute = resource?.attribute

    if (!type || !attribute) return sum

    const region_id = attribute.region_id || attribute.cluster_id
    const plan = attribute.plan || attribute.tier_id

    const cost = getFilteredOptions(type, region_id, plan)
    return sum + Number(cost || 0)
  }, 0)
}

function getMonthlyCost(resource: any): number {
  const type = resource?.type;
  const attribute = resource?.attribute;

  if (!type || !attribute) return 0;

  const region_id = attribute.region_id || attribute.cluster_id;
  const plan = attribute.plan || attribute.tier_id;

  const cost = getFilteredOptions(type, region_id, plan);
  return Number(cost || 0);
}

const DIAGRAMS = [
  getProjectById("2972a3e0-dff6-4c0e-bb35-5ad939e2793c"),
  getProjectById("8929f3f2-3774-46c9-b08b-3fb1877acca7"),
  getProjectById("d0a9bb89-4094-46bc-8a5c-f6390915b58b")
].filter(Boolean)

function getMainAttributeInfo(resource: any) {
  const { type, attribute } = resource

  switch(type) {
    case 'Compute': 
      return (
        <p className='w-full items-center flex'>
          <span className="w-[300px] inline-block truncate">Plan: {attribute.plan}</span>
          <span> (${getMonthlyCost(resource)}/month)</span>
        </p>
      )
    case 'ManagedDatabase': 
      return (
        <p className='w-full items-center flex'>
          <span className="w-[300px] inline-block truncate">Plan: {attribute.plan}</span>
          <span> (${getMonthlyCost(resource)}/month)</span>
        </p>
      )
    case 'BlockStorage': 
      return (
        <p className='w-full items-center flex'>
          <span>{attribute.size_gb}GB</span>
          <span className="ml-1">• Block Storage</span>
        </p>
      )
    case 'ObjectStorage': 
      return (
        <p className='w-full items-center flex'>
          <span className="w-[300px] inline-block truncate">Tier: {attribute.tier_id}</span>
          <span> (${getMonthlyCost(resource)}/month)</span>
        </p>
      )
    case 'FirewallGroup': 
      return <p className='w-full items-center flex'>Security</p>
    default: 
      return <p></p>
  }
}

export default function Step3Page() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // const [diagrams, setDiagrams] = useState<ProjectTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const { projectId } = useParams()
  const { formData } = useProjectForm()


  setTimeout(() => {
      setLoading(false)
    }, 10000)
  

    
  // useEffect(() => {
  //   const fetchDiagrams = async () => {
  //     try {
  //       if (!formData || !formData.diagrams) {
  //         setLoading(false)
  //         return
  //       }

  //       const transformedDiagrams: ProjectTemplate[] = formData.diagrams.map((item: any, index: number) => ({
  //         id: `rec${index + 1}`,
  //         name: `Architecture ${index + 1}`,
  //         description: item.description,
  //         initial_resources: item.architecture.filter((resource: any) => resource.resource_type !== 'FirewallRule').map((resource: any) => ({
  //           id: resource.attributes.id || "",
  //           temp_id: resource.temp_id,
  //           type: resource.resource_type,
  //           position: resource.position,  
  //           status: 'add',
  //           attribute: resource.attributes
  //         }))
  //       }))
        
  //       setDiagrams(transformedDiagrams)
  //     } catch (error) {
  //       console.error('Error processing diagrams:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchDiagrams()
  // }, [formData])

  const handlePrevious = () => router.back()
  const handleConfirm = () => {
    if (selectedId) {
      const selectedDiagram = DIAGRAMS.find((d: any) => d.id === selectedId)
      if (selectedDiagram) {
        router.push(`/project/${selectedId}`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {loading ? (
        <ProjectCreateLoading />
      ) : (
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

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {DIAGRAMS.map((diagram, index) => (
              <div
                key={diagram?.id}
                onClick={() => setSelectedId(diagram?.id || '')}
                className={`w-full h-[480px] sm:h-[560px] rounded-xl border p-0 cursor-pointer
                  transition-all overflow-hidden flex flex-col hover:shadow-lg
                  ${diagram?.id === selectedId ? 'border-gray-400 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                <div className="w-full h-[180px] sm:h-[240px] bg-gray-50">
                  <ProjectThumbnail
                    project={diagram as ProjectTemplate}
                    width={380}
                    height={240}
                  />
                </div>

                <div className="p-3 sm:p-4 flex-1 overflow-y-auto bg-white">
                  <div className="mb-2 sm:mb-3">
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {diagram?.description}
                    </p>
                    <p className="text-xs font-medium text-left text-gray-700 mt-2">
                      Total: ${getTotalMonthlyCost(diagram?.initial_resources as any[])}/month
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 scrollbar-thin">
                    {diagram?.initial_resources && diagram?.initial_resources.map((resource: any) => (
                      <div key={resource.temp_id} className="text-xs p-2 sm:p-3 border rounded-md bg-gray-50">
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
          </div>

          <div className="flex w-full justify-center px-4">
            <Button 
              onClick={handleConfirm}
              disabled={!selectedId}
              className="w-full sm:w-[380px] md:w-[480px] bg-gray-100 hover:bg-gray-200 hover:border-gray-400
                text-black border text-sm h-10 flex items-center cursor-pointer border-gray-300"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
