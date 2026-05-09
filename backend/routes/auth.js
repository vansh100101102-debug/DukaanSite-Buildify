import { Router } from 'express'
import User from '../models/User.js'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const router = Router()

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Email already registered.' })
    }
    const user = await User.create({ name, email, password })
    res.status(201).json({ id: user._id, email: user.email, name: user.name, isAdmin: user.role === 'admin' })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' })
    const valid = await user.comparePassword(password)
    if (!valid) return res.status(400).json({ message: 'Invalid credentials.' })
    res.json({ id: user._id, email: user.email, name: user.name, isAdmin: user.role === 'admin' })
  } catch (err) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Google Login
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body
    // Fetch user info from Google using access token
    const gRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
    const { sub, name, email, picture } = await gRes.json()

    if (!email) return res.status(400).json({ message: 'Google authentication failed' })

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ 
        name, 
        email, 
        googleId: sub,
        profilePic: picture,
        password: Math.random().toString(36).slice(-10) 
      })
    }

    res.json({ id: user._id, email: user.email, name: user.name, isAdmin: user.email === 'vansh100101102@gmail.com' })
  } catch (err) {
    console.error('Google Auth Error:', err)
    res.status(400).json({ message: 'Google authentication failed.' })
  }
})

export default router
