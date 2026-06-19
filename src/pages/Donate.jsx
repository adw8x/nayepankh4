import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const donationPlans = [
  { amount: 500, label: '₹500/month', description: 'Basic Support' },
  { amount: 1000, label: '₹1,000/month', description: 'Standard Support', popular: true },
  { amount: 2500, label: '₹2,500/month', description: 'Premium Support' },
]

const impactLevels = [
  { amount: 100, impact: '1 week of study material for 1 student' },
  { amount: 500, impact: 'Books for 1 student for 1 month' },
  { amount: 1000, impact: 'Digital training course for 1 child' },
  { amount: 2000, impact: 'Full month program enrollment' },
  { amount: 5000, impact: 'Complete quarter program for 1 student' },
  { amount: 10000, impact: 'Full semester support for 5 students' },
]

export function Donate() {
  const [sliderAmount, setSliderAmount] = useState(1000)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const currentImpact = useMemo(() => {
    const impact = impactLevels.find((level) => level.amount === sliderAmount)
    return impact?.impact || 'Your donation creates real impact'
  }, [sliderAmount])

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('nayepankh@upi')
    toast.success('UPI ID copied!')
  }

  const sampleDonors = [
    'Amit Kumar',
    'Priya Sharma',
    'Rajesh Patel',
    'Anisha Verma',
    'Vikram Singh',
    'Deepa Gupta',
    'Arjun Desai',
    'Neha Kapoor',
    'Sanjay Reddy',
    'Pooja Nair',
    'Rohit Malhotra',
    'Divya Chatterjee',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-r from-accent to-orange-600 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Make a Difference</h1>
          <p className="text-xl opacity-90">Every donation transforms lives. No amount is too small.</p>
        </div>
      </section>

      {/* Impact Calculator */}
      <section className="py-20 px-4 bg-light dark:bg-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-8">Impact Calculator</h2>

            <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-lg">
              <div className="mb-8">
                <motion.div
                  key={sliderAmount}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-bold text-accent mb-4"
                >
                  ₹{sliderAmount.toLocaleString()}
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Drag to adjust your donation amount</p>

                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={sliderAmount}
                  onChange={(e) => setSliderAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f57c00 0%, #f57c00 ${(sliderAmount / 10000) * 100}%, #e5e7eb ${(sliderAmount / 10000) * 100}%, #e5e7eb 100%)`,
                  }}
                />

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹100</span>
                  <span>₹10,000</span>
                </div>
              </div>

              <motion.div
                key={sliderAmount}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-accent/10 to-orange-600/10 border-l-4 border-accent p-6 rounded-lg mb-8"
              >
                <p className="text-lg font-semibold text-primary dark:text-white">{currentImpact}</p>
              </motion.div>

              <button className="w-full px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-lg">
                Donate Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monthly Plans */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-bold text-center text-primary dark:text-white mb-12">
            Monthly Support Plans
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {donationPlans.map((plan, idx) => (
              <motion.div
                key={plan.amount}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPlan(plan.amount)}
                className={`p-8 rounded-lg cursor-pointer transition-all ${
                  selectedPlan === plan.amount
                    ? 'bg-gradient-to-br from-accent to-orange-600 text-white shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="mb-4">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur text-sm font-bold rounded-full">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                <h3 className={`text-3xl font-bold mb-2 ${selectedPlan === plan.amount ? 'text-white' : 'text-accent'}`}>
                  {plan.label}
                </h3>
                <p className={`opacity-90 mb-6 ${selectedPlan === plan.amount ? 'text-white/90' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <button
                  className={`w-full px-6 py-2 rounded-lg font-bold transition-colors ${
                    selectedPlan === plan.amount
                      ? 'bg-white text-accent hover:bg-gray-100'
                      : 'bg-accent text-white hover:bg-orange-600'
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment & Tax Info */}
      <section className="py-20 px-4 bg-light dark:bg-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* UPI & Payment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Quick Payment</h3>

              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">UPI ID</p>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <code className="text-lg font-mono font-bold text-primary dark:text-white flex-1">nayepankh@upi</code>
                  <button
                    onClick={handleCopyUPI}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">QR Code Placeholder</p>
              </div>

              <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Bank Transfer</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm">
                  <p>
                    <strong>Account Name:</strong> NayePankh Foundation
                  </p>
                  <p>
                    <strong>Account Number:</strong> XXXX-XXXX-XXXX-5678
                  </p>
                  <p>
                    <strong>IFSC Code:</strong> SBIN0001234
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tax Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary p-8 rounded-lg"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Tax Benefits</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                NayePankh Foundation is registered under Section 80G of the Indian Income Tax Act. Your donations are eligible for income tax deduction.
              </p>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">80G Registration Number</p>
                <p className="font-bold text-primary dark:text-white">80G/2024/123456</p>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
                <Download size={20} />
                Download Receipt
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donors Wall */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl font-bold text-center text-primary dark:text-white mb-12">
            Our Generous Donors
          </motion.h2>

          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex gap-4"
            >
              {[...sampleDonors, ...sampleDonors].map((donor, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-md whitespace-nowrap"
                >
                  <p className="font-semibold text-primary dark:text-white">{donor}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Recent Donor</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-6">
            Ready to Make an Impact?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90 mb-8"
          >
            Join thousands of supporters empowering the next generation of leaders.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-lg"
          >
            Donate Now →
          </motion.button>
        </div>
      </section>
    </motion.div>
  )
}
