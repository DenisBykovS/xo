const Post = require('../models/post')
const errHandler = require('../utils/error')

module.exports.getAll = async function (req, res) {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    errHandler(res, error)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Post.remove({ _id: req.params.id })
    res.status(200).json({ message: 'Пост удален' })
  } catch (error) {
    errHandler(res, error)
  }
}

module.exports.update = async function (req, res) {
  const updated = {
    text: req.body.text,
  }
  if (req.file) {
    updated.imageSrc = req.file.path
  }
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(post)
  } catch (error) {
    errHandler(res, error)
  }
}

module.exports.create = async function (req, res) {
  const post = new Post({
    imageSrc: req.file ? req.file.path : '',
    text: req.body.text,
  })
  try {
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    errHandler(res, error)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    errHandler(res, error)
  }
}
