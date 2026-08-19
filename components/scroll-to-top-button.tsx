"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ArrowUp } from "lucide-react"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const throttle = <T extends (...args: any[]) => any>(func: T, limit: number) => {
    let inThrottle: boolean | undefined
    return function(this: any, ...args: Parameters<T>) {
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  const toggleVisibility = useCallback(
    throttle(() => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }, 100),
    []
  )

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [toggleVisibility])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    if (!isVisible && buttonRef.current && document.activeElement === buttonRef.current) {
      buttonRef.current.blur()
    }
  }, [isVisible])

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-500 hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isVisible 
          ? "opacity-100 transform translate-y-0" 
          : "opacity-0 transform translate-y-10 pointer-events-none"
      }`}
      aria-label="Прокрутить наверх"
      aria-hidden={!isVisible ? "true" : undefined}
      tabIndex={!isVisible ? -1 : 0}
      inert={!isVisible}
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Прокрутить наверх</span>
    </button>
  )
}

export default ScrollToTopButton

