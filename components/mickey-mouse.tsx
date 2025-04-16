"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Настройки для Микки Мауса
const SHOW_MICKEY = true // Глобальный переключатель для отображения
const MICKEY_CONFIG = {
  size: 130, // Размер в пикселях
  bottom: -7, // Отступ снизу в пикселях
  animate: true, // Включить анимацию
  speed: 1.5, // Скорость перемещения (пикселей в кадр)
  bounce: false, // Включить анимацию подпрыгивания
  startOffscreen: true, // Начинать за пределами экрана при анимации
  staticPosition: 40, // Позиция слева (в px) при отключенной анимации
  reverseOnEdge: true, // true - разворачиваться на краю экрана, false - начинать заново
  respawnDelay: 3000, // Задержка перед повторным появлением в мс (если reverseOnEdge = false)
  mirrorWhenReversed: true, // Отзеркаливать изображение при движении в другую сторону
  initiallyMirrored: false, // Начальное состояние отзеркаливания (до начала движения)
  initialDirection: -1, // Начальное направление движения (1 - вправо, -1 - влево)
  animationMode: 'linear', // Режим анимации: 'linear' - по горизонтали, 'square' - по периметру
  distanceFromEdge: 0, // Отступ от края экрана при движении по периметру (в пикселях)
  navbarHeight: 80, // Высота навигационного меню (в пикселях)
  respectNavbar: true, // Учитывать высоту навигационного меню при движении по верхнему краю
  showOnMobile: true, // Показывать ли Микки на мобильных устройствах
  mobileSize: 80, // Размер Микки на мобильных устройствах (в пикселях)
}


// Перечисление для сторон квадрата
enum SquareSide {
  BOTTOM = 0, // Внизу
  RIGHT = 1,  // Справа 
  TOP = 2,    // Вверху
  LEFT = 3    // Слева
}

