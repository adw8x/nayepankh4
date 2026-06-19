import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useIntersection } from '../hooks/useIntersection'
import { useCountUp } from '../hooks/useCountUp'

export function AnimatedCounter({ target, label, suffix = '' }) {
  const ref = useRef(null)
  const isVisible = useIntersection(ref)
  const count = useCountUp(isVisible ? target : 0, 2000)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300">{label}</p>
    </motion.div>
  )
}
