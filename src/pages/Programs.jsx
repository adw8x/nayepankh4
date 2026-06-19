import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { ProgramCard } from '../components/ProgramCard'
import { programs } from '../lib/data'

export function Programs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('q') || '')
  const [debounceTimer, setDebounceTimer] = useState(null)

  const selectedCategory = searchParams.get('category') || 'all'

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)

    clearTimeout(debounceTimer)
    const timer = setTimeout(() => {
      setSearchParams({ category: selectedCategory, q: value })
    }, 300)
    setDebounceTimer(timer)
  }

  const handleCategoryChange = (category) => {
    setSearchParams({ category: category !== 'all' ? category : 'all', q: searchText })
  }

  const categories = ['all', ...new Set(programs.map((p) => p.category))]

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchCategory = selectedCategory === 'all' || program.category === selectedCategory
      const matchSearch =
        searchText === '' ||
        program.title.toLowerCase().includes(searchText.toLowerCase()) ||
        program.description.toLowerCase().includes(searchText.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchText])

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
          <h1 className="text-5xl font-bold mb-4">Our Programs</h1>
          <p className="text-xl opacity-90">Transform lives through education and opportunity</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white dark:bg-gray-800 shadow-md py-4 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchText}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === (category === 'all' ? 'all' : category)
                    ? 'bg-accent text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredPrograms.length} of {programs.length} programs
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program, idx) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProgramCard program={program} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No programs match your search. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  )
}
