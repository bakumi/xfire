"use client"

import React from 'react'
import { useState } from "react"
import { Flame, Droplets, Ruler, FileText, HardHat, Trash2, Wrench, Settings, Map, GraduationCap, BookOpen, Loader, Hammer, Stars } from "lucide-react"

const IconWrapper = ({ icon: Icon, ...props }: { icon: React.ComponentType<any>, [key: string]: any }) => {
  if (!Icon) return null;
  return <Icon {...props} />;
};

type PriceCategory = {
  id: string
  title: string
  icon: React.ComponentType<any>
  tables: {
    title?: string
    columns: string[]
    rows: string[][]
    note?: string
  }[]
}

const PriceList = () => {
  const [activeCategory, setActiveCategory] = useState<string>("extinguishers")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPriceVisible, setIsPriceVisible] = useState(false)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('mobile-dropdown');
      const button = document.getElementById('dropdown-toggle');
      
      if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const priceCategories: PriceCategory[] = [
    {
      id: "installation",
      title: "Монтаж",
      icon: Hammer,
      tables: [
        {
          columns: ["Вид работ", "Цена"],
          rows: [
            ["Проектирование систем АПС и СОУЭ", "По запросу"],
            ["Проектирование систем противопожарных мероприятий", "По запросу"],
            ["Проектирование систем пожаротушения", "По запросу"],
            ["Исполнительная документация", "По запросу"],
            ["Монтаж системы АПС", "По запросу"],
            ["Монтаж системы СОУЭ", "По запросу"],
            ["Монтаж системы противопожарных мероприятий", "По запросу"],
            ["Монтаж системы порошкового пожаротушения", "По запросу"],
            ["Монтаж системы газового пожаротушения", "По запросу"],
            ["Монтаж системы водяного пожаротушения", "По запросу"],
            ["Монтаж системы контроля и управления доступом", "По запросу"],
            ["Монтаж системы охранного видеонаблюдения", "По запросу"],
            ["Пуско накладочные работы", "По запросу"]
          ]
        }
      ]
    },
    {
      id: "maintenance",
      title: "ТО систем АПС и СОУЭ",
      icon: Settings,
      tables: [
        {
          columns: ["Площадь", "Цена"],
          rows: [
            ["До 200м²", "4000 руб"],
            ["От 201м² до 500 м²", "от 22 ₽ за 1м²"],
            ["От 501м² до 1000 м²", "от 20 ₽ за 1м²"],
            ["От 1001м² до 2500м²", "от 17 ₽ за 1м²"],
            ["От 2501 м² до 3500 м²", "от 15 ₽ за 1м²"],
            ["От 3501 м²", "от 10 ₽ за 1м²"]
          ]
        }
      ]
    },
    {
      id: "hoses",
      title: "Перекатка пожарных рукавов",
      icon: Droplets,
      tables: [
        {
          columns: ["Вид работ", "Цена"],
          rows: [
            ["Перекатка пожарных рукавов Ду 51мм", "350 руб"],
            ["Перекатка пожарного рукава Ду 66мм", "450 руб"],
            ["Перекатка пожарного рукава Ду 77мм", "100 руб"],
            ["Сбор и установка пожарного рукава", "100 руб"],
            ["Выезд специалистов на объект", "2500 руб"],
            ["Испытание пожарных кранов ВПВ", "550 руб"]
          ]
        }
      ]
    },
    {
      id: "evacuation",
      title: "Изготовление планов эвакуации",
      icon: BookOpen,
      tables: [
        {
          columns: ["Тип плана", "Цена"],
          rows: [
            ["Фотолюминесцентная пленка 300х400 (А3)", "1750 руб"],
            ["Фотолюминесцентная пленка 600х400 (А2)", "2050 руб"],
            ["Высота потолков от 6 м", "2150 руб"],
            ["Фотолюминесцентная пленка в рамке 300х400 (А3)", "2650 руб"],
            ["ПВХ (пластик) основа (фотолюминисцентная) 300х400 (А3)", "2350 руб"],
            ["ПВХ (пластик) основа (фотолюминисцентная) 600х400 (А2)", "2550 руб"],
            ["Прозрачная пленка (с фотолюминесцентной подложкой) в рамке 300х400 (А3)", "2400 руб"],
            ["Прозрачная пленка (с фотолюминесцентной подложкой) в рамке 600х400 (А2)", "2950 руб"],
            ["На оргстекле и пластиковым карманом «Утверждаю» (фотолюминисцентная) 300х400 (А3)", "3900 руб"],
            ["На оргстекле и пластиковым карманом «Утверждаю» (фотолюминисцентная) 600х400 (А2)", "4500 руб"],
            ["Выезд специалиста на объект", "3500 руб"]
          ]
        }
      ]
    },
    {
      id: "stairs",
      title: "Испытание пожарных лестниц",
      icon: Ruler,
      tables: [
        {
          columns: ["Вид работ", "Цена"],
          rows: [
            ["Испытание пожарной лестницы (п.м.)", "800 руб"],
            ["Испытание ограждения лестницы (п.м.)", "80 руб"],
            ["Испытание ограждения кровли (п.м.)", "80 руб"],
            ["Выезд специалиста на объект", "2500 руб"]
          ]
        }
      ]
    },
    {
      id: "education",
      title: "Обучение",
      icon: GraduationCap,
      tables: [
        {
          columns: ["Программа", "Цена"],
          rows: [
            ["Пожарно-технический минимум для руководителей и ответственных за пожарную безопасность в учреждениях (офисах) – ПТМ 16", "5000 руб"],
            ["Монтаж-демонтаж, ремонт и обслуживание систем АПС, СОУЭ, АВПТ, АУПТ", "Договорная цена"],
            ["Разработка проектной документации", "Договорная цена"],
            ["Диспетчеризация", "Договорная цена"],
            ["Огнезащитная обработка материалов", "Договорная цена"],
            ["Консультации по подбору и размещению оборудования", "Бесплатно"]
          ]
        }
      ]
    },
    {
      id: "extinguishers",
      title: "Перезарядка огнетушителей",
      icon: Flame,
      tables: [
        {
          title: "Перезарядка огнетушителей",
          columns: ["Тип огнетушителя", "Цена"],
          rows: [
            ["Перезарядка ОУ-1", "245 руб"],
            ["Перезарядка ОУ-2", "245 руб"],
            ["Перезарядка ОУ-3", "280 руб"],
            ["Перезарядка ОУ-4", "320 руб"],
            ["Перезарядка ОУ-5", "330 руб"],
            ["Перезарядка ОУ-7", "360 руб"],
            ["Перезарядка ОУ-8", "410 руб"],
            ["Перезарядка ОУ-10", "550 руб"],
            ["Перезарядка ОУ-20", "895 руб"],
            ["Перезарядка ОУ-25", "990 руб"],
            ["Перезарядка ОУ-40", "1570 руб"],
            ["Перезарядка ОУ-50", "1800 руб"],
            ["Перезарядка ОУ-80", "3350 руб"],
            ["Перезарядка ОП-1(з)", "120 руб"],
            ["Перезарядка ОП-2(з)", "150 руб"],
            ["Перезарядка ОП-3(з)", "200 руб"],
            ["Перезарядка ОП-4(г)", "280 руб"],
            ["Перезарядка ОП-4(з)", "280 руб"],
            ["Перезарядка ОП-5(з)", "280 руб"],
            ["Перезарядка ОП-6(з)", "310 руб"],
            ["Перезарядка ОП-7(з)", "330 руб"],
            ["Перезарядка ОП-8(з)", "450 руб"],
            ["Перезарядка ОП-10(з)", "450 руб"],
            ["Перезарядка ОП-35(з)", "1650 руб"],
            ["Перезарядка ОП-50(з)", "2150 руб"],
            ["Перезарядка ОП-100(з)", "3300 руб"]
          ]
        },
        {
          title: "Дополнительные работы",
          columns: ["Вид работ", "Цена"],
          rows: [
            ["Замена индикатора (манометра)", "85 руб"],
            ["Замена шланга (распылителя) для ОП-4- ОП-10", "100 руб"],
            ["Замена шланга с раструбом (3 метра) для ОП-35 – ОП-100", "1250 руб"],
            ["Замена шланга с раструбом (5 метров) для ОП-35 – ОП-100", "1900 руб"],
            ["Замена ЗПУ на ОП-2 – ОП-10", "150 руб"],
            ["Замена ЗПУ на ОП-35-ОП-100", "450 руб"],
            ["Замена огнетушащего порошка за кг", "42 руб"],
            ["Ремонт (восстановление) ЗПУ на ОП", "135 руб"],
            ["Чека", "20 руб"],
            ["Продувка-чистка шланга", "20 руб"],
            ["Ремонт ЗПУ ОУ-1 – ОУ-5", "120 руб"],
            ["Ремонт ЗПУ ОУ-10 – ОУ-80", "460 руб"],
            ["Замена ЗПУ ОУ-1 – ОУ-5", "280 руб"],
            ["Замена ЗПУ ОУ-10 – ОУ-80", "500 руб"],
            ["Замена раструба с выкидной трубкой ОУ-1 – ОУ-5", "85 руб"],
            ["Замена раструба в сборе со шлангом ОУ-10 –ОУ-80", "1630 руб"],
            ["Подкраска огнетушителя", "100 руб"],
            ["Вывоз/доставка огнетушителей (рейс)", "1700 руб"],
            ["Утилизация огнетушителя объемом от 1-100 л.", "80 руб"],
            ["Опрессовка баллонов", "150 руб"],
            ["Прокладка под ЗПУ", "50 руб"],
            ["Сбор и установка ручных огнетушителей за штуку", "100 руб"],
            ["Сбор и установка передвижных огнетушителей за штуку", "200 руб"],
            ["Погрузочно-разгрузочные работы ручных огнетушителей от 20 до 100 штук", "850 руб"],
            ["Погрузочно-разгрузочные работы ручных огнетушителей от 100 до 200 штук", "1900 руб"],
            ["Погрузочно-разгрузочные работы ручных огнетушителей от 200 штук", "4000 руб"],
            ["Погрузочно-разгрузочные работы передвижных огнетушителей за 1 шт", "100 руб"]
          ]
        }
      ]
    }
  ]

  const activeCategoryData = priceCategories.find(cat => cat.id === activeCategory) || priceCategories[0]

  return (
    <section id="price" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>

      <div className="container">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Прайс-лист</h2>
          <div className="w-16 h-1 bg-secondary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Актуальные цены на услуги по обслуживанию, ремонту и перезарядке противопожарного оборудования
          </p>
        </div>

        <div className="mb-8">
          <div className="md:hidden mb-4">
            <div className="relative">
              <button 
                id="dropdown-toggle"
                className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={toggleDropdown}
                type="button"
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    <IconWrapper icon={activeCategoryData.icon} size={18} />
                  </span>
                  <span>{activeCategoryData.title}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="mobile-dropdown" className={`absolute left-0 right-0 z-10 mt-1 ${isDropdownOpen ? '' : 'hidden'}`}>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                  {priceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                        activeCategory === category.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-2">
                        <IconWrapper icon={category.icon} size={18} />
                      </span>
                      <span>{category.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="grid grid-cols-3 lg:grid-cols-7 gap-2">
              {priceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm transition-all ${
                    activeCategory === category.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  } focus:outline-none`}
                >
                  <span className="mr-2 flex-shrink-0"><IconWrapper icon={category.icon} size={16} /></span>
                  <span className="font-medium text-center">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          key={activeCategory}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-on-scroll mb-8 service-transition-enter transition-all duration-300"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800">
              <span className="flex items-center">
                <IconWrapper icon={activeCategoryData.icon} size={20} className="mr-2 text-primary" />
                {activeCategoryData.title}
              </span>
            </h3>
            <button 
              onClick={() => setIsPriceVisible(!isPriceVisible)} 
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-primary transition-colors focus:outline-none group"
            >
              <span>{isPriceVisible ? 'Свернуть' : 'Развернуть полностью'}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transition-transform duration-300 group-hover:text-primary ${isPriceVisible ? '' : 'rotate-180'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            {activeCategoryData.tables.map((table, tableIndex) => (
              <div key={`table-${tableIndex}`} className={`mb-8 last:mb-0 transition-all duration-300 overflow-hidden ${!isPriceVisible && tableIndex > 0 ? 'hidden' : ''}`}>
                {table.title && (
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{table.title}</h3>
                )}
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        {table.columns.map((column, colIndex) => (
                          <th 
                            key={`col-${colIndex}`} 
                            className={`py-3 px-4 text-sm font-semibold text-gray-700 border-b border-gray-200 ${
                              colIndex === 0 ? 'w-3/4 text-left' : 'w-1/4 text-right'
                            }`}
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr 
                          key={`row-${rowIndex}`} 
                          className={`transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-primary/5 ${!isPriceVisible && rowIndex > 2 ? 'hidden' : ''}`}
                        >
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={`cell-${cellIndex}`} 
                              className={`py-3 px-4 text-sm text-gray-800 border-b border-gray-100 ${
                                cellIndex === 1 ? 'font-semibold text-primary text-right' : ''
                              } ${
                                cellIndex === 0 ? 'w-3/4' : 'w-1/4'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {!isPriceVisible && table.rows.length > 3 && (
                  <div className="mt-2 text-center">
                    <div className="py-2 px-4 text-sm text-gray-500 bg-gray-50 rounded-lg inline-block">
                      ... ещё {table.rows.length - 3} строк
                    </div>
                  </div>
                )}
                
                {isPriceVisible && table.note && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 italic">
                    {table.note.split('\n').map((line, i) => (
                      <p key={i} className="mb-1 last:mb-0">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default PriceList 