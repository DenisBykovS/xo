const Message = require('../models/message')
const errHandler = require('../utils/error')

module.exports.getAll = async function (req, res) {
  try {
    const message = await Message.find()
    res.status(200).json(message)
  } catch (error) {
    errHandler(res, error)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Message.remove({ _id: req.params.id })
    res.status(200).json({ message: 'Сообщение удаленно' })
  } catch (error) {
    errHandler(res, error)
  }
}

module.exports.update = async function (req, res) {
  const updated = {
    important: req.body.important,
  }
  try {
    const message = await Message.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    )
    res.status(200).json(message)
  } catch (error) {
    errHandler(res, error)
  }
}

module.exports.create = async function (req, res) {
  const message = new Message({
    author: req.body.author,
    heading: req.body.heading,
    text: req.body.text,
  })
  try {
    await message.save()
    res.status(201).json(message)
  } catch (error) {
    errHandler(res, error)
  }
}
