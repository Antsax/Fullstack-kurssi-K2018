const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
    {
      title: "React patterns",
      author: "A",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "B",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "C",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "D",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      title: "TDD harms architecture",
      author: "E",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 1
    },
    {
      title: "Type wars",
      author: "F",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }  
  ]

  const users = [
    {
      username: 'pekkaB',
      name: 'pekka',
      password: 'moi'
    },
    {
      username: 'mauriA',
      name: 'mauri',
      password: 'nohei'
    },
    {
      username: 'taunoC',
      name: 'tauno',
      password: 'password'
    },
    {
      username: 'peppiD',
      name: 'peppi',
      password: 'vesi123'
    },
    {
      username: 'johannaE',
      name: 'johanna',
      password: 'kissapissa'
    }
  ]
  
  const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    return await Blog.find({})
  }

  const getFirst = async () => {
    const formattedBlogs = await blogsInDb()
    return formattedBlogs[0]
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users
  }
  
  
  module.exports = {
    blogs, nonExistingId, blogsInDb, getFirst, usersInDb, users
  }