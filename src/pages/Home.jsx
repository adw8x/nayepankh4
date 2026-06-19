import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { ProgramCard } from '../components/ProgramCard'
import { StoryCard } from '../components/StoryCard'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import { Modal } from '../components/Modal'
import { programs, stories, testimonials, partners } from '../lib/data'

export function Home() {
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-primary animate-gradient opacity-90"
          style={{
            backgroundSize: '200% 200%',
          }}
        />

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-6xl opacity-20"
        >
          ✈️
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 text-6xl opacity-20"
        >
          🕊️
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-white mb-4"
          >
            Giving Wings
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-accent italic mb-6"
          >
            to Dreams
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Empowering underprivileged youth through education, mentorship, and opportunity
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/volunteer"
              className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Volunteer Now
            </Link>
            <button
              onClick={() => setShowVideoModal(true)}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Watch Our Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter target={10000} label="Youth Empowered" suffix="+" />
          <AnimatedCounter target={50} label="Schools Reached" suffix="+" />
          <AnimatedCounter target={500} label="Active Volunteers" suffix="+" />
          <AnimatedCounter target={15} label="Cities Covered" suffix="+" />
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 px-4 bg-light dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-white">Our Programs</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Comprehensive initiatives designed to transform lives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {programs.slice(0, 3).map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/programs"
              className="inline-flex items-center px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* Stories Preview */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-white">Impact Stories</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Real stories of transformation and hope
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stories.slice(0, 3).map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
              >
                <StoryCard story={story} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/stories"
              className="inline-flex items-center px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Read All Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h3 className="text-center text-gray-600 dark:text-gray-400 font-semibold">Our Partners</h3>
        </div>
        <div className="flex gap-12 animate-marquee">
          {[...partners, ...partners].map((partner, idx) => (
            <div key={`${partner}-${idx}`} className="flex-shrink-0 text-2xl font-bold text-gray-400 dark:text-gray-600 whitespace-nowrap">
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary dark:text-white">What People Say</h2>
          </motion.div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Volunteer CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-primary to-blue-900 text-white p-12 rounded-lg shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-4">Become a Volunteer</h3>
            <p className="text-lg mb-6 opacity-90">
              Join our community of changemakers and make a direct impact on young lives.
            </p>
            <Link to="/volunteer" className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Join Our Team
            </Link>
          </motion.div>

          {/* Donate CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8 }}
            className="bg-gradient-to-br from-accent to-orange-600 text-white p-12 rounded-lg shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-4">Make a Donation</h3>
            <p className="text-lg mb-6 opacity-90">
              Every rupee counts. Support our mission to empower the next generation.
            </p>
            <Link to="/donate" className="inline-block px-8 py-3 bg-white text-accent font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Donate Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} title="Our Story">
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="NayePankh Foundation Story"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      </Modal>
    </motion.div>
  )
}