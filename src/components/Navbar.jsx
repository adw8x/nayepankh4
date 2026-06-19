import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const totalScroll = documentHeight - windowHeight
      const progress = (scrollTop / totalScroll) * 100
      setScrollProgress(progress)
      setScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/programs', label: 'Programs' },
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/stories', label: 'Stories' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-accent z-50" style={{ width: `${scrollProgress}%` }} />

      {/* Navbar */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-dark/80 shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 font-bold text-lg md:text-xl">
              <span className="text-2xl">🕊️</span>
              <span className="text-primary">NayePankh</span>
              <span className="text-accent">Foundation</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-accent' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      layoutId="underline"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link
                to="/donate"
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Donate Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={`block text-lg font-medium py-2 ${
                      isActive(link.href)
                        ? 'text-accent'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  to="/donate"
                  className="block w-full mt-4 px-6 py-3 bg-accent text-white text-center rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Donate Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  )
}
