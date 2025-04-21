'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Modal from './modal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const projectSchema = z.object({
  name: z.string().min(10, '프로젝트 이름을 입력해주세요'),
  description: z.string().min(1, '프로젝트 설명을 입력해주세요'),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface CreateProjectModalProps {
  onClose: () => void
}

export default function CreateProjectModal({ onClose }: CreateProjectModalProps) {
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
        throw new Error('프로젝트 생성에 실패했습니다')
      }

      onClose()
    } catch (error) {
      console.error('프로젝트 생성 에러:', error)
    }
  }

  return (
    <Modal
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90%]">
        <h2 className="text-2xl font-bold mb-4">새 프로젝트 만들기</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              프로젝트 이름
            </label>
            <Input
              {...register('name')}
              placeholder="프로젝트 이름을 입력하세요"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              프로젝트 설명
            </label>
            <Textarea
              {...register('description')}
              placeholder="프로젝트에 대한 설명을 입력하세요"
              rows={4}
              className='outline-none resize-none'
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
              variant="outline"
              onClick={onClose}
            >
              취소
            </Button>
            <Button type="submit">
              생성하기
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
} 