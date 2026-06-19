import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import toast from 'react-hot-toast'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsSubscribing(true)
    if (email) {
      localStorage.setItem('subscribedEmail', email)
      toast.success('Thank you for subscribing!')
      setEmail('')
    }
    setIsSubscribing(false)
  }

  const footerLinks = {
    explore: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Stories', href: '/stories' },
      { label: 'Contact', href: '/contact' },
    ],
    programs: [
      { label: 'Academic Support', href: '/programs' },
      { label: 'Digital Literacy', href: '/programs' },
      { label: 'Career Mentorship', href: '/programs' },
      { label: 'Creative Arts', href: '/programs' },
    ],
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🕊️</span>
              <div>
                <div className="font-bold text-lg">NayePankh</div>
                <div className="text-accent font-semibold text-sm">Foundation</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Empowering underprivileged youth with education, skills, and opportunities.</p>
          </motion.div>

          {/* Explore Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="font-bold mb-4 text-accent">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="font-bold mb-4 text-accent">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stay Connected */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-bold mb-4 text-accent">Stay Connected</h3>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-l-lg text-black focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-3 py-2 bg-accent text-white text-sm font-medium rounded-r-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isSubscribing ? '...' : '→'}
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, color: '#f57c00' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-accent transition-colors"
                    title={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2024 NayePankh Foundation. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
