# 🕊️ NayePankh Foundation — Web Platform

A modern, production-ready web application for NayePankh Foundation, empowering underprivileged youth through education, mentorship, and opportunity.

## 📋 Tech Stack

[![React 18](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-teal?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?logo=framer)](https://www.framer.com/motion)
[![Supabase](https://img.shields.io/badge/Supabase-2-green?logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

## ✨ Features

### Pages
- **Home**: Hero with animated gradient, stats counters, program preview, testimonials, CTA
- **About**: Mission/vision, values cards, team with 3D flip effect, timeline
- **Programs**: Search & filter, 6 programs grid, detail pages with registration
- **Volunteer**: 4-step multi-form (personal → availability → background → story)
- **Stories**: Featured story, searchable story grid with sharing
- **Donate**: Impact calculator, monthly plans, payment options, tax benefits
- **Contact**: Contact form with floating labels, FAQ accordion, map embed
- **Admin**: Password-protected dashboard, volunteer management, CSV export, analytics

### Components
- **Navbar**: Sticky with scroll progress bar, dark mode toggle, mobile drawer
- **Footer**: 4-column grid, newsletter subscription, social links
- **ChatBot**: AI assistant with keyword matching
- **Animations**: Page transitions, scroll reveals, stagger grids, confetti on success

### Integrations
- **Supabase**: PostgreSQL database for volunteers, contacts, program interests
- **EmailJS**: Automated volunteer welcome, contact confirmation, admin notifications
- **Canvas Confetti**: Celebration animation on volunteer form submission
- **Recharts**: Analytics dashboard with bar charts

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/nayepankh4.git
cd nayepankh4

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Fill in your credentials in .env
```

### Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
VITE_EMAILJS_VOLUNTEER_TEMPLATE_ID=template-id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template-id
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template-id
VITE_ADMIN_PASSWORD=nayepankh2024
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🗄️ Database Setup

### Supabase Tables

Create these tables in your Supabase dashboard:

```sql
-- Volunteers table
CREATE TABLE volunteers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  age INT,
  gender TEXT,
  programs TEXT,
  days TEXT,
  hours INT,
  mode TEXT,
  occupation TEXT,
  education TEXT,
  skills TEXT,
  languages TEXT,
  linkedin TEXT,
  why_volunteer TEXT,
  experience TEXT,
  heard_from TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Program interest table
CREATE TABLE program_interest (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  program_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📧 EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create three email templates:
   - **Volunteer Welcome**: `{{volunteer_name}}`, `{{programs_selected}}`
   - **Contact Confirmation**: `{{from_name}}`, `{{message}}`
   - **Admin Notification**: `{{volunteer_name}}`, `{{volunteer_email}}`
3. Add template IDs to `.env`

## 🎨 Branding

- **Primary**: `#1a237e` (Deep Blue)
- **Accent**: `#f57c00` (Orange)
- **Success**: `#16a34a` (Green)
- **Dark**: `#0f172a`
- **Light**: `#f8fafc`
- **Logo**: 🕊️ NayePankh (blue bold) Foundation (orange)

## 📁 Project Structure

```
src/
├── App.jsx                    # Main app with routing
├── main.jsx                   # Entry point
├── index.css                  # Global styles
├── components/                # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ChatBot.jsx
│   ├── Modal.jsx
│   ├── ProgramCard.jsx
│   ├── StoryCard.jsx
│   ├── TestimonialCarousel.jsx
│   └── AnimatedCounter.jsx
├── pages/                     # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Programs.jsx
│   ├── ProgramDetail.jsx
│   ├── Volunteer.jsx
│   ├── Stories.jsx
│   ├── StoryDetail.jsx
│   ├── Donate.jsx
│   ├── Contact.jsx
│   └── Admin.jsx
├── hooks/                     # Custom hooks
│   ├── useCountUp.js
│   └── useIntersection.js
├── lib/                       # Utilities & integrations
│   ├── supabaseClient.js
│   ├── emailjs.js
│   └── data.js
└── utils/
    └── validators.js         # Zod schemas
```

## 🚀 Deployment

### Vercel

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

The `vercel.json` handles React Router rewrites automatically.

## 📊 Features Breakdown

### Volunteer Form (Multi-Step)
- **Step 1**: Personal info (name, email, phone, city, age, gender)
- **Step 2**: Availability (select programs, days, hours, mode)
- **Step 3**: Background (occupation, education, skills chips, languages, LinkedIn)
- **Step 4**: Story (motivation 50-500 chars, past experience, how heard about us)
- Success: Confetti + WhatsApp share + email confirmation

### Admin Dashboard
- Password protected (sessionStorage auth)
- Live stats (total, this week, pending, active)
- Volunteer table with search, sort, actions
- Individual volunteer details modal
- CSV export
- City distribution chart

### Contact Form
- React Hook Form + Zod validation
- Floating label animations
- Real-time validation checkmarks
- EmailJS integration
- 5-item FAQ accordion

## 🔐 Security

- Admin password in environment variables
- SessionStorage for admin auth (clear on logout)
- Email validation with Zod schemas
- No sensitive data in client code

## 📈 Performance

- Code splitting via React Router
- Image optimization ready
- Tailwind CSS minified
- Production build size: ~150KB (gzipped)

## 🎓 Learning Resources

### What AI Got Right
- Component structure and reusability
- State management with hooks
- Framer Motion animations
- Form validation patterns
- Database integration flow

### What Was Customized Manually
- Custom marquee animations
- 3D team flip effect
- Multi-step form reducer logic
- Admin dashboard charts
- ChatBot keyword matching logic

## 📝 License

All rights reserved. Built for NayePankh Foundation.

## 👥 Support

For issues or questions, contact: contact@nayepankh.org

## 🙏 Acknowledgments

Built with ❤️ for empowering underprivileged youth using modern web technologies.

---

**Made with Vite ⚡ | Styled with Tailwind 🎨 | Animated with Framer Motion 🚀**
