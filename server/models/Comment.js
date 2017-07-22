/**
 * This is a database model for a comment
 * See http://mongoosejs.com/ if you are not familiar with mongoose
 */

import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  message: String,
  author: String
})

export default mongoose.model('Comment', messageSchema)
