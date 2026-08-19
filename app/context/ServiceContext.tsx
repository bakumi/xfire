"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ServiceContextType {
  activeServiceId: number;
  setActiveServiceId: (id: number) => void;
  scrollToServices: () => void;
}

const ServiceContext = createContext<ServiceContextType>({
  activeServiceId: 1,
  setActiveServiceId: () => {},
  scrollToServices: () => {},
});

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [activeServiceId, setActiveServiceId] = useState<number>(1);

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

export const useServiceContext = () => useContext(ServiceContext); 