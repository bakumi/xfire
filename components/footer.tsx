"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Shield,
  Bell,
  Droplets,
  Eye,
} from "lucide-react"
import { useServiceContext } from "@/app/context/ServiceContext"

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

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  // Оборачиваем в try-catch для работы на странице 404, где может не быть доступа к контексту
  let serviceContext;
  try {
    serviceContext = useServiceContext()
  } catch (error) {
    serviceContext = {
      setActiveServiceId: () => {},
      scrollToServices: () => {},
    }
  }
  
  const { setActiveServiceId, scrollToServices } = serviceContext

  // Обработчик клика по услуге в футере
  const handleServiceClick = (serviceId: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (setActiveServiceId) setActiveServiceId(serviceId)
    if (scrollToServices) scrollToServices()
  }

  return (
    <footer className="bg-[#141c2c] text-gray-300 relative overflow-hidden">
      {/* Волнистая линия в фоне */}
      <div className="absolute top-0 left-0 w-full opacity-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="animate-on-scroll">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <RedSquareWithCircle />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-normal">ЦЕНТР</span>
                <span className="text-primary text-xl font-bold -mt-1">ПОЖТЕХНИКА</span>
              </div>
            </div>
            <p className="mb-4 text-gray-400 leading-relaxed">
              Профессиональная установка и обслуживание пожарных систем с гарантией качества и безопасности. Более 10 лет на рынке пожарной безопасности.
            </p>
          </div>

          <div className="animate-on-scroll">
            <h3 className="text-xl font-bold mb-4 text-white relative inline-block">
              Услуги
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group">
                <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href="/#services" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => handleServiceClick(1, e)}
                >
                  Пожарная сигнализация
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                  <Droplets className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href="/#services" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => handleServiceClick(2, e)}
                >
                  Системы пожаротушения
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href="/#services" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => handleServiceClick(3, e)}
                >
                  Видеонаблюдение
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="bg-primary/10 p-1.5 rounded-full transition-colors group-hover:bg-primary/20">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href="/#services" 
                  className="hover:text-primary transition-colors"
                  onClick={(e) => handleServiceClick(4, e)}
                >
                  Техническое обслуживание
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-on-scroll">
            <h3 className="text-xl font-bold mb-4 text-white relative inline-block">
              Компания
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li className="group">
                <Link href="/#about" className="hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                  О нас
                </Link>
              </li>
              <li className="group">
                <a className="hover:text-primary transition-colors flex items-center" href="/#licenses">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                  Лицензии
                </a>
              </li>
              <li className="group">
                <Link href="/#services" className="hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                  Услуги
                </Link>
              </li>
              <li className="group">
                <Link href="/#price" className="hover:text-primary transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                  Цены
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-on-scroll">
            <h3 className="text-xl font-bold mb-4 text-white relative inline-block">
              Контакты
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span>г. Москва, ул. Скульптора Мухиной, д. 6, кв. 155</span>
              </li>
              <li className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <Link href="tel:+79162690403" className="hover:text-primary transition-colors">
                  +7 (916) 269-04-03
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <Link href="mailto:gpb.msk@gmail.com" className="hover:text-primary transition-colors">
                  gpb.msk@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700/50 flex justify-center items-center">
          <p className="text-center text-gray-500">&copy; {currentYear} <span className="font-medium">
            <span className="font-normal">ЦЕНТР</span> <span className="font-bold">ПОЖТЕХНИКА</span></span>. Все права защищены.</p>
        </div>
      </div>
      
      {/* Нижняя волнистая линия */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </footer>
  )
}

export default Footer

