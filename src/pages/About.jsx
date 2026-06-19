import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useIntersection } from '../hooks/useIntersection'
import { milestones, team } from '../lib/data'

export function About() {
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
          <h1 className="text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-xl opacity-90">Building a brighter future, one youth at a time</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary to-blue-900 text-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg opacity-90">
              To empower underprivileged youth through quality education, mentorship, and skill development, enabling them to become confident, capable, and compassionate leaders in their communities.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-accent to-orange-600 text-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg opacity-90">
              A world where every young person, regardless of socio-economic background, has access to quality education and opportunities to realize their full potential.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-12 text-center text-primary dark:text-white">
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '❤️', title: 'Compassion', desc: 'We deeply care for every individual we serve' },
              { icon: '🎓', title: 'Excellence', desc: 'We strive for the highest quality in all programs' },
              { icon: '🤝', title: 'Accountability', desc: 'We are transparent and responsible to our community' },
              { icon: '💡', title: 'Innovation', desc: 'We constantly seek better ways to serve' },
              { icon: '🌍', title: 'Inclusion', desc: 'We welcome and celebrate diversity' },
              { icon: '🚀', title: 'Empowerment', desc: 'We believe in the potential of every youth' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-light dark:bg-dark">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-12 text-center text-primary dark:text-white">
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-accent" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                      <p className="text-2xl font-bold text-accent mb-2">{milestone.year}</p>
                      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-accent border-4 border-white dark:border-gray-800" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-bold mb-12 text-center text-primary dark:text-white">
            Our Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, idx) => (
              <TeamCard key={member.id} member={member} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

function TeamCard({ member, delay }) {
  const [isFlipped, setIsFlipped] = React.useState(false)
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="h-64 cursor-pointer perspective"
      style={{
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s',
      }}
    >
      {/* Front */}
      <div
        className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg p-8 flex flex-col items-center justify-center text-center"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-4">
          {member.initials}
        </div>
        <h3 className="text-xl font-bold text-primary dark:text-white">{member.name}</h3>
        <p className="text-accent font-semibold mt-2">{member.role}</p>
      </div>

      {/* Back */}
      <div
        className="w-full h-full bg-accent text-white rounded-lg p-8 flex flex-col justify-between"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <p className="text-sm">{member.bio}</p>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold hover:underline mt-4"
        >
          LinkedIn →
        </a>
      </div>
    </motion.div>
  )
}
