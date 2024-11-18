'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Youtube, Facebook, GamepadIcon, Instagram, Github, DiscIcon as Discord, Twitter, SquareStackIcon, Globe, Mail, Newspaper } from 'lucide-react'
import { useRef } from 'react'
import * as THREE from 'three'

function Background() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <mesh ref={meshRef} scale={[30, 30, 30]} position={[0, 0, -5]}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial
        color="#6d28d9"
        roughness={0.3}
        metalness={0.8}
        emissive="#4c1d95"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export function VisibleLinkTree() {
  const links = [
    { icon: Globe, label: 'Website', href: '#', color: '#3b82f6' },
    { icon: Mail, label: 'Email', href: 'mailto:example@example.com', color: '#ef4444' },
    { icon: Newspaper, label: 'Blog', href: '#', color: '#10b981' },
    { icon: Youtube, label: 'YouTube', href: '#', color: '#ef4444' },
    { icon: Facebook, label: 'Facebook', href: '#', color: '#3b82f6' },
    { icon: GamepadIcon, label: 'Steam', href: '#', color: '#6366f1' },
    { icon: Instagram, label: 'Instagram', href: '#', color: '#ec4899' },
    { icon: Github, label: 'GitHub', href: '#', color: '#6b7280' },
    { icon: Discord, label: 'Discord', href: '#', color: '#7c3aed' },
    { icon: Twitter, label: 'X', href: '#', color: '#1DA1F2' },
    { icon: SquareStackIcon, label: 'Stack Overflow', href: '#', color: '#f59e0b' },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Background />
          <Environment preset="sunset" />
        </Canvas>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <motion.h1
          className="text-5xl font-bold mb-8 text-center text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Links
        </motion.h1>
        
        <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border-white/30 p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 mb-4 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
              H
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Developer</h2>
            <p className="text-indigo-200 text-lg">Full-stack Web Developer</p>
          </div>

          <div className="grid gap-4">
            {links.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-white/10 hover:bg-white/30 border-white/20 hover:border-white/40 transition-all duration-300 group overflow-hidden relative"
                  style={{
                    boxShadow: `0 0 20px ${link.color}66`,
                  }}
                >
                  <a
                    href={link.href}
                    className="flex items-center justify-start gap-4 py-4 px-6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <link.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" style={{ color: link.color }} />
                    <span className="font-semibold text-xl">{link.label}</span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: link.color }}
                    />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}