const MickeyMouse = () => {
  const [showMickey, setShowMickey] = useState(SHOW_MICKEY)
  const [position, setPosition] = useState({
    x: MICKEY_CONFIG.animate 
      ? (MICKEY_CONFIG.startOffscreen ? -MICKEY_CONFIG.size : 0) 
      : MICKEY_CONFIG.staticPosition,
    y: 0
  })
  const [isMoving, setIsMoving] = useState(true)
  const [isReversed, setIsReversed] = useState(MICKEY_CONFIG.initiallyMirrored)
  const [rotation, setRotation] = useState(0) // Угол поворота в градусах
  const [windowHeight, setWindowHeight] = useState(0) // Сохраняем высоту окна в состоянии
  const [isMounted, setIsMounted] = useState(false) // Флаг монтирования компонента
  const [navbarHeight, setNavbarHeight] = useState(MICKEY_CONFIG.navbarHeight) // Высота навигационного меню
  const [isMobile, setIsMobile] = useState(false)
  const requestRef = useRef<number | null>(null)
  const bounceRef = useRef(0)
  const directionRef = useRef(MICKEY_CONFIG.initialDirection)
  const squareSideRef = useRef<SquareSide>(SquareSide.BOTTOM) // Текущая сторона квадрата
  
  // Эффект для проверки монтирования компонента и размеров окна
  useEffect(() => {
    setIsMounted(true)
    setWindowHeight(window.innerHeight)
    
    // Получаем высоту навигационного меню при монтировании
    try {
      const navbar = document.querySelector('header') || document.querySelector('nav')
      if (navbar) {
        const navbarRect = navbar.getBoundingClientRect()
        setNavbarHeight(navbarRect.height)
      }
    } catch (error) {
      // Ошибка при получении высоты меню
    }
    
    const handleResize = () => {
      const isMobileView = window.innerWidth < 640
      setIsMobile(isMobileView)
      setShowMickey(MICKEY_CONFIG.showOnMobile || !isMobileView ? SHOW_MICKEY : false)
      setWindowHeight(window.innerHeight)
      
      // Обновляем высоту навигационного меню при изменении размера окна
      try {
        const navbar = document.querySelector('header') || document.querySelector('nav')
        if (navbar) {
          const navbarRect = navbar.getBoundingClientRect()
          setNavbarHeight(navbarRect.height)
        }
      } catch (error) {
        // Ошибка при получении высоты меню при ресайзе
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Функция для обновления вращения в зависимости от стороны квадрата
  const updateRotationBySide = (side: SquareSide) => {
    switch (side) {
      case SquareSide.BOTTOM:
        setRotation(0) // Базовое положение - ногами вниз
        setIsReversed(false) // Спиной вперед по нижнему краю (направление вправо)
        break
      case SquareSide.RIGHT:
        setRotation(270) // Поворот на 270 градусов - ногами влево
        setIsReversed(false) // Спиной вперед по правому краю (направление вверх)
        break
      case SquareSide.TOP:
        setRotation(180) // Поворот на 180 градусов - ногами вверх
        setIsReversed(false) // Спиной вперед по верхнему краю (направление влево)
        break
      case SquareSide.LEFT:
        setRotation(90) // Поворот на 90 градусов - ногами вправо
        setIsReversed(false) // Спиной вперед по левому краю (направление вниз)
        break
    }
  }
  
  // Функция для движения по периметру (квадрату)
  const moveInSquare = (prev: { x: number, y: number }) => {
    if (!isMounted) return prev; // Не обновляем позицию до монтирования
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const edgeDistance = MICKEY_CONFIG.distanceFromEdge;
    const effectiveNavbarHeight = MICKEY_CONFIG.respectNavbar ? navbarHeight : 0;
    
    let newX = prev.x;
    let newY = prev.y;
    let sideSwitched = false;
    let newSide = squareSideRef.current;
    
    // В зависимости от текущей стороны квадрата
    switch (squareSideRef.current) {
      case SquareSide.BOTTOM: // Движение по нижнему краю слева направо
        newX = prev.x + MICKEY_CONFIG.speed;
        
        // Проверка достижения правого края
        if (newX > windowWidth - MICKEY_CONFIG.size - edgeDistance) {
          newSide = SquareSide.RIGHT;
          sideSwitched = true;
          newX = windowWidth - MICKEY_CONFIG.size - edgeDistance;
        }
        break;
        
      case SquareSide.RIGHT: // Движение по правому краю снизу вверх
        newY = prev.y + MICKEY_CONFIG.speed;
        
        // Проверка достижения верхнего края (с учетом меню)
        if (newY > windowHeight - MICKEY_CONFIG.size - edgeDistance - effectiveNavbarHeight) {
          newSide = SquareSide.TOP;
          sideSwitched = true;
          newY = windowHeight - MICKEY_CONFIG.size - edgeDistance - effectiveNavbarHeight;
        }
        break;
        
      case SquareSide.TOP: // Движение по верхнему краю справа налево
        newX = prev.x - MICKEY_CONFIG.speed;
        
        // Проверка достижения левого края
        if (newX < edgeDistance) {
          newSide = SquareSide.LEFT;
          sideSwitched = true;
          newX = edgeDistance;
        }
        break;
        
      case SquareSide.LEFT: // Движение по левому краю сверху вниз
        newY = prev.y - MICKEY_CONFIG.speed;
        
        // Проверка достижения нижнего края (замыкание квадрата)
        if (newY < edgeDistance) {
          newSide = SquareSide.BOTTOM;
          sideSwitched = true;
          newY = edgeDistance;
        }
        break;
    }
    
    // Если сторона изменилась, обновляем и применяем новое вращение
    if (sideSwitched) {
      squareSideRef.current = newSide;
      updateRotationBySide(newSide);
    }
    
    // Обработка подпрыгивания, если включено
    let bounceY = 0;
    if (MICKEY_CONFIG.bounce) {
      bounceRef.current += 0.05;
      bounceY = Math.sin(bounceRef.current) * 15;
    }
    
    return { 
      x: newX,
      y: newY + bounceY
    };
  };
  
  // Функция для линейного движения (исходная реализация)
  const moveLinear = (prev: { x: number, y: number }) => {
    if (!isMounted) return prev; // Не обновляем позицию до монтирования
    
    const newX = prev.x + (MICKEY_CONFIG.speed * directionRef.current);
    const windowWidth = window.innerWidth;
    
    // Проверка достижения края экрана
    if (newX > windowWidth && !MICKEY_CONFIG.reverseOnEdge) {
      // Режим респауна - останавливаем движение и запускаем таймер для возврата
      setIsMoving(false);
      setTimeout(() => {
        setPosition({
          x: MICKEY_CONFIG.startOffscreen ? -MICKEY_CONFIG.size : 0,
          y: 0
        });
        directionRef.current = MICKEY_CONFIG.initialDirection;
        if (MICKEY_CONFIG.mirrorWhenReversed) {
          setIsReversed(MICKEY_CONFIG.initiallyMirrored);
        }
        setRotation(0); // Сбрасываем поворот
        setIsMoving(true);
      }, MICKEY_CONFIG.respawnDelay);
      
      return prev;
    } else if (newX > windowWidth && MICKEY_CONFIG.reverseOnEdge) {
      // Режим разворота
      directionRef.current = -1;
      if (MICKEY_CONFIG.mirrorWhenReversed) {
        // Инвертируем начальное состояние при смене направления
        setIsReversed(!MICKEY_CONFIG.initiallyMirrored);
      }
      return { ...prev, x: windowWidth };
    } else if (newX < -MICKEY_CONFIG.size && !MICKEY_CONFIG.reverseOnEdge) {
      // Режим респауна с левого края
      setIsMoving(false);
      setTimeout(() => {
        setPosition({
          x: MICKEY_CONFIG.startOffscreen ? -MICKEY_CONFIG.size : 0,
          y: 0
        });
        directionRef.current = MICKEY_CONFIG.initialDirection;
        if (MICKEY_CONFIG.mirrorWhenReversed) {
          setIsReversed(MICKEY_CONFIG.initiallyMirrored);
        }
        setRotation(0); // Сбрасываем поворот
        setIsMoving(true);
      }, MICKEY_CONFIG.respawnDelay);
      
      return prev;
    } else if (newX < -MICKEY_CONFIG.size && MICKEY_CONFIG.reverseOnEdge) {
      // Режим разворота
      directionRef.current = 1;
      if (MICKEY_CONFIG.mirrorWhenReversed) {
        // Восстанавливаем начальное состояние при возврате к исходному направлению
        setIsReversed(MICKEY_CONFIG.initiallyMirrored);
      }
      return { ...prev, x: -MICKEY_CONFIG.size };
    }
    
    // Обновление позиции по вертикали (подпрыгивание)
    let newY = 0;
    if (MICKEY_CONFIG.bounce) {
      bounceRef.current += 0.05;
      newY = Math.sin(bounceRef.current) * 15;
    }
    
    return { x: newX, y: newY };
  };
  
  // Эффект для управления анимацией движения Микки
  useEffect(() => {
    if (!showMickey || !MICKEY_CONFIG.animate || !isMoving || !isMounted) return;
    
    // Инициализируем начальное состояние направления и отзеркаливания
    directionRef.current = MICKEY_CONFIG.initialDirection;
    
    // Начальное состояние отзеркаливания в зависимости от режима анимации
    if (MICKEY_CONFIG.animationMode === 'linear') {
      // В линейном режиме отзеркаливаем исходя из направления
      if (MICKEY_CONFIG.mirrorWhenReversed) {
        setIsReversed(MICKEY_CONFIG.initialDirection === -1 ? true : MICKEY_CONFIG.initiallyMirrored);
      } else {
        setIsReversed(MICKEY_CONFIG.initiallyMirrored);
      }
    } else {
      // В режиме квадрата начальное вращение на основе стороны
      updateRotationBySide(squareSideRef.current);
    }
    
    const animate = () => {
      setPosition(prev => {
        // Выбираем режим анимации
        if (MICKEY_CONFIG.animationMode === 'square') {
          return moveInSquare(prev);
        } else {
          return moveLinear(prev);
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [showMickey, isMoving, isMounted]);

  // Если Микки Маус не должен отображаться или компонент не смонтирован, возвращаем null
  if (!showMickey || !isMounted) return null;
  
  // Если Микки Маус в режиме респауна и анимация включена, скрываем его
  if (!isMoving && MICKEY_CONFIG.animate && !MICKEY_CONFIG.reverseOnEdge) {
    return null;
  }

  // Определение стилей позиционирования в зависимости от режима анимации
  const positionStyles = MICKEY_CONFIG.animationMode === 'square' 
    ? {
        // В режиме квадрата используем напрямую координаты x и y
        bottom: 'auto',
        left: `${position.x}px`,
        top: `${windowHeight - position.y - MICKEY_CONFIG.size}px`,
      }
    : {
        // В линейном режиме используем bottom и left
        bottom: `${MICKEY_CONFIG.bottom}px`,
        left: `${position.x}px`,
        transform: `translateY(${position.y}px)`,
      };

  return (
    <div 
      className="fixed z-50 pointer-events-none"
      style={{
        width: `${isMobile ? MICKEY_CONFIG.mobileSize : MICKEY_CONFIG.size}px`,
        height: `${isMobile ? MICKEY_CONFIG.mobileSize : MICKEY_CONFIG.size}px`,
        ...positionStyles
      }}
      aria-hidden="true"
    >
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          transform: `rotate(${rotation}deg) ${isReversed ? 'scaleX(-1)' : ''}`,
          transformOrigin: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image 
          src="/images/micky1.gif" 
          alt="Микки Маус" 
          width={MICKEY_CONFIG.size} 
          height={MICKEY_CONFIG.size} 
          className="object-contain drop-shadow-xl"
          style={{ width: '100%', height: 'auto', maxWidth: `${MICKEY_CONFIG.size}px` }}
          priority={false}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default MickeyMouse; 