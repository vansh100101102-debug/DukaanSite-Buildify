import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Plus, Layout, Clock, CheckCircle2, AlertCircle, ExternalLink, RefreshCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import axios from 'axios'
import LoginRequired from '../components/LoginRequired'

const API = import.meta.env.VITE_API_BASE_URL || '/api'

export default function DashboardPage({ isLoggedIn, userEmail, userId }) {
  const { t } = useTranslation()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) return
      try {
        const res = await axios.get(`${API}/orders`, { params: { email: userEmail } })
        setOrders(res.data)
      } catch (err) {
        console.error('Fetch orders error:', err)
      } finally {
        setLoading(false)
      }
    }
    if (isLoggedIn) {
      fetchOrders()
    }
  }, [userEmail, isLoggedIn])

  if (!isLoggedIn) {
    return <LoginRequired title="Dashboard Access" message="Please sign in to view your projects and site status." />
  }

  return (
    <div className="pb-24 px-6 min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/5 blur-[120px] -z-10" />

      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black mb-4"
            >
              Master <span className="text-cyan">Dashboard</span>
            </motion.h1>
            <p className="text-white/50 text-xl font-medium">Manage your digital empire from one central command.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setLoading(true);
                const fetchOrders = async () => {
                  try {
                    const res = await axios.get(`${API}/orders`, { params: { email: userEmail } })
                    setOrders(res.data)
                  } catch (err) {
                    console.error('Manual refresh error:', err)
                  } finally {
                    setLoading(false)
                  }
                }
                fetchOrders();
              }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              title="Sync Status"
            >
              <RefreshCcw size={24} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
            </button>
            <Link to="/order" className="btn-premium group flex items-center gap-2">
              <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
              Build New Project
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard label="Active Projects" value={orders.length} icon={Layout} color="text-purple" />
          <StatCard label="Live Sites" value={orders.filter(o => o.status === 'live').length} icon={CheckCircle2} color="text-green-400" />
          <StatCard label="Ongoing Build" value={orders.filter(o => o.status === 'in-progress').length} icon={Clock} color="text-cyan" />
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            Your Projects <div className="h-px flex-1 bg-white/5" />
          </h2>

          {loading ? (
            <div className="glass p-20 text-center animate-pulse">
               <div className="w-12 h-12 rounded-full border-2 border-cyan border-t-transparent animate-spin mx-auto mb-6" />
               <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Synchronizing Data...</p>
            </div>
          ) : orders.length > 0 ? (
            orders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
                    <Layout size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-1">{order.businessName}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 font-medium">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><Layout size={14} /> {order.templateId || order.template}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                  <StatusBadge status={order.status} deadline={order.deadline} />
                  {(order.status === 'live' || order.siteUrl) && (
                    <a 
                      href={order.siteUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-cyan hover:underline flex items-center gap-1 group/link"
                    >
                      Visit Masterpiece <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="glass p-24 text-center border-dashed border-white/10">
              <AlertCircle size={48} className="mx-auto mb-6 text-white/20" />
              <h3 className="text-2xl font-black mb-3">No active projects</h3>
              <p className="text-white/40 mb-8 max-w-sm mx-auto">Your journey starts here. Build your first world-class website in just minutes.</p>
              <Link to="/order" className="btn-premium px-12 py-4 inline-block">
                Create First Site
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="glass p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
      <Icon className={`${color} mb-6 relative z-10`} size={32} />
      <div className="text-white/50 text-sm font-black uppercase tracking-widest mb-1 relative z-10">{label}</div>
      <div className="text-4xl font-black relative z-10">{value}</div>
    </div>
  )
}

function StatusBadge({ status, deadline }) {
  const config = {
    'pending': { color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: AlertCircle, label: 'Pending' },
    'in-progress': { color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20', icon: Clock, label: 'Ongoing' },
    'review': { color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', icon: CheckCircle2, label: 'Review' },
    'live': { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2, label: 'Completed' }
  }

  const s = config[status] || config.pending

  return (
    <div className="flex flex-col items-end gap-2 text-right">
      <div className={`px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 ${s.color}`}>
        <s.icon size={14} /> {s.label}
      </div>
    </div>
  )
}
