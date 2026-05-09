import React, { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 50 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 50 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden lg:block`}
    >
      <motion.div
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 217, 255, 0.1)' : 'rgba(127, 119, 221, 0.2)',
          borderWidth: isHovering ? '1px' : '2px',
          borderColor: isHovering ? '#00D9FF' : '#7F77DD',
        }}
        className="w-full h-full rounded-full border-solid transition-colors duration-300 flex items-center justify-center"
      >
        <motion.div 
          animate={{ scale: isHovering ? 0 : 1 }}
          className="w-1.5 h-1.5 bg-cyan rounded-full" 
        />
      </motion.div>
    </motion.div>
  )
}
