'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import {
  FaGlobe,
  FaInstagram,
  FaGithub,
  FaSun,
  FaMoon,
  FaSnapchatGhost,
} from 'react-icons/fa';
import { FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

function Background() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

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
  );
}

export function VisibleLinkTree() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const links = [
    { icon: FaGlobe, label: 'Website', href: 'https://me.yashsarnaik.in', color: '#3b82f6' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/yashsarnaik23/', color: '#ec4899' },
    { icon: FaSnapchatGhost, label: 'Snapchat', href: 'https://www.snapchat.com/add/sarnaik1023?share_id=7KuIaoFjEgs&locale=en-GB', color: '#FFFF00' },
    { icon: SiGmail, label: 'Gmail', href: 'mailto:yashsarnaik2303@gmail.com', color: '#ef4444' },
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/yashsarnaik', color: '#000000' },
    { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/yashsarnaik23/', color: '#0077B5' },
    { icon: FaXTwitter, label: 'Twitter', href: 'https://x.com/Yash_Sarnaik23', color: '#000000' },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&family=Oooh+Baby:wght@400&family=Kalam:wght@400&display=swap');

        .kalam-light-300 {
          font-family: 'Kalam', cursive;
          font-weight: 400;
        }

        .oooh-baby-regular {
          font-family: 'Oooh Baby', cursive;
          font-weight: 400;
        } 

        .caveat {
          font-family: "Jua", sans-serif;
          font-weight: 400;
          font-style: normal;
        }
      `}</style>
      <div className={`min-h-screen w-full ${theme === 'dark' ? 'text-white' : 'text-black'} relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-violet-900 to-indigo-900' : 'bg-gradient-to-br from-white to-gray-100'}`}>
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
            className={`text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Add your title here if needed */}
          </motion.h1>

          <Card className="w-full max-w-md bg-white/20 backdrop-blur-xl border-white/30 p-6 md:p-8 rounded-xl shadow-2xl relative font-sans">
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
                {theme === 'dark' ? <FaMoon className="w-6 h-6" /> : <FaSun className="w-6 h-6" />}
              </motion.div>
            </Button>

            <div className="flex flex-col items-center">
              <div className="relative w-28 md:w-36 h-28 md:h-36">
                {/* Gradient background with blur effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/80 to-indigo-500/80 rounded-full blur-sm"></div>
                
                {/* Image container with shadow */}
                <div className="relative w-full h-full overflow-hidden rounded-full shadow-xl">
                  <img
                    src="dp2.jpg"
                    alt="Yash Sarnaik"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className={`text-2xl md:text-3xl font-bold mb-2 md:mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'} kalam-light-300`}>
                यश उदय सरनाईक
              </h3>
              <p className={`text-md md:text-lg ${theme === 'dark' ? 'text-black' : 'text-black'} oooh-baby-regular`}>
                Explore more about me Here
              </p>
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
                      <link.icon className="w-14 md:w-16 h-14 md:h-16 group-hover:scale-110 transition-transform duration-300" style={{ color: link.color }} />
                      <span className={`font-semibold text-sm md:text-base caveat`}>{link.label}</span>
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
    </>
  );
}
