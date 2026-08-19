"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'

interface ScrollAnimationsProps {
  children: React.ReactNode
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const animatedElements = containerRef.current.querySelectorAll('[data-scroll-animation]')
    
    const scrollTriggers: ScrollTrigger[] = []

    animatedElements.forEach((element) => {
      const animationType = element.getAttribute('data-scroll-animation') as AnimationType
      const delay = Number(element.getAttribute('data-animation-delay') || '0')
      const duration = Number(element.getAttribute('data-animation-duration') || '1')
      const  amount = Number(element.getAttribute('data-animation-amount') || '50')
      
      let animation
      
      switch (animationType) {
        case 'fadeIn':
          animation = gsap.fromTo(element, 
            { opacity: 0 }, 
            { opacity: 1, duration, delay }
          )
          break
          
        case 'slideUp':
          animation = gsap.fromTo(element, 
            { y: amount, opacity: 0 }, 
            { y: 0, opacity: 1, duration, delay }
          )
          break
          
        case 'slideLeft':
          animation = gsap.fromTo(element, 
            { x: -amount, opacity: 0 }, 
            { x: 0, opacity: 1, duration, delay }
          )
          break
          
        case 'slideRight':
          animation = gsap.fromTo(element, 
            { x: amount, opacity: 0 }, 
            { x: 0, opacity: 1, duration, delay }
          )
          break
          
        case 'scale':
          animation = gsap.fromTo(element, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration, delay }
          )
          break
          
        case 'rotate':
          animation = gsap.fromTo(element, 
            { rotation: -5, opacity: 0 }, 
            { rotation: 0, opacity: 1, duration, delay }
          )
          break
          
        default:
          animation = gsap.fromTo(element, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration, delay }
          )
      }
      
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top bottom-=100",
        end: "center center",
        animation: animation,
        scrub: true,
        markers: false,
        toggleActions: "play none none reverse"
      })
      
      scrollTriggers.push(trigger)
    })
    
    ScrollTrigger.refresh()
    
    return () => {
      scrollTriggers.forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

export default ScrollAnimations 