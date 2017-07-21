import mongoose from 'mongoose'

const messageSchema = mongoose.Schema ({
  message: String,
  author: String
})

export default mongoose.model('Message', messageSchema)