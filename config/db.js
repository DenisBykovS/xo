if (process.env.NODE_ENV === 'production') {
  module.exports = require('./db.prod')
} else {
  module.exports = require('./db.dev')
}
