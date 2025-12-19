'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:p-8 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b border-gray-100/50">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-900 p-1"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Left Links */}
        <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-medium text-gray-900">
          <Link href="/products" className="hover:text-gray-600 transition-colors">Collection</Link>
          <Link href="/about" className="hover:text-gray-600 transition-colors">Brand</Link>
        </div>
        
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-serif font-bold tracking-widest absolute left-1/2 -translate-x-1/2 text-black">
          BONBURL
        </Link>
        
        {/* Desktop Right Links */}
        <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-medium text-gray-900">
           <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
        </div>

        {/* Mobile Right Link */}
        <Link href="/contact" className="md:hidden text-xs uppercase tracking-widest font-medium text-gray-900 p-1">
          Contact
        </Link>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <button 
              className="absolute top-5 left-6 text-gray-900 p-1"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-bold tracking-widest mb-8">
              BONBURL
            </Link>

            <Link href="/products" onClick={() => setIsOpen(false)} className="text-lg uppercase tracking-widest font-medium text-gray-900">
              Collection
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg uppercase tracking-widest font-medium text-gray-900">
              Brand
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg uppercase tracking-widest font-medium text-gray-900">
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
