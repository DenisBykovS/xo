const bcrypt = require('bcryptjs')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const config = require('../config/db')
const errHandler = require('../utils/error')

module.exports.login = async function (req, res) {
  const candidate = await Admin.findOne({ login: req.body.login })

  if (candidate) {
    const passResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passResult) {
      const token = jwt.sign(
        {
          login: candidate.login,
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
    res.status(404).json({ message: 'Пользватель с таким login не найден' })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await Admin.findOne({login: req.body.login})

  if (candidate) {
    res.status(409).json({
      success: false,
      message: 'Login занят.',
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const newUser = new Admin({
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