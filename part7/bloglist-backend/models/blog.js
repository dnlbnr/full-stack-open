const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comments: [{ type: String }],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
