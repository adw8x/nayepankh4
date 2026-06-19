import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function TestimonialCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
  }

  const testimonial = testimonials[current]

  return (
    <div className="relative h-64 flex items-center justify-center">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full text-center"
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.text}"</p>
          <p className="font-bold text-primary dark:text-white">{testimonial.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-0 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-0 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1)
              setCurrent(idx)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === current ? 'bg-accent' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
