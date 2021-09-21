const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  imageSrc: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const Post = (module.exports = mongoose.model('Post', PostSchema))
