import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

export function StoryCard({ story, featured = false }) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="col-span-full bg-gradient-to-r from-primary to-blue-900 text-white rounded-lg overflow-hidden shadow-xl p-8 md:p-12"
      >
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur text-sm font-semibold rounded-full mb-4">
            Featured Story
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h2>
          <p className="text-lg mb-6 opacity-90">{story.excerpt}</p>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-sm opacity-80 mb-6">
            <p>By {story.author}</p>
            <p>{new Date(story.date).toLocaleDateString()}</p>
            <p className="flex items-center gap-1">
              <Clock size={16} /> {story.readTime}
            </p>
          </div>
          <Link
            to={`/stories/${story.slug}`}
            className="inline-flex items-center px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors gap-2"
          >
            Read Story <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="p-6">
        <div className="mb-3">
          <p className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
            {story.category}
          </p>
        </div>
        <h3 className="text-xl font-bold mb-2 text-primary dark:text-white line-clamp-2">
          {story.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
          {story.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>{story.author}</span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {story.readTime}
          </span>
        </div>
        <Link
          to={`/stories/${story.slug}`}
          className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all"
        >
          Read More
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </motion.div>
  )
}
