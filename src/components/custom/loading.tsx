'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  const spinAnimation = {
    animate: {
      rotate: 360,
      transition: {
        duration: 6,
        ease: "linear",
        repeat: Infinity
      }
    }
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center">
      <motion.div
        initial="initial"
        animate="animate"
        variants={spinAnimation}
      >
        <svg width="130" height="130" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF">
                <animate 
                  attributeName="stop-color" 
                  values="#F0F0FF; #FFFFFF; #7868E6; #6035BE; #7868E6; #F0F0FF" 
                  dur="5s" 
                  repeatCount="indefinite" 
                />
              </stop>
              <stop offset="100%" stopColor="#9F8FFF">
                <animate 
                  attributeName="stop-color" 
                  values="#FFFFFF; #7868E6; #6035BE; #9F8FFF; #FFFFFF" 
                  dur="5s" 
                  repeatCount="indefinite" 
                />
              </stop>
            </linearGradient>
          </defs>
          <path d="M40.715 50C48.605 50 55 43.68 55 35.8825C55 29.7025 50.9825 24.45 45.3875 22.5375C44.5925 15.485 38.5375 10 31.19 10C23.3 10 16.905 16.32 16.905 24.1175C16.905 25.8425 17.2175 27.4925 17.79 29.0225C17.1062 28.8903 16.4114 28.8233 15.715 28.8225C9.7975 28.825 5 33.565 5 39.4125C5 45.26 9.7975 50 15.715 50H40.715Z" fill="url(#cloudGradient)">
            <animate 
              attributeName="opacity" 
              values="0.8;1;0.8" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </path>
          <path d="M23.1816 32.7272C25.1135 33.5863 27.4657 34.0909 29.9998 34.0909C32.5339 34.0909 34.8862 33.5863 36.818 32.7272M24.318 26.5909V25.9091M35.6816 26.5909V25.9091" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  );
}