'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import SelectBox from '@/components/custom/ui/dropDown/selectBox'
import { useParams } from 'next/navigation'
import { useProjectForm } from '@/context/ProjectFormContext'

const locations = [
  { value: "ewr", label: "New Jersey (ewr)" },
  { value: "sjc", label: "Silicon Valley (sjc)" },
  { value: "ams", label: "Amsterdam (ams)" },
  { value: "lhr", label: "London (lhr)" },
  { value: "sqp", label: "Singapore (sqp)" },
  { value: "icn", label: "South Korea (icn)" },
  { value: "mel", label: "Melbourne (mel)" },
  { value: "sao", label: "São Paulo (sao)" },
  { value: "scl", label: "Santiago (scl)" },
  { value: "jnb", label: "Johannesburg (jnb)" },
]

const serviceTypes = ["Web", "App", "AI", "Game"]

const computingServiceModels = [
  {value: "IaaS", label: "IaaS (Infrastructure as a Service)"},
  {value: "PaaS", label: "PaaS (Platform as a Service)"}, 
  {value: "SaaS", label: "SaaS (Software as a Service)"}, 
  {value: "FaaS", label: "FaaS (Function as a Service)"},
]

export default function Step1Page() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState('Web')
  const [selectedServiceModels, setSelectedServiceModels] = useState('IaaS')
  const [numberOfInstances, setNumberOfInstances] = useState(1)
  const { projectId } = useParams()
  // console.log(projectId)
  const { formData, updateFormData } = useProjectForm()

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      selectedService: 'Web',
      selectedRegion: 'sjc',
      computeModel: 'IaaS',
      requirements: '',
      numberOfInstances: 1,
    }
  })

  const onSubmit = (data: any) => {
    updateFormData({
      selectedService: data.selectedService,
      selectedRegion: data.selectedRegion,
      computeModel: data.computeModel,
      requirements: data.requirements,
      numberOfInstances: data.numberOfInstances
    })
    
    router.push(`/project/create/${projectId}/ai/step2`)
  }
  const handlePrevious = () => router.back()

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[600px] p-6 bg-white rounded-md border"
      >

        <div className="flex items-center pb-6 justify-center">
          <h2 className="text-[15.5px] font-semibold text-gray-800">Service Configuration</h2>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Choose the region for deployment.
            </label>
            <SelectBox
              placeholder="Select a region"
              onChange={(value) => setValue('selectedRegion', value)}
              option={locations}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Choose the type of service you are building.
            </label>
            <div className="grid grid-cols-4 gap-3">
              {serviceTypes.map((label) => (
                <button
                  type='button'
                  key={label}
                  onClick={() => {
                    setSelectedService(label)
                    setValue('selectedService', label)
                  }}
                  className={`text-xs font-medium px-4 py-2 rounded border transition-all
                    ${
                      selectedService === label
                        ? 'bg-violet-100 border-violet-300 text-violet-800 font-semibold'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Choose your preferred cloud service model.
            </label>
            <div className='grid grid-cols-4 gap-3'>
              {computingServiceModels.map((value) => 
                <button
                  type='button'
                  key={value.label}
                  onClick={() => {
                    setSelectedServiceModels(value.value)
                    setValue('computeModel', value.value)
                  }}
                  className={`text-xs font-medium px-4 py-2 rounded border transition-all
                    ${
                      selectedServiceModels === value.value
                        ? 'bg-violet-100 border-violet-300 text-violet-800 font-semibold'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {value.value}
                </button>
              )}
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Choose the number of instances you plan to deploy.
            </label>
            <div className='grid grid-cols-3 gap-3'>
              {[1, 2, 3].map(num => (
                <button
                  type='button'
                  key={num}
                  onClick={() => {
                    setNumberOfInstances(num) 
                    setValue('numberOfInstances', num)
                  }}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-all
                    ${
                      numberOfInstances === num
                        ? 'bg-violet-100 border-violet-300 text-violet-800 font-semibold'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {`Instance : ${num}`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Enter any additional requirements or special considerations for your service. 
            </label>
            <Input
              {...register('requirements')}
              placeholder="e.g., Real-time game processing"
              className='h-10 shadow-none'
            />
          </div>

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
    </div>
  )
}