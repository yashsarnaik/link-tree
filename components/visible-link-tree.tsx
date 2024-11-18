'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Youtube, Facebook, GamepadIcon, Instagram, Github, DiscIcon as Discord, Twitter, SquareStackIcon, Globe, Mail, Newspaper, Sun, Moon } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
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
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      localStorage.setItem('theme', 'dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const links = [
    { icon: Globe, label: 'Website', href: '#', color: '#3b82f6' },
    { icon: Mail, label: 'Email', href: 'mailto:example@example.com', color: '#ef4444' },
    { icon: Youtube, label: 'YouTube', href: '#', color: '#ef4444' },

    { icon: GamepadIcon, label: 'Steam', href: '#', color: '#6366f1' },
    { icon: Instagram, label: 'Instagram', href: '#', color: '#ec4899' },
    { icon: Github, label: 'GitHub', href: '#', color: '#6b7280' },
    { icon: Discord, label: 'Discord', href: '#', color: '#7c3aed' },
    { icon: Twitter, label: 'X', href: '#', color: '#1DA1F2' },
  ]

  return (
    <div className={`min-h-screen w-full text-white relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-violet-900 to-indigo-900' : 'bg-gradient-to-br from-white to-gray-100'}`}>
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
          className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Links
        </motion.h1>

        <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border-white/30 p-6 md:p-8 rounded-xl shadow-2xl relative">
          <Button
            onClick={toggleTheme}
            className="absolute top-4 right-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 p-3 rounded-full"
            style={{
              width: '40px',
              height: '40px',
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </motion.div>
          </Button>

          <div className="flex flex-col items-center">
            <div className="w-20 md:w-28 h-20 md:h-28 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 mb-4 md:mb-6 flex items-center justify-center text-3xl md:text-5xl font-bold text-white shadow-lg">
              H
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-white">Developer</h2>
            <p className="text-indigo-200 text-md md:text-lg">Full-stack Web Developer</p>
          </div>

          <div className="grid gap-4 md:gap-6 mt-6 md:mt-8">
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
                    className="flex items-center justify-start gap-4 py-3 md:py-4 px-4 md:px-6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <link.icon className="w-6 md:w-8 h-6 md:h-8 group-hover:scale-110 transition-transform duration-300" style={{ color: link.color }} />
                    <span className="font-semibold text-lg md:text-xl">{link.label}</span>
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