import { Router } from 'express'
import Template from '../models/Template.js'

const router = Router()

// List active templates
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find({ isActive: true })
    res.json(templates)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch templates.' })
  }
})

// Create template (admin)
router.post('/', async (req, res) => {
  try {
    const template = await Template.create(req.body)
    res.status(201).json(template)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create template.' })
  }
})

export default router
