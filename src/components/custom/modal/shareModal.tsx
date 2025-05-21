'use client'
import Modal from "./modal"
import { Button } from "@/components/ui/button"
import { Send, X as Xicon, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import RoleModal from "./roleModal"

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
  const [users, setUsers] = useState<InviteUser[]>([
    { email:"wltn7722@gmail.com", name: "jisu", isOwner: true, role: "admin", accepted: true },
    { email:"meked@naver.com", name: "tatum", isOwner: false, role: "editor", accepted: false },
  ]);

  const handleMiniModalOpen = (index: number) => {
    setSelectedUserIndex(index)
    setIsMiniModalOpen(true)
  }

  const handleMiniModalClose = () => {
    setSelectedUserIndex(null)
    setIsMiniModalOpen(false)
  }

  const handleRoleChange = (newRole: 'editor' | 'viewer') => {
    if (selectedUserIndex !== null) {
      setUsers(prev => prev.map((user, index) => 
        index === selectedUserIndex ? { ...user, role: newRole } : user
      ))
    }
    handleMiniModalClose()
  }

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
        const response = await fetch('/api/projects/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invitee_email: inviteEmail,
            project_id: projectId,
            role: 'viwer' // 기본 role
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
      className="z-40 fixed top-1/2 left-1/2 w-[550px] -translate-x-1/2 -translate-y-1/2 bg-white border rounded-sm p-6"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-md font-semibold">Invite</h2>
          <div className="flex items-center gap-4 text-gray-600">
            <p className="text-md">Copy Link</p>
            <button
              className="hover:text-gray-400"
              onClick={onClose}
            >
              <Xicon size={20}/>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md focus-within:ring-1">
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
                  className="flex-1 outline-none min-w-[200px] text-sm"
                />
              </div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <Button onClick={handleInvite}>
              <Send size={16}/>
              Invite
            </Button>
          </div>
        </div> 

        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image 
                alt=""
                src="/profile-color-jisu.png"
                width={24}
                height={24}
                className={`rounded-full ${!user.accepted && 'filter grayscale'}`}
              />
              <div className="flex justify-between flex-1">
                <span className="text-md">
                  {user.name}
                  {user.isOwner && <span className="text-sm text-gray-500 ml-1">(you)</span>}
                </span>
                <div className="relative">
                  {user.isOwner ? (
                    <p className="text-sm text-gray-700">{user.role}</p>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleMiniModalOpen(index)}
                        className="text-sm text-gray-700 hover:bg-gray-100 rounded-sm -mr-2.5"
                      >
                        <div className="px-2 py-1 flex items-center gap-1">
                          {user.role}
                          <ChevronDown size={16} />
                        </div>
                      </button>
                      {isMiniModalOpen && selectedUserIndex === index && (
                        <RoleModal
                        email={users[selectedUserIndex].email}
                        projectId={projectId}
                        role={user.role}
                        onMiniClose={handleMiniModalClose}
                        onRoleChange={handleRoleChange}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}