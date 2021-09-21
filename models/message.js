const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  important: {
    type: Boolean
  },
  author: {
    type: String,
  },
  heading: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const Message = (module.exports = mongoose.model('Message', MessageSchema))
