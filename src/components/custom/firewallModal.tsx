'use client'
import Modal from "./modal"

interface FirewallModalProps {
  onClose: () => void
}

export default function FirewallModal({onClose}: FirewallModalProps) {
  return (
    <Modal
      onClose={onClose}
      className="fixed z-50"
    >
      <div className="w-[419px] h-[464px] bg-blue-500">

      </div>
    </Modal>
  )
}