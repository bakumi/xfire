"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import ContactModal from "./contact-modal"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

// Компонент красного квадрата с кружком в центре
const RedSquareWithCircle = () => {
  return (
    <div className="relative w-10 h-10">
      {/* Внешняя красная рамка */}
      <div className="absolute inset-0 bg-red-600"></div>
      {/* Внутренняя белая рамка */}
      <div className="absolute inset-[2px] bg-white"></div>
      {/* Внутренний красный квадрат */}
      <div className="absolute inset-[5px] bg-red-600 flex items-center justify-center">
        {/* Белый круг */}
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          {/* Красный кружок в центре */}
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  // Улучшенная логика отслеживания прокрутки с меньшей частотой вызовов
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      if (!isScrolled) setIsScrolled(true)
    } else {
      if (isScrolled) setIsScrolled(false)
    }
  }, [isScrolled])

  useEffect(() => {
    setIsMounted(true)
    
    // Инициализация состояния при загрузке
    handleScroll()

    // Оптимизированный слушатель с троттлингом
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true })
    return () => window.removeEventListener("scroll", scrollListener)
  }, [handleScroll])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
    closeMenu()
  }

  const scrollToSection = (sectionId: string) => {
    closeMenu()

    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Учитываем высоту шапки
        behavior: "smooth",
      })
    }
  }

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Возвращаем заглушку до монтирования компонента
  if (!isMounted) {
    return null // Предотвращаем мерцание при гидратации
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container flex justify-between items-center">
          <Link href="/" onClick={scrollToTop} className="flex items-center gap-2 group">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <RedSquareWithCircle />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-black text-sm font-normal">ЦЕНТР</span>
              <span className="text-black text-xl font-bold -mt-1">ПОЖТЕХНИКА</span>
            </div>
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>Главная</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e53935" />
                    <stop offset="100%" stopColor="#ffc107" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>О нас</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>Услуги</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("price")}
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>Цены</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>Контакты</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button onClick={openModal} className="call-button px-6 py-3 text-white font-medium focus:outline-none overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">
                <span className="phone-icon-container">
                  <Phone className="h-4 w-4 phone-icon" />
                </span>
                <span>Позвонить</span>
              </span>
              <span className="btn-shine"></span>
            </button>
          </nav>

          {/* Мобильное меню */}
          <button
            className="md:hidden text-text"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Мобильное меню выпадающее */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="container py-4 flex flex-col gap-4">
            <button
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={() => scrollToSection("hero")}
            >
              <span>Главная</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={() => scrollToSection("about")}
            >
              <span>О нас</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={() => scrollToSection("services")}
            >
              <span>Услуги</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={() => scrollToSection("price")}
            >
              <span>Цены</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={() => scrollToSection("contact")}
            >
              <span>Контакты</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button className="call-button px-6 py-3 text-white font-medium focus:outline-none overflow-hidden relative" onClick={openModal}>
              <span className="relative z-10 flex items-center gap-2">
                <span className="phone-icon-container">
                  <Phone className="h-4 w-4 phone-icon" />
                </span>
                <span>Позвонить</span>
              </span>
              <span className="btn-shine"></span>
            </button>
          </div>
        </div>
      </header>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Header

