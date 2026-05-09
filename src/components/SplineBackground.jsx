import React from 'react'

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden transition-colors duration-500 bg-navy">
      {/* Animated Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Mesh Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{ 
          backgroundImage: `radial-gradient(var(--text-color) 0.5px, transparent 0.5px)`,
          backgroundSize: '30px 30px'
        }} 
      />

      {/* Overlay Gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-purple/5" />
    </div>
  )
}
