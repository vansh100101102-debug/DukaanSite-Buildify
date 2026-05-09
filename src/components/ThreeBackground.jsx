import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Text, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const FloatingCard = ({ position, color, title, index }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.2
    meshRef.current.position.y = position[1] + Math.sin(time * 0.3 + index) * 0.5
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.4} 
          metalness={0.8} 
          roughness={0.2} 
        />
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </mesh>
    </Float>
  )
}

const Particles = ({ count = 1000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20
      p[i * 3 + 1] = (Math.random() - 0.5) * 20
      p[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return p
  }, [count])

  const pointsRef = useRef()
  useFrame((state) => {
    pointsRef.current.rotation.y += 0.001
    pointsRef.current.rotation.x += 0.0005
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#00D9FF"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const Scene = () => {
  const cards = [
    { title: 'E-commerce', color: '#7F77DD', pos: [-4, 2, -2] },
    { title: 'Portfolio', color: '#00D9FF', pos: [4, -1, -3] },
    { title: 'Restaurant', color: '#7F77DD', pos: [-2, -3, -1] },
    { title: 'Business', color: '#00D9FF', pos: [3, 3, -4] },
    { title: 'Storefront', color: '#7F77DD', pos: [0, 0, -5] },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7F77DD" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D9FF" />
      
      <Particles />
      
      {cards.map((card, i) => (
        <FloatingCard 
          key={i}
          index={i}
          position={card.pos} 
          color={card.color} 
          title={card.title} 
        />
      ))}
      
      <Sphere args={[1, 32, 32]} position={[0, 0, -10]}>
        <MeshDistortMaterial
          color="#0A0E27"
          attach="material"
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0A0E27]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <React.Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <Scene />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
