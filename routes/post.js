const express = require('express')
const controller = require('../controllers/post')
const router = express.Router()
const passport = require('passport')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5,
}
const upload = multer({ storage, fileFilter, limits })

router.get('/', controller.getAll)

router.post(
  '/',
  upload.single('image'),
  controller.create
)
router.patch('/:id', upload.single('image'), controller.update)

router.delete('/:id', controller.remove)

router.get('/:id', controller.getById)

module.exports = router
