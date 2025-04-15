"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, X, MessageSquare, Copy, Check, Clock, Mail } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [copied, setCopied] = useState(false)
  const [animation, setAnimation] = useState<'opening' | 'open' | 'closing' | 'closed'>('closed')
  const modalRef = useRef<HTMLDivElement>(null)
  const phoneNumber = "+7 (916) 269-04-03"

  // Управление анимацией открытия/закрытия
  useEffect(() => {
    if (isOpen && animation === 'closed') {
      setAnimation('opening');
      setTimeout(() => setAnimation('open'), 50);
    } else if (!isOpen && (animation === 'open' || animation === 'opening')) {
      setAnimation('closing');
      setTimeout(() => setAnimation('closed'), 300);
    }
  }, [isOpen, animation]);

  // Предотвращаем прокрутку страницы при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Обработка нажатия клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Обработка клика вне модального окна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const openWhatsApp = () => {
    window.open(`https://wa.me/79162690403`, "_blank")
  }

  if (animation === 'closed') return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${animation === 'opening' || animation === 'open' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${animation === 'opening' || animation === 'open' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden transform ${animation === 'opening' ? 'scale-95 opacity-0' : animation === 'open' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-300 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="absolute top-0 right-0">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-5">
            <path d="M120 0L0 120V60L60 0H120Z" fill="currentColor" className="text-primary"/>
            <path d="M120 60L60 120H120V60Z" fill="currentColor" className="text-secondary"/>
          </svg>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="text-primary">Свяжитесь</span>
              <span className="ml-1.5">с нами</span>
            </h2>
            <button
              onClick={onClose}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-all duration-200 transform hover:rotate-90 focus:outline-none focus:ring-0"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Блок контактов */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group">
                <div className="bg-primary/10 p-2.5 rounded-lg transition-colors group-hover:bg-primary/20 group-hover:scale-110 transform duration-200">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Телефон</p>
                  <p className="font-medium">{phoneNumber}</p>
                </div>
                <button
                  className="cursor-pointer focus:outline-none focus:ring-0"
                  onClick={copyToClipboard}
                  aria-label="Копировать номер"
                >
                  {copied ? 
                    <Check className="h-5 w-5 text-green-500 transition-all" /> : 
                    <Copy className="h-5 w-5 text-gray-400 hover:text-primary transition-all" />
                  }
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group">
                <div className="bg-primary/10 p-2.5 rounded-lg transition-colors group-hover:bg-primary/20 group-hover:scale-110 transform duration-200">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">gpb.msk@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group">
                <div className="bg-primary/10 p-2.5 rounded-lg transition-colors group-hover:bg-primary/20 group-hover:scale-110 transform duration-200">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Время работы</p>
                  <p className="font-medium">Пн-Пт: 9:00 — 18:00</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-primary text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-0"
              >
                <Phone className="h-5 w-5" />
                <span>Позвонить</span>
              </a>

              <button
                onClick={openWhatsApp}
                className="bg-[#25D366] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#25D366]/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-0"
              >
                <MessageSquare className="h-5 w-5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal

