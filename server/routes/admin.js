import { Router } from 'express'
import Order from '../models/Order.js'
import User from '../models/User.js'

const router = Router()

// All orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.' })
  }
})

// Update order status
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: 'after' }
    )
    if (!order) return res.status(404).json({ message: 'Order not found.' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order.' })
  }
})

// Update order deadline
router.patch('/orders/:id/deadline', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deadline: req.body.deadline },
      { returnDocument: 'after' }
    )
    if (!order) return res.status(404).json({ message: 'Order not found.' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update deadline.' })
  }
})

// Update order siteUrl
router.patch('/orders/:id/siteurl', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { siteUrl: req.body.siteUrl },
      { returnDocument: 'after' }
    )
    if (!order) return res.status(404).json({ message: 'Order not found.' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update site URL.' })
  }
})

// All users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users.' })
  }
})

// Stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ])
    
    const totalUsers = await User.countDocuments()
    const totalOrders = await Order.countDocuments()
    
    const formattedStats = {
      totalOrders,
      totalUsers,
      pending: stats.find(s => s._id === 'pending')?.count || 0,
      ongoing: stats.find(s => s._id === 'in-progress')?.count || 0,
      completed: stats.find(s => s._id === 'live')?.count || 0,
    }
    
    res.json(formattedStats)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats.' })
  }
})

export default router
