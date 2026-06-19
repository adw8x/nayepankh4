import React, { useReducer, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { programs, indianCities, occupations, educationLevels, languages } from '../lib/data'
import { volunteerFormSchema } from '../utils/validators'
import { supabase } from '../lib/supabaseClient'
import { sendVolunteerWelcome, sendAdminNotification } from '../lib/emailjs'
import { ChevronRight, ChevronLeft, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const STEPS = [
  { number: 1, title: 'Personal Info' },
  { number: 2, title: 'Availability' },
  { number: 3, title: 'Background' },
  { number: 4, title: 'Your Story' },
]

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_STEP':
      return { ...state, ...action.payload }
    case 'RESET':
      return {
        fullName: '',
        email: '',
        phone: '',
        city: '',
        age: '',
        gender: '',
        programs: [],
        days: [],
        hours: 10,
        mode: '',
        occupation: '',
        education: '',
        skills: [],
        languages: [],
        linkedin: '',
        why_volunteer: '',
        experience: '',
        heard_from: '',
        agreement: false,
      }
    default:
      return state
  }
}

export function Volunteer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [skillInput, setSkillInput] = useState('')
  const [formData, formDispatch] = useReducer(formReducer, {
    fullName: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    gender: '',
    programs: [],
    days: [],
    hours: 10,
    mode: '',
    occupation: '',
    education: '',
    skills: [],
    languages: [],
    linkedin: '',
    why_volunteer: '',
    experience: '',
    heard_from: '',
    agreement: false,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm({
    resolver: zodResolver(volunteerFormSchema),
    mode: 'onBlur',
    defaultValues: formData,
  })

  const why_volunteer_value = watch('why_volunteer', '')
  const character_count = why_volunteer_value.length

  const validateStep = async () => {
    const stepFields = {
      1: ['fullName', 'email', 'phone', 'city', 'age', 'gender'],
      2: ['programs', 'days', 'hours', 'mode'],
      3: ['occupation', 'education', 'skills', 'languages'],
      4: ['why_volunteer', 'agreement'],
    }

    const isValid = await trigger(stepFields[currentStep])
    if (!isValid) {
      toast.error('Please fill all required fields correctly')
      return false
    }
    return true
  }

  const handleNext = async () => {
    if (await validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data) => {
    if (!data.agreement) {
      toast.error('Please accept the agreement')
      return
    }

    setIsSubmitting(true)
    try {
      // Save to Supabase
      const { error } = await supabase.from('volunteers').insert({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        age: data.age,
        gender: data.gender,
        programs: JSON.stringify(data.programs),
        days: JSON.stringify(data.days),
        hours: data.hours,
        mode: data.mode,
        occupation: data.occupation,
        education: data.education,
        skills: JSON.stringify(data.skills),
        languages: JSON.stringify(data.languages),
        linkedin: data.linkedin || '',
        why_volunteer: data.why_volunteer,
        experience: data.experience || '',
        heard_from: data.heard_from,
        status: 'pending',
        created_at: new Date(),
      })

      if (error) throw error

      // Send emails
      await sendVolunteerWelcome(data.fullName, data.email, data.programs)
      await sendAdminNotification({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        programs: data.programs,
      })

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setSuccessData({
        name: data.fullName,
        programs: data.programs,
      })
      toast.success('Application submitted successfully!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (successData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="text-6xl mb-6">
            🎉
          </motion.div>
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-4">
            Welcome to the Family, {successData.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for volunteering! We will contact you within 2-3 business days.
          </p>
          <div className="bg-light dark:bg-gray-700 p-4 rounded-lg mb-6">
            <p className="font-semibold text-primary dark:text-white mb-2">Selected Programs:</p>
            <ul className="text-sm text-gray-700 dark:text-gray-300">
              {successData.programs.map((id) => {
                const prog = programs.find((p) => p.id === id)
                return <li key={id}>• {prog?.title}</li>
              })}
            </ul>
          </div>
          <div className="space-y-3">
            <a
              href={`https://wa.me/?text=I%20just%20volunteered%20with%20NayePankh%20Foundation!%20Join%20me%20in%20making%20a%20difference.%20%F0%9F%95%8A`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Share on WhatsApp
            </a>
            <Link
              to="/"
              className="block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-2xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step, idx) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep > step.number
                      ? 'bg-accent text-white'
                      : currentStep === step.number
                        ? 'bg-primary text-white border-2 border-accent'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                  animate={currentStep === step.number ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {currentStep > step.number ? <Check size={20} /> : step.number}
                </motion.div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-colors ${
                      currentStep > step.number ? 'bg-accent' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary dark:text-white">
              {STEPS[currentStep - 1].title}
            </h2>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1 register={register} errors={errors} />
            )}
            {currentStep === 2 && (
              <Step2 register={register} control={control} errors={errors} formData={formData} formDispatch={formDispatch} setValue={setValue} />
            )}
            {currentStep === 3 && (
              <Step3
                register={register}
                control={control}
                errors={errors}
                formData={formData}
                formDispatch={formDispatch}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                setValue={setValue}
              />
            )}
            {currentStep === 4 && (
              <Step4
                register={register}
                errors={errors}
                watch={watch}
                character_count={character_count}
              />
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex-1" />

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  )
}

// Step Components
function Step1({ register, errors }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Full Name *</label>
        <input {...register('fullName')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Email *</label>
        <input type="email" {...register('email')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Phone *</label>
        <input {...register('phone')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">City *</label>
        <select {...register('city')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="">Select City</option>
          {indianCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Age *</label>
        <input type="number" {...register('age', { valueAsNumber: true })} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Gender *</label>
        <select {...register('gender')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
      </div>
    </motion.div>
  )
}

function Step2({ register, control, errors, formData, formDispatch, setValue }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const toggleProgram = (programId) => {
    const programs = formData.programs.includes(programId)
      ? formData.programs.filter((p) => p !== programId)
      : [...formData.programs, programId]
    formDispatch({ type: 'UPDATE_STEP', payload: { programs } })
    setValue('programs', programs, { shouldValidate: true })
  }

  const toggleDay = (day) => {
    const newDays = formData.days.includes(day)
      ? formData.days.filter((d) => d !== day)
      : [...formData.days, day]
    formDispatch({ type: 'UPDATE_STEP', payload: { days: newDays } })
    setValue('days', newDays, { shouldValidate: true })
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-4">Select Programs *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {programs.map((prog) => (
            <motion.button
              key={prog.id}
              type="button"
              onClick={() => toggleProgram(prog.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border-2 rounded-lg transition-colors ${
                formData.programs.includes(prog.id)
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                {formData.programs.includes(prog.id) && <Check size={20} className="text-primary" />}
                <div className="text-left">
                  <p className="font-semibold">{prog.icon} {prog.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{prog.category}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        {errors.programs && <p className="text-red-500 text-xs mt-1">{errors.programs.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">Available Days *</label>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                formData.days.includes(day)
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        {errors.days && <p className="text-red-500 text-xs mt-1">{errors.days.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">Hours per Week: {formData.hours}h *</label>
        <input
          type="range"
          min="2"
          max="20"
          value={formData.hours}
          onChange={(e) => formDispatch({ type: 'UPDATE_STEP', payload: { hours: Number(e.target.value) } })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">Mode *</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['online', 'offline', 'both'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                formDispatch({ type: 'UPDATE_STEP', payload: { mode } })
                setValue('mode', mode, { shouldValidate: true })
              }}
              className={`p-4 border-2 rounded-lg transition-colors ${
                formData.mode === mode ? 'border-primary bg-primary/10' : 'border-gray-300'
              }`}
            >
              {mode === 'online' && '💻'} {mode === 'offline' && '🏢'} {mode === 'both' && '🔄'} {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        {errors.mode && <p className="text-red-500 text-xs mt-1">{errors.mode.message}</p>}
      </div>
    </motion.div>
  )
}

function Step3({ register, control, errors, formData, formDispatch, skillInput, setSkillInput, setValue }) {
  const addSkill = () => {
    if (skillInput.trim()) {
      const skills = [...formData.skills, skillInput.trim()]
      formDispatch({ type: 'UPDATE_STEP', payload: { skills } })
      setSkillInput('')
    }
  }

  const removeSkill = (idx) => {
    const skills = formData.skills.filter((_, i) => i !== idx)
    formDispatch({ type: 'UPDATE_STEP', payload: { skills } })
  }

  const toggleLanguage = (lang) => {
    const newLangs = formData.languages.includes(lang)
      ? formData.languages.filter((l) => l !== lang)
      : [...formData.languages, lang]
    formDispatch({ type: 'UPDATE_STEP', payload: { languages: newLangs } })
    setValue('languages', newLangs, { shouldValidate: true })
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Occupation *</label>
        <select {...register('occupation')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="">Select Occupation</option>
          {occupations.map((occ) => (
            <option key={occ} value={occ}>
              {occ}
            </option>
          ))}
        </select>
        {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Education Level *</label>
        <select {...register('education')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="">Select Education</option>
          {educationLevels.map((edu) => (
            <option key={edu} value={edu}>
              {edu}
            </option>
          ))}
        </select>
        {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Skills (Press Enter or comma)</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault()
                addSkill()
              }
            }}
            placeholder="Add a skill"
            className="flex-1 px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button type="button" onClick={addSkill} className="px-4 py-2 bg-primary text-white rounded-lg">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, idx) => (
            <div key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 text-sm">
              {skill}
              <button type="button" onClick={() => removeSkill(idx)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">Languages Known *</label>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.languages.includes(lang)}
                onChange={() => toggleLanguage(lang)}
                className="w-4 h-4"
              />
              <span className="text-sm">{lang}</span>
            </label>
          ))}
        </div>
        {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">LinkedIn URL (Optional)</label>
        <input type="url" {...register('linkedin')} placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
        {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin.message}</p>}
      </div>
    </motion.div>
  )
}

function Step4({ register, errors, watch, character_count }) {
  const heard_from_options = ['Friend', 'Social Media', 'Website', 'School', 'Event', 'Other']

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Why do you want to volunteer? *</label>
        <textarea
          {...register('why_volunteer')}
          placeholder="Tell us your motivation (50-500 characters)"
          className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none min-h-24"
        />
        <div className={`text-xs mt-1 ${character_count < 50 ? 'text-red-500' : character_count > 500 ? 'text-red-500' : 'text-green-500'}`}>
          {character_count} / 500 characters
        </div>
        {errors.why_volunteer && <p className="text-red-500 text-xs mt-1">{errors.why_volunteer.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Past Experience (Optional)</label>
        <textarea {...register('experience')} placeholder="Share any relevant experience" className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none min-h-24" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">How did you hear about us? *</label>
        <select {...register('heard_from')} className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="">Select Option</option>
          {heard_from_options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.heard_from && <p className="text-red-500 text-xs mt-1">{errors.heard_from.message}</p>}
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register('agreement')} className="w-4 h-4" />
          <span className="text-sm">
            I agree to the terms and conditions and understand the commitment required. *
          </span>
        </label>
        {errors.agreement && <p className="text-red-500 text-xs mt-1">{errors.agreement.message}</p>}
      </div>
    </motion.div>
  )
}