'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import SelectBox from '@/components/custom/ui/dropDown/selectBox'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import ProjectCreateLoading from '../loading'
import { useProjectForm } from '@/context/ProjectFormContext'
import { ai_db } from '@/lib/db/ai'

const target_stability = [
  { value: "Low", label: "Low (~99%)"},
  { value: "Medium", label: "Medium (~99.9%)"},
  { value: "High", label: "High (~99.99%)"}
]

const anticipated_rps = [
  { value: "10", label: "10 RPS" },
  { value: "50", label: "50 RPS" },
  { value: "100", label: "100 RPS" },
  { value: "200", label: "200 RPS" },
  { value: "500", label: "500 RPS" }
]

const requirements_for_data_processing = [
  { value: "Simple", label: "Simple (Minimal data processing)" },
  { value: "Standard", label: "Standard (Text or small file processing)" },
  { value: "Large", label: "Large (Image or document handling)" },
  { value: "Extremely_Large", label: "Extremely Large (Video, streaming, or large-scale batch processing)" }
]

export default function Step2Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedStability, setSelectedStability] = useState('Low')
  const [selectedProcessing, setSelectedProcessing] = useState('Simple')
  const { projectId } = useParams()
 
  const { formData, updateFormData } = useProjectForm()

  const [numberOfInstances] = useState(formData.numberOfInstances || 1)

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      instance_requirements: Array.from({ length: numberOfInstances }, () => ({
        target_stability: '',
        anticipated_rps: 0,
        requirements_for_data_processing: ''
      }))
    }
  })

  const { fields } = useFieldArray({
    control,
    name: "instance_requirements"
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    const combinedData = {
      location: formData.selectedRegion,
      service_type: formData.selectedService,
      computing_service_model: formData.computeModel,
      additional_requirements: formData.requirements,
      instance_requirements: data.instance_requirements.map((item: any) => ({
        target_stability: item.target_stability,
        anticipated_rps: Number(item.anticipated_rps),
        requirements_for_data_processing: item.requirements_for_data_processing
      }))
    }

    // const response = await fetch(`/api/project/${projectId}/architecture/suggestion`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(combinedData)
    // })

    // if (response.ok) {
    //   const res = await response.json()
    //   const diagrams = res.response
    //   updateFormData({ diagrams: diagrams })
      
    //   router.push(`/project/create/${projectId}/ai/step3`)
    // } else {
    //   console.error('Failed to send data to the server')
    // }
    const diagrams = ai_db.rec
    
    updateFormData({ diagrams: diagrams })
    router.push(`/project/create/${projectId}/ai/step3`)

    setLoading(false)
  }

  const handlePrevious = () => router.back()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {loading ? (
        <ProjectCreateLoading />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[600px] p-6 bg-white rounded-md border"
        >
          <div className="flex justify-center items-center pb-6">
            <h2 className="text-[15.5px] font-semibold text-gray-800 justify-self-center">Instance Requirements</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-4">
            {fields.map((item, index) => (
              <div key={item.id} className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Choose the required level of system stability.
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {target_stability.map((velue) => (
                      <button
                        type='button'
                        key={velue.label}
                        onClick={() => {
                          setSelectedStability(velue.value)
                          setValue(`instance_requirements.${index}.target_stability`, velue.value)
                        }}
                        className={`text-xs font-medium px-4 py-2 rounded border transition-all
                          ${
                            selectedStability === velue.value
                              ? 'bg-violet-100 border-violet-300 text-violet-800 font-semibold'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {velue.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Choose your data processing requirements.
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {requirements_for_data_processing.map((velue) => (
                      <button
                        type='button'
                        key={velue.label}
                        onClick={() => {
                          setSelectedProcessing(velue.value)
                          setValue(`instance_requirements.${index}.requirements_for_data_processing`, velue.value)
                        }}
                        className={`text-xs font-medium px-4 py-2 rounded border transition-all
                          ${
                            selectedProcessing === velue.value
                              ? 'bg-violet-100 border-violet-300 text-violet-800 font-semibold'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {velue.value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Choose the expected number of requests per second (RPS).
                  </label>
                  <SelectBox
                    placeholder="Select expected RPS"
                    onChange={(value) => {
                      setValue(`instance_requirements.${index}.anticipated_rps`, Number(value))
                    }}
                    option={anticipated_rps}
                    className="w-full"
                  />
                </div>

                {index < fields.length - 1 && <hr className="my-8 border-gray-300" />}
              </div>
            ))}

            <div className="flex justify-end items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrevious}
                className="px-4 rounded-sm h-8 bg-gray-50 hover:bg-violet-50 text-black border"
              >
                <p className="text-black font-normal">Previous</p>
              </Button>
              <Button
                type="submit"
                className="px-3 rounded-sm h-8 w-[75px] bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF] cursor-pointer"
              >
                Next
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  )
}
