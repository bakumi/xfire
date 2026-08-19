"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const SHOW_MICKEY = true
const MICKEY_CONFIG = {
  size: 130,
  bottom: -7,
  animate: true,
  speed: 1.5,
  bounce: false,
  startOffscreen: true,
  staticPosition: 40,
  reverseOnEdge: true,
  respawnDelay: 3000,
  mirrorWhenReversed: true,
  initiallyMirrored: false,
  initialDirection: -1,
  animationMode: 'linear',
  distanceFromEdge: 0,
  navbarHeight: 80,
  respectNavbar: true,
  showOnMobile: true,
  mobileSize: 80,
}


enum SquareSide {
  BOTTOM = 0,
  RIGHT = 1,
  TOP = 2,
  LEFT = 3
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
  const [rotation, setRotation] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [navbarHeight, setNavbarHeight] = useState(MICKEY_CONFIG.navbarHeight)
  const [isMobile, setIsMobile] = useState(false)
  const requestRef = useRef<number | null>(null)
  const bounceRef = useRef(0)
  const directionRef = useRef(MICKEY_CONFIG.initialDirection)
  const squareSideRef = useRef<SquareSide>(SquareSide.BOTTOM)
  
  useEffect(() => {
    setIsMounted(true)
    setWindowHeight(window.innerHeight)
    
    try {
      const navbar = document.querySelector('header') || document.querySelector('nav')
      if (navbar) {
        const navbarRect = navbar.getBoundingClientRect()
        setNavbarHeight(navbarRect.height)
      }
    } catch (error) {
    }
    
    const handleResize = () => {
      const isMobileView = window.innerWidth < 640
      setIsMobile(isMobileView)
      setShowMickey(MICKEY_CONFIG.showOnMobile || !isMobileView ? SHOW_MICKEY : false)
      setWindowHeight(window.innerHeight)
      
      try {
        const navbar = document.querySelector('header') || document.querySelector('nav')
        if (navbar) {
          const navbarRect = navbar.getBoundingClientRect()
          setNavbarHeight(navbarRect.height)
        }
      } catch (error) {
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const updateRotationBySide = (side: SquareSide) => {
    switch (side) {
      case SquareSide.BOTTOM:
        setRotation(0)
        setIsReversed(false)
        break
      case SquareSide.RIGHT:
        setRotation(270)
        setIsReversed(false)
        break
      case SquareSide.TOP:
        setRotation(180)
        setIsReversed(false)
        break
      case SquareSide.LEFT:
        setRotation(90)
        setIsReversed(false)
        break
    }
  }
  
  const moveInSquare = (prev: { x: number, y: number }) => {
    if (!isMounted) return prev;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const edgeDistance = MICKEY_CONFIG.distanceFromEdge;
    const effectiveNavbarHeight = MICKEY_CONFIG.respectNavbar ? navbarHeight : 0;
    
    let newX = prev.x;
    let newY = prev.y;
    let sideSwitched = false;
    let newSide = squareSideRef.current;
    
    switch (squareSideRef.current) {
      case SquareSide.BOTTOM:
        newX = prev.x + MICKEY_CONFIG.speed;
        
        if (newX > windowWidth - MICKEY_CONFIG.size - edgeDistance) {
          newSide = SquareSide.RIGHT;
          sideSwitched = true;
          newX = windowWidth - MICKEY_CONFIG.size - edgeDistance;
        }
        break;
        
      case SquareSide.RIGHT:
        newY = prev.y + MICKEY_CONFIG.speed;
        
        if (newY > windowHeight - MICKEY_CONFIG.size - edgeDistance - effectiveNavbarHeight) {
          newSide = SquareSide.TOP;
          sideSwitched = true;
          newY = windowHeight - MICKEY_CONFIG.size - edgeDistance - effectiveNavbarHeight;
        }
        break;
        
      case SquareSide.TOP:
        newX = prev.x - MICKEY_CONFIG.speed;
        
        if (newX < edgeDistance) {
          newSide = SquareSide.LEFT;
          sideSwitched = true;
          newX = edgeDistance;
        }
        break;
        
      case SquareSide.LEFT:
        newY = prev.y - MICKEY_CONFIG.speed;
        
        if (newY < edgeDistance) {
          newSide = SquareSide.BOTTOM;
          sideSwitched = true;
          newY = edgeDistance;
        }
        break;
    }
    
    if (sideSwitched) {
      squareSideRef.current = newSide;
      updateRotationBySide(newSide);
    }
    
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
  
  const moveLinear = (prev: { x: number, y: number }) => {
    if (!isMounted) return prev;
    
    const newX = prev.x + (MICKEY_CONFIG.speed * directionRef.current);
    const windowWidth = window.innerWidth;
    
    if (newX > windowWidth && !MICKEY_CONFIG.reverseOnEdge) {
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
        setRotation(0);
        setIsMoving(true);
      }, MICKEY_CONFIG.respawnDelay);
      
      return prev;
    } else if (newX > windowWidth && MICKEY_CONFIG.reverseOnEdge) {
      directionRef.current = -1;
      if (MICKEY_CONFIG.mirrorWhenReversed) {
        setIsReversed(!MICKEY_CONFIG.initiallyMirrored);
      }
      return { ...prev, x: windowWidth };
    } else if (newX < -MICKEY_CONFIG.size && !MICKEY_CONFIG.reverseOnEdge) {
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
        setRotation(0);
        setIsMoving(true);
      }, MICKEY_CONFIG.respawnDelay);
      
      return prev;
    } else if (newX < -MICKEY_CONFIG.size && MICKEY_CONFIG.reverseOnEdge) {
      directionRef.current = 1;
      if (MICKEY_CONFIG.mirrorWhenReversed) {
        setIsReversed(MICKEY_CONFIG.initiallyMirrored);
      }
      return { ...prev, x: -MICKEY_CONFIG.size };
    }
    
    let newY = 0;
    if (MICKEY_CONFIG.bounce) {
      bounceRef.current += 0.05;
      newY = Math.sin(bounceRef.current) * 15;
    }
    
    return { x: newX, y: newY };
  };
  
  useEffect(() => {
    if (!showMickey || !MICKEY_CONFIG.animate || !isMoving || !isMounted) return;
    
    directionRef.current = MICKEY_CONFIG.initialDirection;
    
    if (MICKEY_CONFIG.animationMode === 'linear') {
      if (MICKEY_CONFIG.mirrorWhenReversed) {
        setIsReversed(MICKEY_CONFIG.initialDirection === -1 ? true : MICKEY_CONFIG.initiallyMirrored);
      } else {
        setIsReversed(MICKEY_CONFIG.initiallyMirrored);
      }
    } else {
      updateRotationBySide(squareSideRef.current);
    }
    
    const animate = () => {
      setPosition(prev => {
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
  
  if (!showMickey || !isMounted) return null;
  
  if (!isMoving && MICKEY_CONFIG.animate && !MICKEY_CONFIG.reverseOnEdge) {
    return null;
  }

  const positionStyles = MICKEY_CONFIG.animationMode === 'square' 
    ? {
        bottom: 'auto',
        left: `${position.x}px`,
        top: `${windowHeight - position.y - MICKEY_CONFIG.size}px`,
      }
    : {
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