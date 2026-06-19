import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { StoryCard } from '../components/StoryCard'
import { stories } from '../lib/data'

export function Stories() {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(stories.map((s) => s.category))]

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchCategory = selectedCategory === 'all' || story.category === selectedCategory
      const matchSearch =
        searchText === '' ||
        story.title.toLowerCase().includes(searchText.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchText.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

  const featuredStory = filteredStories[0]
  const otherStories = filteredStories.slice(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-r from-primary to-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Impact Stories</h1>
          <p className="text-xl opacity-90">Real stories of transformation and hope</p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 px-4 bg-light dark:bg-dark">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <StoryCard story={featuredStory} featured={true} />
          </div>
        </section>
      )}

      {/* Other Stories Grid */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {otherStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStories.map((story, idx) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <StoryCard story={story} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No stories match your search. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  )
}
