const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request, res, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
    getTokenFrom
}