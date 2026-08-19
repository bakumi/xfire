"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import Image from "next/image"
import { Bell, Droplets, Eye, Shield, ArrowRight, Check } from "lucide-react"
import ContactModal from "./contact-modal"
import { useServiceContext } from "@/app/context/ServiceContext"

type Service = {
  id: number
  title: string
  description: string
  icon: React.ReactElement
  image: string
  price: string
  features: string[]
}

const Services = () => {
  const { activeServiceId, setActiveServiceId } = useServiceContext();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleServiceChange = (serviceId: number) => {
    if (serviceId === activeServiceId || isChanging) return;
    
    setIsChanging(true);
    setActiveServiceId(serviceId);
    
    setTimeout(() => {
      setIsChanging(false);
    }, 150);
  }

  const services: Service[] = [
    {
      id: 1,
      title: "Пожарная сигнализация",
      description: "Установка современных систем пожарной сигнализации для раннего обнаружения возгорания",
      icon: <Bell className="h-6 w-6" />,
      image: "/images/services/fire-alarm.webp",
      price: "Договорная цена",
      features: [
        "Автоматическое обнаружение пожара",
        "Мгновенное оповещение",
        "Интеграция с системами пожаротушения",
        "Круглосуточный мониторинг",
        "Гарантия 3 года",
      ],
    },
    {
      id: 2,
      title: "Системы пожаротушения",
      description: "Установка автоматических систем пожаротушения для быстрой локализации возгорания",
      icon: <Droplets className="h-6 w-6" />,
      image: "/images/services/fire-extinguishing.webp",
      price: "Договорная цена",
      features: [
        "Автоматическое срабатывание",
        "Различные типы огнетушащих веществ",
        "Минимальный ущерб имуществу",
        "Соответствие всем нормам",
        "Гарантия 5 лет",
      ],
    },
    {
      id: 3,
      title: "Видеонаблюдение",
      description: "Установка систем видеонаблюдения для контроля безопасности и предотвращения пожаров",
      icon: <Eye className="h-6 w-6" />,
      image: "/images/services/video-surveillance.webp",
      price: "Договорная цена",
      features: [
        "Круглосуточный мониторинг",
        "Высокое разрешение камер",
        "Удаленный доступ",
        "Интеграция с другими системами",
        "Гарантия 2 года",
      ],
    },
    {
      id: 4,
      title: "Техническое обслуживание",
      description: "Регулярное обслуживание и проверка работоспособности пожарных систем",
      icon: <Shield className="h-6 w-6" />,
      image: "/images/services/maintenance.webp",
      price: "Договорная цена",
      features: [
        "Ежемесячные проверки",
        "Оперативный ремонт",
        "Замена комплектующих",
        "Техническая документация",
        "Консультации специалистов",
      ],
    },
  ]

  const activeServiceData = services.find((service) => service.id === activeServiceId) || services[0]

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container">
        <div
          className="text-center mb-12"
          data-scroll-animation="fadeIn"
          data-animation-duration="1.2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
          <div className="w-16 h-1 bg-secondary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Мы предлагаем полный спектр услуг по установке и обслуживанию пожарных систем для обеспечения безопасности
            вашего бизнеса и дома.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          data-scroll-animation="slideUp"
          data-animation-duration="1"
        >
          {services.map((service) => (
            <button
              key={service.id}
              className={`p-6 rounded-xl text-left transition-all duration-200 relative overflow-hidden cursor-pointer focus:outline-none ${
                activeServiceId === service.id ? "bg-primary text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"
              } active:scale-95`}
              onClick={() => handleServiceChange(service.id)}
              disabled={isChanging}
            >
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/10 z-0"></div>

              <div className="relative z-10">
                <div
                  className={`p-3 rounded-full inline-block mb-4 ${
                    activeServiceId === service.id ? "bg-white/20" : "bg-secondary/20"
                  }`}
                >
                  {React.cloneElement(service.icon as React.ReactElement, {
                    className: `h-6 w-6 ${activeServiceId === service.id ? "text-white" : "text-secondary"}`,
                  } as React.HTMLAttributes<SVGElement>)}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {service.title}
                </h3>
                <p className={activeServiceId === service.id ? "text-white/80" : "text-gray-700"}>
                  {service.description}
                </p>
                
                <div className={`mt-4 flex justify-end ${activeServiceId === service.id ? "text-white/80" : "text-secondary"}`}>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div
            key={`image-${activeServiceId}`}
            className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-500 service-transition-enter h-[400px]"
            data-scroll-animation="slideLeft"
            data-animation-duration="1.2"
          >
            <Image
              src={activeServiceData.image || "/placeholder.svg"}
              alt={activeServiceData.title}
              width={800}
              height={600}
              className={`w-full h-full object-cover ${activeServiceId === 1 ? "object-[0%_center]" : ""}`}
            />
            <div
              className="absolute top-4 right-4 bg-primary text-white py-2 px-4 rounded-full font-bold shadow-lg"
            >
              {activeServiceData.price}
            </div>

            <div
              className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-full shadow-lg"
            >
              {React.cloneElement(activeServiceData.icon as React.ReactElement, {
                className: "h-6 w-6 text-primary",
              } as React.HTMLAttributes<SVGElement>)}
            </div>
          </div>

          <div
            key={`details-${activeServiceId}`}
            className="transition-all duration-500 service-transition-enter"
            data-scroll-animation="slideRight"
            data-animation-duration="1.2"
          >
            <h3 className="text-2xl font-bold mb-4 relative inline-block">
              {activeServiceData.title}
              <div
                className="absolute -bottom-2 left-0 h-1 bg-secondary w-full"
              ></div>
            </h3>
            <p className="text-gray-700 mb-6">{activeServiceData.description}</p>

            <ul
              className="space-y-3 mb-8"
            >
              {activeServiceData.features.map((feature, index) => (
                <li
                  key={`feature-${activeServiceId}-${index}`}
                  className="flex items-start gap-3"
                  style={{ animation: `service-item-in 0.2s forwards ease-out`, animationDelay: `${index * 50 + 100}ms` }}
                >
                  <div className="bg-secondary/20 p-1 rounded-full mt-0.5">
                    <Check className="h-4 w-4 text-secondary" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={openModal}
                className="btn-primary inline-flex items-center group"
              >
                <span>Заказать услугу</span>
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#price"
                className="btn-secondary inline-flex items-center justify-center group relative overflow-hidden"
              >
                <span className="relative z-10">Подробнее</span>
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1 relative z-10" />
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

export default Services

