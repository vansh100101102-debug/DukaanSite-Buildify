import React from 'react'

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-navy opacity-80" />
      <spline-viewer 
        url="https://prod.spline.design/R0Z8QXvegzTqhmmD/scene.splinecode"
        class="w-full h-full"
      />
      {/* Ambient overlays to blend the Spline scene with the UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy/80 pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none" />
    </div>
  )
}
