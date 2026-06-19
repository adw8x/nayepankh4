import { z } from 'zod'

export const volunteerFormSchema = z.object({
  // Step 1
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  city: z.string().nonempty('Please select a city'),
  age: z.number().int().min(15, 'Must be at least 15 years old').max(100),
  gender: z.string().nonempty('Please select gender'),

  // Step 2
  programs: z.array(z.string()).min(1, 'Select at least one program'),
  days: z.array(z.string()).min(1, 'Select at least one day'),
  hours: z.number().min(2).max(20),
  mode: z.enum(['online', 'offline', 'both']),

  // Step 3
  occupation: z.string().nonempty('Please select occupation'),
  education: z.string().nonempty('Please select education level'),
  skills: z.array(z.string()),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  linkedin: z.string().url().optional().or(z.literal('')),

  // Step 4
  why_volunteer: z.string().min(50, 'Minimum 50 characters').max(500, 'Maximum 500 characters'),
  experience: z.string().optional(),
  heard_from: z.string().nonempty('Please select'),
  agreement: z.boolean().refine((val) => val === true, 'You must agree'),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  subject: z.string().nonempty('Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

export const programInterestSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone required'),
  city: z.string().nonempty('City required'),
})
