import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ChatBot } from './components/ChatBot'

import { Home } from './pages/Home'
import { About } from './pages/About'
import { Programs } from './pages/Programs'
import { ProgramDetail } from './pages/ProgramDetail'
import { Volunteer } from './pages/Volunteer'
import { Stories } from './pages/Stories'
import { StoryDetail } from './pages/StoryDetail'
import { Donate } from './pages/Donate'
import { Contact } from './pages/Contact'
import { Admin } from './pages/Admin'

export function App() {
  useEffect(() => {
    // Initialize EmailJS
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
  }, [])

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:id" element={<ProgramDetail />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:slug" element={<StoryDetail />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  )
}
