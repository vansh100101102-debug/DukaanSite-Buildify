import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function SplineBackground() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress so the background floats fluidly
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

  // Map scroll progress (0 to 1) to vertical and horizontal movements
  const y1 = useTransform(smoothScroll, [0, 1], ['0%', '80%']);
  const y2 = useTransform(smoothScroll, [0, 1], ['0%', '-80%']);
  const x1 = useTransform(smoothScroll, [0, 1], ['0%', '30%']);
  const x2 = useTransform(smoothScroll, [0, 1], ['0%', '-30%']);
  
  const meshY = useTransform(smoothScroll, [0, 1], ['0%', '5%']);

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden transition-colors duration-500 bg-navy">
      {/* Parallax Mesh Pattern */}
      <motion.div 
        style={{ 
          y: meshY,
          backgroundImage: `radial-gradient(var(--text-color) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
        className="absolute inset-[-20%] opacity-[0.03]" 
      />
    </div>
  )
}
