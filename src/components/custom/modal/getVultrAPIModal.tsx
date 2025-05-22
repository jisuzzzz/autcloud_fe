'use client'
import Modal from "./modal"
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { publicEncrypt, constants } from "crypto"

interface GetVultrAPIModalProps {
  public_key: string
  projectId: string
  onClose: () => void
}

export default function GetVultrAPIModal({public_key, projectId, onClose }: GetVultrAPIModalProps) {
  const {register, handleSubmit} = useForm({
    defaultValues: { vultr_api_key: '' } 
  })
  
  const onSubmit = async (data: { vultr_api_key: string }) => {
    try {
      const encrypted = publicEncrypt(
        {
          key: public_key,
          padding: constants.RSA_PKCS1_PADDING
        },
        Buffer.from(data.vultr_api_key)
      )

      const response = await fetch('/api/project/vultr-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: encrypted,
          project_id: projectId
        })
      })

      if (!response.ok) {
        throw new Error('Invalid Vultr API key')
      }

      onClose()
    } catch (error) {
      console.error('Error API key:', error)
    }
  }

  return (
    <Modal
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
    >
      <div className="bg-gray-50 rounded-sm p-4 w-[600px] border">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex w-full items-center justify-between mb-3">
              <label className="block text-sm text-center font-medium">
                Vultr API Key
              </label>
              <button
                type="button"
                onClick={onClose}
              >
                <X size={20} className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <div className="flex w-full gap-2 justify-between items-center">
              <Input 
                {...register('vultr_api_key')}
                placeholder="Enter your vultr api key"
                className="text-sm shadow-none bg-gray-50 rounded-sm h-8.5" 
              />
              <Button
                type="submit"
                className="px-4 rounded-sm h-8.5 text-xs w-[75px] bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF] cursor-pointer"
              >
                Verify
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}