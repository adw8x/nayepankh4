import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Clock, ChevronDown, Check } from 'lucide-react'
import { contactFormSchema } from '../utils/validators'
import { sendContactForm } from '../lib/emailjs'

const faqItems = [
  {
    question: 'What is NayePankh Foundation?',
    answer: 'NayePankh Foundation is an Indian NGO dedicated to empowering underprivileged youth through education, mentorship, skills training, and career guidance.',
  },
  {
    question: 'How can I volunteer?',
    answer: 'You can apply through our Volunteer page. We welcome passionate individuals from all backgrounds who want to make a difference.',
  },
  {
    question: 'Where are you located?',
    answer: 'We operate across 15 cities in India with our headquarters in Mumbai. Check our About page for complete location details.',
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes! We are registered under Section 80G of the Indian Income Tax Act. All donations are eligible for tax deduction.',
  },
  {
    question: 'How can I stay updated?',
    answer: 'Subscribe to our newsletter in the footer, follow us on social media, or contact us directly at contact@nayepankh.org.',
  },
]

export function Contact() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await sendContactForm(data.name, data.email, data.phone, data.subject, data.message)
      toast.success('Message sent successfully!')
      reset()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message. Please try again.')
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
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-r from-primary to-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl opacity-90">Have questions? We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary peer"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary peer"
                  />
                  {!errors.email && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                  )}
                </div>
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

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  {...register('subject')}
                  className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Subject</option>
                  <option value="Volunteer Inquiry">Volunteer Inquiry</option>
                  <option value="Program Question">Program Question</option>
                  <option value="Donation Support">Donation Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  placeholder="Your message"
                  rows="5"
                  className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-8">Contact Information</h2>

            <div className="space-y-6 mb-8">
              {/* Address */}
              <motion.div whileHover={{ x: 8 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <MapPin className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      NayePankh Foundation<br />
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.button
                whileHover={{ x: 8 }}
                onClick={() => {
                  navigator.clipboard.writeText('contact@nayepankh.org')
                  toast.success('Email copied!')
                }}
                className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Mail className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">contact@nayepankh.org</p>
                  </div>
                </div>
              </motion.button>

              {/* Phone */}
              <motion.div whileHover={{ x: 8 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <Phone className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+91 XXXX-XXXX-XXXX</p>
                  </div>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div whileHover={{ x: 8 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <Clock className="text-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white mb-1">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monday - Friday: 9 AM - 6 PM<br />
                      Saturday: 10 AM - 4 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.5555555555555!2d72.8479!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8b8b8b8b8b9%3A0x8b8b8b8b8b8b8b8b!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-light dark:bg-dark">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center text-primary dark:text-white mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left flex items-center justify-between"
                >
                  <h3 className="font-bold text-primary dark:text-white">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-accent" size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <p className="p-6 text-gray-700 dark:text-gray-300">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
