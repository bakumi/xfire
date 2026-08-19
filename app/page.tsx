"use client"

import { useEffect } from "react"
import dynamic from 'next/dynamic'
import Hero from "@/components/hero"

const About = dynamic(() => import("@/components/about"), { ssr: true })
const Services = dynamic(() => import("@/components/services"), { ssr: true })
const PriceList = dynamic(() => import("@/components/price-list"), { ssr: true })
const Contact = dynamic(() => import("@/components/contact"), { ssr: true })
const ScrollToTopButton = dynamic(() => import("@/components/scroll-to-top-button"), { ssr: false })

export default function Home() {
  useEffect(() => {
    const animateElements = document.querySelectorAll(".animate-on-scroll:not(#hero *)")
    
    const heroElements = document.querySelectorAll("#hero .animate-on-scroll")
    heroElements.forEach((element) => {
      element.classList.add("is-visible")
    })
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible")
              observer.unobserve(entry.target)
            }
          })
        },
        { 
          rootMargin: "50px", 
          threshold: 0.1
        }
      )
  
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          animateElements.forEach((element) => {
            observer.observe(element)
          })
        })
      } else {
        setTimeout(() => {
          animateElements.forEach((element) => {
            observer.observe(element)
          })
        }, 200)
      }
    } else {
      animateElements.forEach((element) => {
        element.classList.add("is-visible")
      })
    }

    const handleInitialScroll = () => {
      const hash = window.location.hash
      if (hash) {
        const id = hash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: "smooth",
            })
          })
        }
      }
    }

    handleInitialScroll()

    return () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(() => {});
        animateElements.forEach((element) => {
          observer.unobserve(element)
        })
      }
    }
  }, [])

  return (
    <>
      <ScrollToTopButton />
      <Hero />
      <About />
      <Services />
      <PriceList />
      <Contact />
    </>
  )
}

