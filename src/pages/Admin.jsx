import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Trash2, Check, BarChart3, Users, Clock, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { supabase } from '../lib/supabaseClient'

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [volunteers, setVolunteers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    pending: 0,
    active: 0,
  })
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchVolunteers()
    }
  }, [])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'nayepankh2024'

    if (password === correctPassword) {
      sessionStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      setPassword('')
      fetchVolunteers()
    } else {
      setIsShaking(true)
      toast.error('Incorrect password!')
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setVolunteers(data || [])

      // Calculate stats
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      const thisWeek = data?.filter((v) => new Date(v.created_at) > weekAgo).length || 0
      const pending = data?.filter((v) => v.status === 'pending').length || 0
      const active = data?.filter((v) => v.status === 'active').length || 0

      setStats({
        total: data?.length || 0,
        thisWeek,
        pending,
        active,
      })
    } catch (error) {
      console.error('Error fetching volunteers:', error)
      toast.error('Failed to load volunteers')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const { error } = await supabase.from('volunteers').delete().eq('id', id)
        if (error) throw error
        setVolunteers(volunteers.filter((v) => v.id !== id))
        toast.success('Volunteer deleted')
      } catch (error) {
        toast.error('Failed to delete')
      }
    }
  }

  const handleActivate = async (id) => {
    try {
      const { error } = await supabase.from('volunteers').update({ status: 'active' }).eq('id', id)
      if (error) throw error
      setVolunteers(
        volunteers.map((v) => (v.id === id ? { ...v, status: 'active' } : v))
      )
      toast.success('Volunteer activated')
    } catch (error) {
      toast.error('Failed to activate')
    }
  }

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Programs', 'Hours', 'Status', 'Date']
    const rows = volunteers.map((v) => [
      v.id,
      v.name,
      v.email,
      v.phone,
      v.city,
      v.programs,
      v.hours,
      v.status,
      new Date(v.created_at).toLocaleDateString(),
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'volunteers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredVolunteers = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // City distribution data for chart
  const cityData = volunteers.reduce((acc, v) => {
    const existing = acc.find((item) => item.name === v.city)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ name: v.city, value: 1 })
    }
    return acc
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary px-4">
        <motion.form
          onSubmit={handlePasswordSubmit}
          animate={isShaking ? { x: [-10, 10, -10, 0] } : {}}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-primary dark:text-white mb-6 text-center">Admin Access</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Enter admin password</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border-2 border-primary dark:border-accent dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent mb-6"
            autoFocus
          />

          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
          >
            Enter Dashboard
          </button>
        </motion.form>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-light dark:bg-dark pt-24 px-4 pb-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-primary dark:text-white">Admin Dashboard</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem('adminAuth')
              setIsAuthenticated(false)
            }}
            className="px-6 py-2 bg-accent text-white font-bold rounded-lg hover:bg-orange-600"
          >
            Logout
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard icon={Users} label="Total Volunteers" value={stats.total} color="bg-blue-500" />
          <StatCard icon={TrendingUp} label="This Week" value={stats.thisWeek} color="bg-green-500" />
          <StatCard icon={Clock} label="Pending Review" value={stats.pending} color="bg-yellow-500" />
          <StatCard icon={Check} label="Active Volunteers" value={stats.active} color="bg-accent" />
        </div>

        {/* Search & Export */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            onClick={exportCSV}
            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Volunteers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-x-auto mb-12"
        >
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">City</th>
                <th className="px-6 py-3 text-left">Programs</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map((volunteer, idx) => (
                <motion.tr
                  key={volunteer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm">{volunteer.id}</td>
                  <td className="px-6 py-4 font-semibold text-primary dark:text-white">{volunteer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{volunteer.email}</td>
                  <td className="px-6 py-4 text-sm">{volunteer.city}</td>
                  <td className="px-6 py-4 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {volunteer.programs && JSON.parse(volunteer.programs).slice(0, 2).map((prog) => (
                        <span key={prog} className="bg-accent/20 text-accent px-2 py-1 rounded">
                          {prog}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(volunteer.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        volunteer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedVolunteer(volunteer)
                          setShowDetailModal(true)
                        }}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                        title="View Details"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>
                      {volunteer.status === 'pending' && (
                        <button
                          onClick={() => handleActivate(volunteer.id)}
                          className="p-2 hover:bg-green-100 dark:hover:bg-green-900 rounded"
                          title="Activate"
                        >
                          <Check size={18} className="text-green-600" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(volunteer.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Chart */}
        {cityData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Submissions by City</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f57c00" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedVolunteer && (
        <DetailModal volunteer={selectedVolunteer} onClose={() => setShowDetailModal(false)} />
      )}
    </motion.div>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-4xl font-bold text-primary dark:text-white">{value}</p>
        </div>
        <div className={`${color} p-4 rounded-lg text-white`}>
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  )
}

function DetailModal({ volunteer, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto p-8"
      >
        <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">{volunteer.name}</h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Email</p>
            <p className="font-semibold">{volunteer.email}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Phone</p>
            <p className="font-semibold">{volunteer.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">City</p>
            <p className="font-semibold">{volunteer.city}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Age</p>
            <p className="font-semibold">{volunteer.age}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Mode</p>
            <p className="font-semibold capitalize">{volunteer.mode}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Hours/Week</p>
            <p className="font-semibold">{volunteer.hours}</p>
          </div>
        </div>

        <div className="bg-light dark:bg-gray-700 p-4 rounded-lg mb-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Why Volunteer</p>
          <p className="text-gray-800 dark:text-gray-200">{volunteer.why_volunteer}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}
