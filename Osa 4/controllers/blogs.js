const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
    response.json(blogs.map(Blog.format))
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if(body.title === undefined) {
      return response.status(400).json({ error: "title missing"})
    } else if (body.url === undefined) {
      return response.status(400).json({ error: "url missing"})
    }

    if(body.likes === undefined) {
      body.likes = 0
    }

    const user = await User.findById(decodedToken.id)
    console.log(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.json(Blog.format(savedBlog))
  } catch(exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

  blogsRouter.put('/:id', async (req, res) => {
    const body = req.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    try {
      await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
      res.status(204).end()
    } catch (exception) {
      console.log(exception)
      res.status(400).send({ error: 'malformatted id'})
    }
  })

  blogsRouter.delete('/:id', async (req, res) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blogId = req.params.id
    const user = await User.findById(decodedToken.id)

    if (decodedToken.id === undefined) {
      return res.status(401).json({error: 'token.id is undefined'})
    }
  
    if (!isUsersBlog(user, blogId)) {
      res.status(401).send({ error: 'u can only rmv ur own blogs'})
    }
  
    try {
      await removeBlogFromUser(user, blogId)
      await Blog.findByIdAndRemove(blogId)
      res.status(204).send({ error: 'blog succesfully deleted'})
    } catch (exception) {
      res.status(400).send({error: 'malformatted id'})
    }
  })
  
  const isUsersBlog = (user, blogId) => {
    return 1 >= user.blogs.reduce((found, blog) =>
      blog._id === blogId ? found + 1 : found + 0 , 0)
  }
  
  const removeBlogFromUser = async (user, blogId) => {
    user.blogs = user.blogs.filter(blog => blog.id !== blogId)
    await user.save()
  }
  
module.exports = blogsRouter