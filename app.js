const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

const config = require('./config/db')

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const messageRoutes = require('./routes/message')
const adminRoutes = require('./routes/admin')
const { patch } = require('./routes/auth')
const app = express()

mongoose
  .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('CONNECTED DB XO')
  })
  .catch((error) =>
    console.log(' NO CONNECTED DB XO' + error + '!!!!!!!!!!!!!!!')
  )

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/admin', adminRoutes)
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('xo-developer/dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'xo-developer', 'dist', 'index.html'))
  })
}

module.exports = app
