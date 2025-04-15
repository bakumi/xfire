"use client"

import { Shield } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import gsap from "gsap"

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Анимация появления при монтировании
  useEffect(() => {
    if (mounted && sectionRef.current) {
      const title = titleRef.current
      const subtitle = subtitleRef.current
      const buttons = buttonsRef.current
      const image = imageRef.current
      const badges = badgesRef.current
      const wavePath = document.querySelector(".wave-underline path") as SVGPathElement
      
      if (title && subtitle && buttons && image && badges && wavePath) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        
        // Начальные состояния
        gsap.set([title, subtitle, buttons, image, badges.children], { opacity: 0, y: 30 })
        gsap.set(wavePath, { strokeDasharray: 200, strokeDashoffset: 200 })

        // Анимация
        tl.delay(1.1)
          .fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0)
          .fromTo(subtitle, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
          .fromTo(buttons, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7")
          .fromTo(image, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 }, "-=0.8")
          .fromTo(wavePath, { strokeDashoffset: 200 }, { strokeDashoffset: 0, duration: 1.5 }, "-=1.2")
          .fromTo(badges.children, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 
            "-=0.6"
          )
      }
    }
  }, [mounted])

  // Возвращаем базовую версию компонента до монтирования
  if (!mounted) {
    return (
      <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden opacity-0">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Надежная защита от пожара
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-700">
                Профессиональная установка и обслуживание пожарных систем для вашего бизнеса и дома
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Добавляем CSS-анимацию для волнистой линии */}
      <style jsx>{`
        @keyframes drawWave {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      
      {/* Декоративные элементы */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/5 -z-10"></div>
      <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-primary/10 -z-10"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-secondary/10 -z-10"></div>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Надежная защита от{" "}
              <span className="text-primary relative">
                пожара
                <svg
                  className="absolute -bottom-3 left-0 w-full overflow-visible wave-underline"
                  viewBox="0 0 120 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 0,4 C 10,2 15,7 20,4 C 25,1 30,6 35,4 C 40,2 45,7 50,4 C 55,1 60,6 65,4 C 70,2 75,7 80,4 C 85,1 90,6 95,4 C 100,2 105,7 110,4 C 115,1 120,6 125,4"
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffc107" />
                      <stop offset="50%" stopColor="#ff9800" />
                      <stop offset="100%" stopColor="#ffc107" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl mb-6 text-gray-700"
            >
              Профессиональная установка и обслуживание пожарных систем для вашего бизнеса и дома
            </p>
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="btn-primary flex items-center justify-center relative overflow-hidden group"
              >
                <span className="relative z-10">Получить консультацию</span>
                <div className="absolute inset-0 bg-primary/30 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
              </a>
              <a
                href="#services"
                className="btn-secondary flex items-center justify-center relative overflow-hidden group"
              >
                <span className="relative z-10">Узнать об услугах</span>
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
              </a>
            </div>

            <div ref={badgesRef} className="mt-8 grid grid-cols-3 gap-4">
              <div
                className="bg-white shadow-md rounded-lg p-3 text-center"
              >
                <div>
                  <div className="font-bold text-2xl text-primary">ГОСТ</div>
                  <div className="text-sm text-gray-600">соответствие</div>
                </div>
              </div>
              <div
                className="bg-white shadow-md rounded-lg p-3 text-center"
              >
                <div>
                  <div className="font-bold text-2xl text-primary">МЧС</div>
                  <div className="text-sm text-gray-600">сертификат</div>
                </div>
              </div>
              <div
                className="bg-white shadow-md rounded-lg p-3 text-center"
              >
                <div>
                  <div className="font-bold text-2xl text-primary">5 лет</div>
                  <div className="text-sm text-gray-600">гарантия</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={imageRef}
          >
            <Image
              src="/images/hero-image.webp"
              alt="Пожарная безопасность"
              width={800}
              height={600}
              className="w-full h-auto object-contain"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

