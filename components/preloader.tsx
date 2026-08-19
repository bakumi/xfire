"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"

const RedSquareWithCircle = () => {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 bg-red-600"></div>
      <div className="absolute inset-[3px] bg-white"></div>
      <div className="absolute inset-[6px] bg-red-600 flex items-center justify-center">
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preloader = preloaderRef.current
    const logo = logoRef.current

    if (!preloader || !logo) return

    gsap.set(logo, { scale: 0.8, opacity: 0 })
    const tlIntro = gsap.timeline()
    tlIntro.to(logo, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
    })
    .to(logo.querySelector('.logo-icon'), {
        rotate: 360,
        repeat: 1,
        duration: 1,
        ease: "power1.inOut"
    }, "-=0.5")

    const timer = setTimeout(() => {
      const tlOutro = gsap.timeline({ 
        onComplete: () => setIsVisible(false) 
      })
      tlOutro.to(logo, { 
          scale: 0.8, 
          opacity: 0, 
          duration: 0.4, 
          ease: "power2.in" 
      })
      .to(preloader, { 
          opacity: 0, 
          duration: 0.5, 
          ease: "power2.inOut" 
      }, "-=0.2")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div 
      ref={preloaderRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div ref={logoRef} className="flex items-center gap-3">
        <div className="relative w-16 h-16 logo-icon">
          <RedSquareWithCircle />
          <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-black text-lg font-normal">ЦЕНТР</span>
          <span className="text-black text-2xl font-bold -mt-1">ПОЖТЕХНИКА</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader 