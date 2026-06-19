import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { programs, faqItems } from '../lib/data'

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! 👋 I\'m the NayePankh Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()

    if (message.includes('volunteer') || message.includes('join')) {
      return 'Great! We\'d love to have you join our team. You can fill out our volunteer application form by visiting our Volunteer page. It only takes 10 minutes!'
    }

    if (message.includes('program') || message.includes('course')) {
      const programList = programs.map((p) => `• ${p.title} (${p.category})`).join('\n')
      return `We offer 6 amazing programs:\n\n${programList}\n\nVisit our Programs page to learn more about each one!`
    }

    if (message.includes('donate') || message.includes('money') || message.includes('help')) {
      return 'Thank you for wanting to support us! You can donate as little as ₹100 to make a real impact. Visit our Donate page to see different contribution options and track the impact of your donation.'
    }

    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return 'You can reach us at contact@nayepankh.org or call +91-XXX-XXXX-XXXX. You can also fill out the contact form on our Contact page. We usually respond within 24 hours!'
    }

    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return 'NayePankh Foundation operates across 15 cities in India, with our headquarters in Mumbai. Check our Contact page for more location details!'
    }

    if (message.includes('about') || message.includes('who') || message.includes('nayepankh')) {
      return 'NayePankh Foundation is an NGO empowering underprivileged youth through education, mentorship, and skills training. We\'ve impacted over 10,000 youth across India. Visit our About page to learn more about our mission and impact!'
    }

    return 'I\'m not sure about that! Please visit our Contact page or email us at contact@nayepankh.org. Our team will be happy to help!'
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 600)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg hover:shadow-xl z-40"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col z-40 max-w-[calc(100vw-32px)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-primary text-white rounded-t-lg">
              <div>
                <p className="font-bold">NayePankh Assistant</p>
                <p className="text-xs opacity-90">🕊️ Always here to help</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-primary-dark rounded">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ delay: i * 0.1, duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                className="p-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
