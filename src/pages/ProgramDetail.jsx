import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { programInterestSchema } from '../utils/validators'
import { programs, indianCities } from '../lib/data'
import { supabase } from '../lib/supabaseClient'

export function ProgramDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const program = programs.find((p) => p.id === id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(programInterestSchema),
  })

  if (!program) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">Program Not Found</h1>
          <Link to="/programs" className="text-accent font-semibold hover:underline">
            ← Back to Programs
          </Link>
        </div>
      </motion.div>
    )
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('program_interest').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        program_id: program.id,
        created_at: new Date(),
      })

      if (error) throw error

      toast.success('Thank you! We will contact you soon.')
      reset()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <div className="pt-24 px-4 max-w-6xl mx-auto mb-8">
        <Link
          to="/programs"
          className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all"
        >
          <ArrowLeft size={20} />
          Back to Programs
        </Link>
      </div>

      {/* Hero */}
      <section
        className="h-64 rounded-lg mb-12 px-4 flex items-end"
        style={{ backgroundColor: program.color }}
      >
        <div className="max-w-6xl mx-auto w-full pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-5xl mb-4">{program.icon}</div>
            <h1 className="text-5xl font-bold text-white mb-2">{program.title}</h1>
            <p className="text-white/90 text-lg">{program.category}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Program Overview</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{program.fullDescription}</p>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Eligibility</p>
                  <p className="text-xl font-bold text-primary dark:text-white">{program.eligibility}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Duration</p>
                  <p className="text-xl font-bold text-primary dark:text-white">{program.duration}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Impact</p>
                  <p className="text-xl font-bold text-accent">{program.impact}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Category</p>
                  <p className="text-xl font-bold text-primary dark:text-white">{program.category}</p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-light dark:bg-gray-800 p-8 rounded-lg mb-12">
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">What You'll Gain</h3>
                <ul className="space-y-3">
                  {[
                    'Expert mentorship and personalized guidance',
                    'Hands-on practical experience',
                    'Certificate upon completion',
                    'Networking opportunities',
                    'Career advancement support',
                    'Community of lifelong learners',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle size={20} className="text-accent flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg h-fit sticky top-28"
          >
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Register Your Interest</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="10-digit number"
                  className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  City
                </label>
                <select
                  {...register('city')}
                  className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select City</option>
                  {indianCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Register Interest'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
