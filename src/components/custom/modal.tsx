'use client'
import { useEffect, ReactNode, useRef } from "react"
import { createPortal } from 'react-dom'

interface ModalProps {
  onClose(): void;
  children: ReactNode;
  className: string;

}
export default function Modal({ onClose, children, className = "" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if(target.closest('ignore-click')) return;
      
      if(modalRef.current && !modalRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);
  return (
    <div
      ref={modalRef}
      className={`${className}`}>
      {children}
    </div>
  )
}