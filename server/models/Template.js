import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  emoji: { type: String, default: '🏪' },
  description: { type: String, default: '' },
  features: [String],
  color: { type: String, default: '#7c3aed' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Template', templateSchema)
