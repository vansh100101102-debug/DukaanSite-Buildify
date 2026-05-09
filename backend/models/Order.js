import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true },
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  shopType: { type: String, required: true },
  templateId: { type: String, required: true },
  products: { type: String, default: '' },
  description: { type: String, default: '' },
  languages: [{ type: String, default: 'en' }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'review', 'live'],
    default: 'pending',
  },
  deadline: { type: Date },
  siteUrl: { type: String, default: '' },
  aiSuggestions: { type: Object, default: {} },
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
