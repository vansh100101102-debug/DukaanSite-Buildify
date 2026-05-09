import { Router } from 'express'
import Order from '../models/Order.js'
import User from '../models/User.js'

const router = Router()

// Create order
router.post('/', async (req, res) => {
  try {
    let orderData = { ...req.body }
    
    // If userId is missing, try to find it via email
    if (!orderData.userId && orderData.userEmail) {
      const user = await User.findOne({ email: orderData.userEmail })
      if (user) {
        orderData.userId = user._id
      }
    }

    const order = await Order.create(orderData)
    res.status(201).json(order)
  } catch (err) {
    console.error('Order creation error:', err)
    res.status(500).json({ message: 'Failed to create order.' })
  }
})

// Get orders by user email
router.get('/', async (req, res) => {
  try {
    const { email } = req.query
    const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.' })
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found.' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order.' })
  }
})

export default router
