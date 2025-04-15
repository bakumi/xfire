"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ServiceContextType {
  activeServiceId: number;
  setActiveServiceId: (id: number) => void;
  scrollToServices: () => void;
}

// Создаем контекст с начальными значениями
const ServiceContext = createContext<ServiceContextType>({
  activeServiceId: 1,
  setActiveServiceId: () => {},
  scrollToServices: () => {},
});

// Провайдер контекста
export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [activeServiceId, setActiveServiceId] = useState<number>(1);

  // Функция для прокрутки к секции услуг и выбора нужной услуги
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        activeServiceId,
        setActiveServiceId,
        scrollToServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// Хук для использования контекста
export const useServiceContext = () => useContext(ServiceContext); 