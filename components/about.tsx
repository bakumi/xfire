"use client"

import { useRef } from "react"
import { Shield, Award, Users, Clock } from "lucide-react"
import ImageGallery from "./image-gallery"

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null)

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>

      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/5 -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-secondary/5 -z-10"></div>

      <div className="container">
        <div
          className="text-center mb-12"
          data-scroll-animation="fadeIn"
          data-animation-duration="1"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">О нашей компании</h2>
          <div className="w-16 h-1 bg-secondary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Мы специализируемся на установке и обслуживании пожарных систем любой сложности, обеспечивая безопасность
            вашего бизнеса и дома. Наша компания более 10 лет успешно работает на рынке пожарной безопасности.
          </p>
        </div>

        {/* Секция "Наша миссия" - улучшенное расположение */}
        <div
          className="bg-white rounded-xl shadow-md p-8 mb-16 relative overflow-hidden"
          data-scroll-animation="slideUp"
          data-animation-duration="1.2"
        >
          {/* Декоративные элементы */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-secondary/10 -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-primary/10 -z-10"></div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 relative inline-block">
              Наша миссия
              <div
                className="absolute -bottom-2 left-0 h-1 bg-secondary w-full"
              ></div>
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Обеспечение максимальной безопасности наших клиентов с помощью современных технологий и профессионального
              подхода к установке пожарных систем.
            </p>
            <p className="text-gray-700 max-w-3xl mx-auto mt-2">
              <span className="font-semibold">ООО «ЦентрПожТехника»</span> | Лицензия МЧС № 77-Б/01441
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="flex items-start gap-4 p-4 rounded-xl relative overflow-hidden transition-all duration-300 ease-in-out cursor-pointer group transform hover:translate-y-[-5px] hover:shadow-lg"
              data-scroll-animation="fadeIn"
              data-animation-delay="0.1"
              data-animation-duration="0.8"
            >
              <div className="absolute inset-0 bg-gray-50/0 group-hover:bg-gray-50/100 transition-all duration-300 ease-in-out rounded-xl"></div>
              <div className="bg-secondary/10 p-3 rounded-full group-hover:bg-secondary/30 transition-all duration-300 ease-in-out relative z-10">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold">Надежность</h4>
                <p className="text-gray-700 transition-all duration-300 ease-in-out group-hover:text-gray-900">
                  Мы используем только проверенное оборудование от ведущих производителей.
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-4 p-4 rounded-xl relative overflow-hidden transition-all duration-300 ease-in-out cursor-pointer group transform hover:translate-y-[-5px] hover:shadow-lg"
              data-scroll-animation="fadeIn"
              data-animation-delay="0.3"
              data-animation-duration="0.8"
            >
              <div className="absolute inset-0 bg-gray-50/0 group-hover:bg-gray-50/100 transition-all duration-300 ease-in-out rounded-xl"></div>
              <div className="bg-secondary/10 p-3 rounded-full group-hover:bg-secondary/30 transition-all duration-300 ease-in-out relative z-10">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold">Профессионализм</h4>
                <p className="text-gray-700 transition-all duration-300 ease-in-out group-hover:text-gray-900">
                  Все наши специалисты прошли профессиональное обучение, имеют необходимые сертификаты и многолетний опыт работы. Мы находим оптимальные решения для любых задач в области пожарной безопасности.
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-4 p-4 rounded-xl relative overflow-hidden transition-all duration-300 ease-in-out cursor-pointer group transform hover:translate-y-[-5px] hover:shadow-lg"
              data-scroll-animation="fadeIn"
              data-animation-delay="0.5"
              data-animation-duration="0.8"
            >
              <div className="absolute inset-0 bg-gray-50/0 group-hover:bg-gray-50/100 transition-all duration-300 ease-in-out rounded-xl"></div>
              <div className="bg-secondary/10 p-3 rounded-full group-hover:bg-secondary/30 transition-all duration-300 ease-in-out relative z-10">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold">Клиентоориентированность</h4>
                <p className="text-gray-700 transition-all duration-300 ease-in-out group-hover:text-gray-900">
                  Мы всегда учитываем индивидуальные потребности и пожелания каждого клиента.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div
            data-scroll-animation="slideLeft"
            data-animation-duration="1.2"
          >
            <h3 className="text-2xl font-bold mb-6 relative inline-block">
              Лицензии и благодарности
              <div
                className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-secondary to-secondary/70 w-full"
              ></div>
            </h3>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Мы гордимся нашими достижениями и сертификатами, которые подтверждают высокое качество наших услуг и
              профессионализм наших специалистов.
            </p>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary/10 p-2 rounded-full min-w-[40px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Лицензия МЧС № 77-Б/01441</h4>
                    <p className="text-gray-700 text-sm">На осуществление деятельности по монтажу, техническому обслуживанию и ремонту средств обеспечения пожарной безопасности</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary/10 p-2 rounded-full min-w-[40px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Сертификат соответствия</h4>
                    <p className="text-gray-700 text-sm">На выполнение работ по монтажу, наладке и обслуживанию систем пожарной безопасности</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary/10 p-2 rounded-full min-w-[40px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Благодарственные письма</h4>
                    <p className="text-gray-700 text-sm">От наших довольных клиентов за качественное выполнение работ и профессиональный подход</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="space-y-6"
            data-scroll-animation="slideRight"
            data-animation-duration="1.2"
          >
            <div className="relative">
              <ImageGallery
                images={[
                  {
                    src: "/images/certificates/cert1.webp",
                    alt: "Лицензия МЧС № 77-Б/01441",
                    title: "Лицензия МЧС",
                  },
                  {
                    src: "/images/certificates/cert2.webp",
                    alt: "Сертификат соответствия",
                    title: "Сертификат соответствия",
                  },
                  {
                    src: "/images/certificates/gratitude1.webp",
                    alt: "Благодарственное письмо",
                    title: "Благодарность от клиентов",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 max-w-6xl mx-auto stats-group"
          data-scroll-animation="slideUp"
          data-animation-duration="1"
        >
          <div 
            className="relative bg-white p-10 rounded-2xl shadow-lg border border-gray-100 group hover:-translate-y-3 hover:shadow-xl transition-all duration-500 overflow-hidden stats-item"
            data-scroll-animation="scale"
            data-animation-delay="0.1"
            data-animation-duration="0.8"
          >
            {/* Декоративные элементы фона */}
            <div className="absolute right-0 top-0 w-40 h-40 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full text-primary">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.54-5.05l-2.83-2.83 1.41-1.41 1.41 1.41L15.07 8.5l1.41 1.41-5.02 5.04z" className="fill-current"/>
              </svg>
            </div>

            {/* Цветная рамка сверху */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-t-2xl"></div>
            
            {/* Большая иконка */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-[1.8] group-hover:scale-[2] transition-transform duration-500"></div>
              <div className="relative bg-white p-5 rounded-full shadow-md transform group-hover:rotate-12 transition-transform duration-500">
                <Clock className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            {/* Контент */}
            <div className="text-center">
              <div className="text-6xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors duration-300">
                10<span className="text-primary">+</span>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary/40 to-primary mx-auto mb-4"></div>
              <p className="text-xl font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Лет на рынке</p>
              <p className="mt-4 text-gray-500">Более десяти лет успешной работы и сотни реализованных проектов по всей России</p>
            </div>
          </div>

          <div 
            className="relative bg-white p-10 rounded-2xl shadow-lg border border-gray-100 group hover:-translate-y-3 hover:shadow-xl transition-all duration-500 overflow-hidden stats-item"
            data-scroll-animation="scale"
            data-animation-delay="0.3"
            data-animation-duration="0.8"
          >
            {/* Декоративные элементы фона */}
            <div className="absolute right-0 top-0 w-40 h-40 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full text-primary">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" className="fill-current"/>
              </svg>
            </div>

            {/* Цветная рамка сверху */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-t-2xl"></div>
            
            {/* Большая иконка */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-[1.8] group-hover:scale-[2] transition-transform duration-500"></div>
              <div className="relative bg-white p-5 rounded-full shadow-md transform group-hover:rotate-12 transition-transform duration-500">
                <Users className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            {/* Контент */}
            <div className="text-center">
              <div className="text-6xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors duration-300">
                500<span className="text-primary">+</span>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary/40 to-primary mx-auto mb-4"></div>
              <p className="text-xl font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Довольных клиентов</p>
              <p className="mt-4 text-gray-500">Сотни клиентов доверяют нам безопасность своего бизнеса и жилья</p>
            </div>
          </div>

          <div 
            className="relative bg-white p-10 rounded-2xl shadow-lg border border-gray-100 group hover:-translate-y-3 hover:shadow-xl transition-all duration-500 overflow-hidden stats-item"
            data-scroll-animation="scale"
            data-animation-delay="0.5"
            data-animation-duration="0.8"
          >
            {/* Декоративные элементы фона */}
            <div className="absolute right-0 top-0 w-40 h-40 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full text-primary">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" className="fill-current"/>
              </svg>
            </div>

            {/* Цветная рамка сверху */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-t-2xl"></div>
            
            {/* Большая иконка */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full transform scale-[1.8] group-hover:scale-[2] transition-transform duration-500"></div>
              <div className="relative bg-white p-5 rounded-full shadow-md transform group-hover:rotate-12 transition-transform duration-500">
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            {/* Контент */}
            <div className="text-center">
              <div className="text-6xl font-bold mb-4 text-gray-800 group-hover:text-primary transition-colors duration-300">
                1000<span className="text-primary">+</span>
              </div>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary/40 to-primary mx-auto mb-4"></div>
              <p className="text-xl font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Установленных систем</p>
              <p className="mt-4 text-gray-500">Тысячи надежных систем пожарной безопасности работают по всей стране</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

