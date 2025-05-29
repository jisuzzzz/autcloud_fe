'use client'
import React from 'react'
import Modal from "./modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X as Xicon, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import RoleModal from "./roleModal"
import Avatar from "@/components/live-gui/ui/avator"
import { useSelf, useOthersMapped } from "@liveblocks/react"

interface ShareModalProps {
  onClose(): void
  projectId: string
}

interface InviteUser {
  email:string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  isOwner: boolean
  accepted: boolean
}

export default function ShareModal({ onClose, projectId }: ShareModalProps) {

  const [email, setEmail] = useState('')
  const [emailList, setEmailList] = useState<string[]>([])
  const [error, setError] = useState('')
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false)
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null)
  // const [users, setUsers] = useState<InviteUser[]>([
  //   { email:"wltn7722@gmail.com", name: "jisu", isOwner: true, role: "admin", accepted: true },
  //   { email:"meked@naver.com", name: "tatum", isOwner: false, role: "editor", accepted: false },
  // ])
  const me = useSelf((me) => me.info)
  const users = useOthersMapped((others) => others.info)

  const handleMiniModalOpen = (index: number) => {
    setSelectedUserIndex(index)
    setIsMiniModalOpen(true)
  }

  const handleMiniModalClose = () => {
    setSelectedUserIndex(null)
    setIsMiniModalOpen(false)
  }

  // const handleRoleChange = (newRole: 'editor' | 'viewer') => {
  //   if (selectedUserIndex !== null) {
  //     setUsers(prev => prev.map((user, index) => 
  //       index === selectedUserIndex ? { ...user, role: newRole } : user
  //     ))
  //   }
  //   handleMiniModalClose()
  // }

  const handleClose = () => {

    setTimeout(() => {
      onClose()
    }, 300)
  }

  const validateEmail = (email:string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const removeEmail = (indexToRemove: number) => {
    setEmailList(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (!email) return

      if (validateEmail(email)) {
        setEmailList(prev => [...prev, email])
        setEmail('')
        setError('')
      } else {
        setError('Not a valid Email format')
      }
    }
  }

  const handleInvite = async () => {
    try {
      for (const inviteEmail of emailList) {
        const response = await fetch('/api/project/member/role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invitee_email: inviteEmail,
            project_id: projectId,
            role: 'editor' // 기본 role
          })
        });

        if (!response.ok) {
          throw new Error('Failed to invite user');
        }
      }
      
      setEmailList([]);
      // 성공 메시지 표시 또는 다른 처리
    } catch (error) {
      console.error('Invitation error:', error);
      setError('Failed to send invitation');
    }
  }

  return (
    <Modal
      onClose={handleClose}
      className="z-40 fixed top-1/2 left-1/2 w-[550px] -translate-x-1/2 -translate-y-1/2 bg-white border rounded-sm pt-3 pb-4"
    >
      <div className="space-y-4">
        
        <div className="flex items-center justify-between border-b pb-3 px-4">
          <h2 className="text-sm font-semibold">Invite</h2>
          <div className="flex items-center gap-4 text-gray-600">
            <button
              className="hover:text-gray-400"
              onClick={onClose}
            >
              <Xicon size={20}/>
            </button>
          </div>
        </div>

        <div className="space-y-2 px-4">
          <div className="flex gap-2">
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 px-2 py-0.5 rounded-sm bg-gray-50">
                {emailList.map((email, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-1 bg-gray-100 px-2 rounded-sm"
                  >
                    <span className="text-sm">{email}</span>
                    <button 
                      onClick={() => removeEmail(index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Xicon size={14} />
                    </button>
                  </div>
                ))}
                <input
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={emailList.length === 0 ? "example@email.com" : ""}
                  className="shadow-none min-w-[200px] px-2 text-xs h-8.5 focus:outline-none"
                />
              </div>
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
            <Button
              disabled={emailList.length === 0}
              className='px-3 rounded-sm h-8 text-xs bg-[#7868E6] border border-[#6035BE] hover:bg-[#8474FF] cursor-pointer'
              onClick={handleInvite}
            >
              Invite
            </Button>
          </div>
        </div> 

        <div className="space-y-4 px-4">
          {me && (
            <div className="flex items-center gap-3">
              <Avatar
                src={me.avatar}
                name="You"
                color={me.color as string}
              />
              <span className="text-xs text-black">{me.name} (you)</span>
            </div>
          )}
          {/* {users.map(([connectionId, info]) => (
            <div className="flex items-center gap-3" key={connectionId}>
              <Avatar
                key={connectionId}
                src={info?.avatar}
                name={info?.name}
                color={info?.color as string}
              />
              <span className="text-xs text-black">{info?.name}</span>
            </div>
          ))} */}
        </div>
      </div>
    </Modal>
  )
}