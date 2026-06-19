import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Linkedin, MessageCircle, Copy, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { StoryCard } from '../components/StoryCard'
import { stories } from '../lib/data'

export function StoryDetail() {
  const { slug } = useParams()
  const story = stories.find((s) => s.slug === slug)

  if (!story) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">Story Not Found</h1>
          <Link to="/stories" className="text-accent font-semibold hover:underline">
            ← Back to Stories
          </Link>
        </div>
      </motion.div>
    )
  }

  const relatedStories = stories
    .filter((s) => s.category === story.category && s.id !== story.id)
    .slice(0, 3)

  const handleShare = (platform) => {
    const url = window.location.href
    const title = story.title
    let shareUrl = ''

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        toast.success('Link copied!')
        return
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank')
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
      <div className="pt-24 px-4 max-w-4xl mx-auto mb-8">
        <Link to="/stories" className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all">
          <ArrowLeft size={20} />
          Back to Stories
        </Link>
      </div>

      {/* Hero Section */}
      <section
        className="py-12 px-4 mb-12"
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, ${story.category === 'Education' ? '#1565c0' : story.category === 'Digital' ? '#0277bd' : story.category === 'Career' ? '#2e7d32' : '#6a1b9a'} 100%)`,
          color: 'white',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="inline-block px-4 py-2 bg-white/20 backdrop-blur text-sm font-semibold rounded-full mb-4">
              {story.category}
            </p>
            <h1 className="text-5xl font-bold mb-6">{story.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-sm opacity-90 flex-wrap gap-3">
              <p>By {story.author}</p>
              <p>{new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="flex items-center gap-1">
                <Clock size={16} /> {story.readTime}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
          >
            {story.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Achievement Highlight */}
          {story.achievement && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-accent/10 border-l-4 border-accent p-6 rounded-lg mb-12"
            >
              <h3 className="font-bold text-accent mb-2">Achievement</h3>
              <p className="text-gray-700 dark:text-gray-300">{story.achievement}</p>
            </motion.div>
          )}

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-light dark:bg-gray-800 p-6 rounded-lg mb-12"
          >
            <h3 className="font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <Share2 size={20} />
              Share This Story
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={18} />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Copy size={18} />
                Copy Link
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="px-4 pb-20 bg-light dark:bg-dark">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold text-primary dark:text-white mb-8"
            >
              Related Stories
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStories.map((relStory, idx) => (
                <motion.div
                  key={relStory.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <StoryCard story={relStory} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  )
}
