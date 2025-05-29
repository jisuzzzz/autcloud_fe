'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import ShareModal from '@/components/custom/modal/shareModal'
import { useSelf, useOthersMapped } from '@liveblocks/react'
import Avatar from './avator'
import Link from 'next/link'
import Image from 'next/image'
import { useYjsStore } from '@/lib/hooks/useYjsStore'
import { LiveFlowService } from '@/services/liveflow'
import GetVultrAPIModal from '@/components/custom/modal/getVultrAPIModal'

interface HeaderProps {
  projectId: string
  projectName: string
}

export const Avatars = React.memo(function Avatars() {
  const me = useSelf((me) => me.info)
  const users = useOthersMapped((others) => others.info)
  return (
    <div className="rounded-md min-h-[32px] w-full flex items-center justify-end">
      {users.slice(0, 3).map(([connectionId, info]) => {
        return (
          <Avatar
            key={connectionId}
            src={info?.avatar}
            name={info?.name}
            color={info?.color as string}
          />
        )
      })}
      {me && (
        <Avatar
          key="me"
          src={me.avatar}
          name="You"
          color={me.color as string}
        />
      )}
    </div>
  )
})

export default function FlowHeader({
  projectId,
  projectName,
}: HeaderProps) {
  const {yDoc} = useYjsStore()
  const me = useSelf()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGetAPIModalOpen, setIsGetAPIModalOpen] = useState(false)
  // const [publicKey, setPublicKey] = useState('')

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleOpenGetAPIModal = async () => {
    // await getPublicKey()
    setIsGetAPIModalOpen(true)
  }
  const handleCloseGetAPIModal = () => setIsGetAPIModalOpen(false)


  const handleSuccess = async () => {
    await handlePublish()
    setIsGetAPIModalOpen(false)
  }

  // const getPublicKey = async () => {
  //   try {
  //     const response = await fetch('/api/project/public-key', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     if (!response.ok) {
  //       throw new Error('Failed to get public key')
  //     }
  //     const res = await response.json()
  //     setPublicKey(res.public_key)
  //   } catch (error) {
  //     console.error('Error get public key:', error)
  //   }
  // }

  const handlePublish = async () => {
    const command_list = LiveFlowService.CreateCommandList(yDoc, me?.id)
    console.log(command_list)
    // try {
    //   const response = await fetch('/api/project/deploy', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       project_id: projectId,
    //       command_list: command_list,
    //     }),
    //   })
    //   if (!response.ok) {
    //     throw new Error('Failed to deploy commands')
    //   }
    // } catch (error) {
    //   console.error('Error deploying commands:', error)
    // }
  }

  return (
    <header className="fixed z-50">
      <div className="flex items-center justify-between bg-white w-screen h-[55px] border-b px-6 py-4">
        <div className="flex gap-7 items-center">
          <Link
            href={'/project'}
            className='flex items-center gap-2'
          >
            <Image
              alt='logo'
              src={'/aut-cloud-logo.svg'}
              width={45}
              height={45}
            >
            </Image>
            <h1 className="text-lg font-bold font-mono">AutCloud</h1>
          </Link>
          <div className="flex gap-2 text-[15px] font-mono">
            <p className="text-gray-500">{'Project'}</p>
            <p className='text-gray-500'>|</p>
            <p>{projectName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <Avatars />
          <Button
            className={cn('px-3 rounded-sm h-8 bg-gray-50 hover:bg-violet-50 text-black border')}
            onClick={handleOpenModal}
          >
            <p className="text-black text-xs font-normal">Share</p>
          </Button>
          <Button
            onClick={handlePublish}
            className={cn('px-3 rounded-sm h-8 text-xs bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF] cursor-pointer')}
          >
            Publish
          </Button>

          {isModalOpen && (
            <ShareModal projectId={projectId} onClose={handleCloseModal} />
          )}

          {/* {isGetAPIModalOpen && (
            <GetVultrAPIModal projectId={projectId} onClose={handleCloseGetAPIModal} onSuccess={handleSuccess} />
          )} */}
        </div>
      </div>
    </header>
  )
}
