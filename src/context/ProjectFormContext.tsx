'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FormData {
  selectedService: string
  selectedRegion: string
  computeModel: string
  requirements: string
  numberOfInstances: number
}

interface ProjectFormContextType {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

const defaultFormData: FormData = {
  selectedService: 'Web',
  selectedRegion: '',
  computeModel: '',
  requirements: '',
  numberOfInstances: 1,
}

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(undefined)

export function ProjectFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  return (
    <ProjectFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </ProjectFormContext.Provider>
  )
}

export function useProjectForm() {
  const context = useContext(ProjectFormContext)
  if (context === undefined) {
    throw new Error('useProjectForm must be used within a ProjectFormProvider')
  }
  return context
}
