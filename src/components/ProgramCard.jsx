import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function ProgramCard({ program }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div
        className="h-2"
        style={{ backgroundColor: program.color }}
      />
      <div className="p-6">
        <div className="text-4xl mb-3">{program.icon}</div>
        <h3 className="text-xl font-bold mb-2 text-primary dark:text-white">
          {program.title}
        </h3>
        <p className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full mb-3">
          {program.category}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          {program.description}
        </p>
        <div className="space-y-2 mb-4 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Eligibility:</span> {program.eligibility}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Impact:</span> {program.impact}
          </p>
        </div>
        <Link
          to={`/programs/${program.id}`}
          className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all"
        >
          Learn More
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </motion.div>
  )
}
