'use client'

import { ProjectFormProvider } from '@/context/ProjectFormContext'

export default function AIStepsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProjectFormProvider>
      {children}
    </ProjectFormProvider>
  )
}