'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Modal from './modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const projectSchema = z.object({
  name: z.string().min(10, 'Please enter a project name'),
  description: z.string().min(1, 'Please enter a project description'),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface CreateProjectModalProps {
  onClose: () => void
  onSuccess: (res:any) => void
}

export default function CreateProjectModal({ onClose, onSuccess }: CreateProjectModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const response = await fetch('/api/project/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }
      const res = await response.json()
      onSuccess(res.project_id)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  return (
    <Modal
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
    >
      <div className="bg-[#F8F7FF] rounded-sm p-6 w-[500px] border max-w-[90%]">
        <h2 className="text-md font-semibold mb-4">Create New Project</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <Input
              {...register('name')}
              placeholder="Enter project name"
              className="text-sm shadow-none bg-gray-50" 
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Project Description
            </label>
            <Textarea
              {...register('description')}
              placeholder="Enter project description"
              rows={4}
              className='outline-none resize-none text-sm shadow-none bg-gray-50'
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="px-4 rounded-sm h-8 bg-gray-50 hover:bg-violet-50 text-black border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-3 rounded-sm h-8 w-[75px] bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF] cursor-pointer"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
} 