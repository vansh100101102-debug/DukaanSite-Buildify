import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, ShoppingBag, Clock, CheckCircle2, 
  Calendar, RefreshCcw, Search, Filter, 
  ChevronRight, AlertCircle, TrendingUp 
} from 'lucide-react'
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL || '/api'

export default function AdminPage({ isLoggedIn, isAdmin }) {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ pending: 0, ongoing: 0, completed: 0, totalOrders: 0, totalUsers: 0 })
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      navigate('/')
      return
    }
    fetchData()
  }, [isLoggedIn, isAdmin])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [statsRes, ordersRes] = await Promise.all([
        axios.get(`${API}/admin/stats`),
        axios.get(`${API}/admin/orders`)
      ])
      setStats(statsRes.data)
      setOrders(ordersRes.data)
    } catch (err) {
      console.error('Fetch admin data error:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${API}/admin/orders/${orderId}/status`, { status: newStatus })
      fetchData()
    } catch (err) {
      console.error('Update status error:', err)
    }
  }

  const updateSiteUrl = async (orderId, siteUrl) => {
    try {
      await axios.patch(`${API}/admin/orders/${orderId}/siteurl`, { siteUrl })
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, siteUrl } : o))
    } catch (err) {
      console.error('Update siteUrl error:', err)
    }
  }

  const filteredOrders = orders.filter(o => 
    o.businessName.toLowerCase().includes(search.toLowerCase()) ||
    o.userEmail.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pb-24 px-6 min-h-screen relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan/5 blur-[120px] -z-10" />

      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black mb-4 flex items-center gap-4"
            >
              Command <span className="text-purple">Center</span>
              <div className="px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-xs font-black uppercase tracking-widest text-purple">Admin</div>
            </motion.h1>
            <p className="text-white/50 text-xl font-medium">Platform overview, order management, and growth metrics.</p>
          </div>
          <button 
            onClick={fetchData}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <RefreshCcw size={24} className={`group-active:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <AdminStatCard label="Pending" value={stats.pending} icon={Clock} color="text-amber-400" />
          <AdminStatCard label="Ongoing" value={stats.ongoing} icon={RefreshCcw} color="text-cyan" />
          <AdminStatCard label="Completed" value={stats.completed} icon={CheckCircle2} color="text-green-400" />
          <AdminStatCard label="Total Users" value={stats.totalUsers} icon={Users} color="text-purple" />
        </div>

        {/* Orders Table Section */}
        <div className="glass overflow-hidden border-white/5">
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-2xl font-black">Project Pipeline</h2>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search by business or email..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan focus:bg-white/10 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] text-xs font-black uppercase tracking-widest text-white/40">
                  <th className="px-8 py-6">Project / Client</th>
                  <th className="px-8 py-6">Type & Template</th>
                  <th className="px-8 py-6 text-right">Build Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {filteredOrders.map((order, i) => (
                    <motion.tr 
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="font-black text-lg group-hover:text-cyan transition-colors">{order.businessName}</div>
                        <div className="text-sm text-white/40 font-medium">{order.userEmail}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold flex items-center gap-2">
                           <ShoppingBag size={14} className="text-cyan" /> {order.shopType}
                        </div>
                        <div className="text-xs text-white/40 mt-1 uppercase tracking-wider font-black">{order.templateId}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex flex-col items-end gap-2">
                          <select 
                            value={order.status} 
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                            className={`bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-widest focus:outline-none transition-all cursor-pointer
                              ${order.status === 'live' ? 'text-green-400 border-green-500/20 bg-green-500/5' : 
                                order.status === 'in-progress' ? 'text-cyan border-cyan-500/20 bg-cyan-500/5' : 
                                order.status === 'review' ? 'text-purple border-purple-500/20 bg-purple-500/5' : 'text-amber-400 border-amber-500/20 bg-amber-500/5'}
                            `}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">Ongoing</option>
                            <option value="review">Review</option>
                            <option value="live">Completed</option>
                          </select>
                          {order.status === 'live' && (
                            <input 
                              type="text"
                              placeholder="Site URL (https://...)"
                              className="w-full max-w-[200px] bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[10px] focus:outline-none focus:border-cyan transition-all"
                              value={order.siteUrl || ''}
                              onChange={(e) => updateSiteUrl(order._id, e.target.value)}
                            />
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && !loading && (
              <div className="p-20 text-center">
                 <AlertCircle size={40} className="mx-auto mb-4 text-white/20" />
                 <p className="text-white/40 font-bold">No matching records found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminStatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="glass p-8 relative overflow-hidden group hover:border-white/20 transition-all">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${color}`}>
          <Icon size={24} />
        </div>
        <TrendingUp size={16} className="text-green-500/40" />
      </div>
      <div className="text-white/40 text-xs font-black uppercase tracking-widest mb-1 relative z-10">{label}</div>
      <div className="text-3xl font-black relative z-10">{value}</div>
    </div>
  )
}
