"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { createPortal } from "react-dom"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    title: string
  }[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeGallery = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  useEffect(() => {
    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === "Escape") closeGallery();
        if (e.key === "ArrowRight" && !isAnimating) {
          setIsAnimating(true);
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
          setTimeout(() => setIsAnimating(false), 300);
        }
        if (e.key === "ArrowLeft" && !isAnimating) {
          setIsAnimating(true);
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
          setTimeout(() => setIsAnimating(false), 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownEvent);
    return () => window.removeEventListener("keydown", handleKeyDownEvent);
  }, [isOpen, isAnimating, images.length]);

  const Modal = () => {
    return (
      <div 
        className="fixed inset-0 w-screen h-screen bg-black/90 flex items-center justify-center"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={closeGallery}
      >
        <button
          className="absolute top-4 right-4 text-white bg-black/20 p-2 rounded-full hover:bg-black/40 transition-colors"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10000
          }}
          onClick={(e) => {
            e.stopPropagation();
            closeGallery();
          }}
        >
          <X className="h-6 w-6" />
        </button>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/20 p-2 rounded-full hover:bg-black/40 transition-colors"
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10000
          }}
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/20 p-2 rounded-full hover:bg-black/40 transition-colors"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10000
          }}
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div 
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              objectFit: 'contain'
            }}
          />
        </div>

        <div 
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: 0,
            right: 0,
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '500px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            zIndex: 10000
          }}
        >
          <p className="font-bold">{images[currentIndex].title}</p>
        </div>

        <div 
          style={{
            position: 'absolute',
            bottom: '4rem',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            zIndex: 10000
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
              aria-label={`Перейти к изображению ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.slice(0, 2).map((image, index) => (
            <div
              key={index}
              className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]"
              onClick={() => openGallery(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={400}
                height={533}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 text-white w-full">
                  <p className="font-bold text-center">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length > 2 && (
          <div
            className="aspect-[16/9] relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] mx-auto max-w-2xl"
            onClick={() => openGallery(2)}
          >
            <Image
              src={images[2].src || "/placeholder.svg"}
              alt={images[2].alt}
              width={800}
              height={450}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
              <div className="p-4 text-white w-full">
                <p className="font-bold text-center">{images[2].title}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => openGallery(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Открыть изображение ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {mounted && isOpen && createPortal(<Modal />, document.body)}
    </>
  )
}

export default ImageGallery

