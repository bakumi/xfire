"use client"
import Link from "next/link"
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react"
import dynamic from "next/dynamic"

// Динамический импорт карты для оптимизации производительности
const Map = dynamic(() => import("@/components/map"), {
  loading: () => <div className="h-[400px] bg-gray-100 rounded-lg animate-pulse"></div>,
  ssr: false,
})

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>

      <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-primary/5 -z-10"></div>
      <div className="absolute bottom-1/3 left-10 w-24 h-24 rounded-full bg-secondary/5 -z-10"></div>

      <div className="container">
        <div
          className="text-center mb-12 animate-on-scroll"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Свяжитесь с нами</h2>
          <div className="w-16 h-1 bg-secondary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Наши специалисты всегда готовы ответить на ваши вопросы и помочь с выбором оптимального решения для вашей
            безопасности. Все наши сотрудники прошли профессиональное обучение и отлично знают свое дело, находя эффективные решения на все вопросы клиентов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="animate-on-scroll">
            <div className="h-[400px] rounded-xl overflow-hidden shadow-md animate-on-scroll">
              <Map />
            </div>
          </div>

          <div className="animate-on-scroll">
            <div className="bg-white p-8 rounded-xl shadow-md mb-8 relative overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-secondary/10 z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-primary/10 z-0"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 relative inline-block">
                  Контактная информация
                  <div className="absolute -bottom-2 left-0 h-1 bg-secondary w-full"></div>
                </h3>

                <div className="space-y-4">
                  <div
                    className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors hover:translate-x-1 animate-on-scroll"
                  >
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Адрес</h4>
                      <p className="text-gray-700">г. Москва, ул. Скульптора Мухиной, д. 6, кв. 155</p>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors hover:translate-x-1 animate-on-scroll"
                  >
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Телефон</h4>
                      <p className="text-gray-700">
                        <Link href="tel:+79162690403" className="hover:text-primary transition-colors">
                          +7 (916) 269-04-03
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors hover:translate-x-1 animate-on-scroll"
                  >
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <p className="text-gray-700">
                        <Link href="mailto:gpb.msk@gmail.com" className="hover:text-primary transition-colors">
                          gpb.msk@gmail.com
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors hover:translate-x-1 animate-on-scroll"
                  >
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold">WhatsApp</h4>
                      <p className="text-gray-700">
                        <Link
                          href="https://wa.me/79162690403"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          Написать в WhatsApp
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

