const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const User = require('./models/user')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const { getTokenFrom } = require('./utils/middleware')

app.use(cors())
app.use(bodyParser.json())
app.use(getTokenFrom)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

  const server = http.createServer(app)

  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
  
  server.on('close', () => {
    mongoose.connection.close()
  })
  
  module.exports = {
    app, server
  }