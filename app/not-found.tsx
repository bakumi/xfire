"use client"

import { useState, useEffect, useCallback } from "react"
import Link from 'next/link'
import { Menu, X, Phone } from "lucide-react"

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

// Использование имени NotFound важно для Next.js
export default function NotFound() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [animationState, setAnimationState] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  // Улучшенная логика отслеживания прокрутки с меньшей частотой вызовов
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      if (!isScrolled) setIsScrolled(true)
    } else {
      if (isScrolled) setIsScrolled(false)
    }
  }, [isScrolled])
  
  // Функции для шапки
  useEffect(() => {
    setMounted(true)
    
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
    
    // Запускаем анимацию после загрузки страницы
    const timer = setTimeout(() => {
      setAnimationState(1)
    }, 100)
    
    // Добавляем класс к body для стилизации
    document.body.classList.add('page-404');
    
    window.addEventListener("scroll", scrollListener, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", scrollListener);
      clearTimeout(timer);
      document.body.classList.remove('page-404');
    }
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Возвращаем заглушку до монтирования компонента
  if (!mounted) {
  return (
      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/90">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-black text-sm font-normal">ЦЕНТР</span>
              <span className="text-black text-xl font-bold -mt-1">ПОЖТЕХНИКА</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8" />
          <div className="md:hidden" />
        </div>
      </header>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Кастомная шапка только для страницы 404 - точно такая же, как на главной */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
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
            <Link 
              href="/" 
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
            </Link>
            <Link 
              href="/#about" 
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>О нас</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="/#services" 
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>Услуги</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="/#price" 
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>Цены</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="/#contact" 
              className="font-medium relative nav-link focus:outline-none"
            >
              <span>Контакты</span>
              <svg className="nav-wave-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="tel:+79162690403" 
              className="call-button btn-primary focus:outline-none overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="phone-icon-container">
                  <Phone className="h-4 w-4 phone-icon" />
                </span>
                <span>Позвонить</span>
              </span>
              <span className="btn-shine"></span>
            </Link>
          </nav>

          {/* Мобильное меню */}
          <button
            className="md:hidden text-black"
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
            <Link 
              href="/" 
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={closeMenu}
            >
              <span>Главная</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="/#about" 
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={closeMenu}
            >
              <span>О нас</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="/#services" 
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={closeMenu}
            >
              <span>Услуги</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="/#price" 
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={closeMenu}
            >
              <span>Цены</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </Link>
            <Link 
              href="/#contact" 
              className="font-medium py-2 text-left relative nav-link-mobile focus:outline-none"
              onClick={closeMenu}
            >
              <span>Контакты</span>
              <svg className="nav-wave-underline-mobile" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path className="nav-wave-path" d="M0,17 C20,5 35,25 55,17 C75,9 85,25 100,15" stroke="url(#navGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            </Link>
            <Link 
              href="tel:+79162690403" 
              className="call-button btn-primary focus:outline-none overflow-hidden relative"
              onClick={closeMenu}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="phone-icon-container">
                  <Phone className="h-4 w-4 phone-icon" />
                </span>
                <span>Позвонить</span>
              </span>
              <span className="btn-shine"></span>
            </Link>
          </div>
        </div>
      </header>

      {/* Основной контент страницы */}
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-700 transform ${animationState === 0 ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            {/* 404 блок */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-32 h-32 opacity-5">
                    <div className="relative w-full h-full">
                      <RedSquareWithCircle />
                    </div>
                  </div>
                </div>
                <h1 className="text-6xl font-bold mb-4 flex items-center gap-4">
                  <span>404</span>
                  <div className="h-12 w-0.5 bg-white/30"></div>
                  <span className="text-3xl font-normal">Страница не найдена</span>
          </h1>
                <p className="text-lg opacity-90 max-w-xl">
                  К сожалению, страница, которую вы ищете, не существует или была перемещена.
                </p>
              </div>
              
              <div className="p-8">
                <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Что могло случиться?</h2>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                        <span>Возможно, вы перешли по устаревшей ссылке</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                        <span>Возможно, адрес был введен с ошибкой</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                        <span>Возможно, страница была удалена или перемещена</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Что можно сделать?</h2>
                    <div className="space-y-4">
                      <Link 
                        href="/" 
                        className="bg-red-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <span>Вернуться на главную</span>
                      </Link>
                      
                      <Link 
                        href="/#services" 
                        className="bg-gray-100 text-gray-800 py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-300"
                      >
                        <span>Посмотреть наши услуги</span>
                      </Link>
                      
                      <Link 
                        href="/#contact" 
                        className="bg-gray-100 text-gray-800 py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-300"
                      >
                        <span>Связаться с нами</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Упрощенный футер для страницы 404 - без анимации */}
      <footer className="bg-[#141c2c] text-gray-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full opacity-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
        
        <div className="container py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Логотип и описание - без animate-on-scroll */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-red-600"></div>
                    <div className="absolute inset-[2px] bg-white"></div>
                    <div className="absolute inset-[5px] bg-red-600 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-normal">ЦЕНТР</span>
                  <span className="text-primary text-xl font-bold -mt-1">ПОЖТЕХНИКА</span>
                </div>
              </div>
              <p className="mb-4 text-gray-400 leading-relaxed">Профессиональная установка и обслуживание пожарных систем с гарантией качества и безопасности</p>
            </div>
            
            {/* Услуги - без animate-on-scroll */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white relative inline-block">Услуги<span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span></h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 group">
                  <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell h-4 w-4 text-primary"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                  </div>
                  <a href="/#services" className="hover:text-primary transition-colors">Пожарная сигнализация</a>
                </li>
                <li className="flex items-center gap-2 group">
                  <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-droplets h-4 w-4 text-primary"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg>
                  </div>
                  <a href="/#services" className="hover:text-primary transition-colors">Системы пожаротушения</a>
                </li>
                <li className="flex items-center gap-2 group">
                  <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4 text-primary"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </div>
                  <a href="/#services" className="hover:text-primary transition-colors">Видеонаблюдение</a>
                </li>
                <li className="flex items-center gap-2 group">
                  <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield h-4 w-4 text-primary"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                  </div>
                  <a href="/#services" className="hover:text-primary transition-colors">Техническое обслуживание</a>
                </li>
              </ul>
            </div>
            
            {/* Компания - без animate-on-scroll */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white relative inline-block">Компания<span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span></h3>
              <ul className="space-y-3">
                <li className="group">
                  <a className="hover:text-primary transition-colors flex items-center" href="/#about">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                    О нас
                  </a>
                </li>
                <li className="group">
                  <a className="hover:text-primary transition-colors flex items-center" href="/#licenses">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                    Лицензии
                  </a>
                </li>
                <li className="group">
                  <a className="hover:text-primary transition-colors flex items-center" href="/#services">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                    Услуги
                  </a>
                </li>
                <li className="group">
                  <a className="hover:text-primary transition-colors flex items-center" href="/#price">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                    Цены
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Контакты - без animate-on-scroll */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white relative inline-block">Контакты<span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span></h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-4 w-4 text-primary"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <span>г. Москва, ул. Скульптора Мухиной, д. 6, кв. 155</span>
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-4 w-4 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <a className="hover:text-primary transition-colors" href="tel:+79162690403">+7 (916) 269-04-03</a>
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-4 w-4 text-primary"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </div>
                  <a className="hover:text-primary transition-colors" href="mailto:gpb.msk@gmail.com">gpb.msk@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-700/50 flex justify-center items-center">
            <p className="text-center text-gray-500">© 2025 <span className="font-medium"><span className="font-normal">ЦЕНТР</span> <span className="font-bold">ПОЖТЕХНИКА</span></span>. Все права защищены.</p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full opacity-10 transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </footer>
    </div>
  )
} 