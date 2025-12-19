'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Banner {
  id: string
  title: string | null
  subtitle: string | null
  imageUrl: string
  mobileImageUrl: string | null
  link: string | null
  linkText: string | null
}

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)

  if (!banners.length) return <div className="h-screen bg-gray-100" />

  return (
    <div className="relative w-full overflow-hidden bg-black h-[70vh] md:h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={banners[current].imageUrl}
              alt={banners[current].title || "Banner"}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile Image - Use PC image scaled if no mobile image, or mobile image if provided */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src={banners[current].mobileImageUrl || banners[current].imageUrl}
              alt={banners[current].title || "Banner"}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-10">
        <div className="space-y-4 md:space-y-6 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-8xl font-serif tracking-[0.15em] drop-shadow-lg"
            >
              {banners[current].title}
            </motion.h1>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xs md:text-lg uppercase tracking-[0.3em] font-light drop-shadow-md"
            >
              {banners[current].subtitle}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`btn-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 md:pt-8"
            >
              <Link
                href={banners[current].link || "/products"}
                className="inline-block px-8 py-3 md:px-12 md:py-4 border border-white text-white text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
              >
                {banners[current].linkText || "Discover"}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      {banners.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 p-2"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 p-2"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === idx ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
