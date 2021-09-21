const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/db')
const errHandler = require('../utils/error')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    const passResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        config.secret,
        { expiresIn: 3600 * 24 }
      )
      res.status(200).json({ token: `Bearer ${token}`, user: candidate.login})
    } else {
      res.status(401).json({ message: 'Неверный пароль' })
    }
  } else {
    res.status(404).json({ message: 'Пользватель с таким email не найден' })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    res.status(409).json({
      success: false,
      message: 'EMAIL занят.',
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      login: req.body.login,
      password: bcrypt.hashSync(password, salt),
    })

    try {
      await newUser.save()
      res.status(201).json({
        success: true,
        user: newUser,
        message: 'Пользватель успешнно создан.',
      })
    } catch (error) {
      errHandler(res, error)
    }
  }
}
