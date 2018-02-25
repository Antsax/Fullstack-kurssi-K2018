const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs, nonExistingId, blogsInDb, getFirst } = require('./test_helper')

describe('post, delete and get', () => {

  beforeEach(async () => {
    await Blog.remove({})
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    return await Promise.all(promiseArray)
  })

test('blogs are returned as json', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog is posted to database', async () => {
  const addedBlog = {
    title: "Testi Blogi",
    author: "Antwan Hommy",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    likes: 2000000
  }

  await api
    .post('/api/blogs')
    .send(addedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body.length).toBe(blogs.length + 1)
  expect(contents).toContain('Testi Blogi')
  })

  test('likes doesnt have value', async () => {
    const addedBlog = {
      title: "Testi Blogi",
      author: "Antwan Hommy",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }

    await api
    .post('/api/blogs')
    .send(addedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.likes)

    expect(response.body.length).toBe(blogs.length + 1)
    expect(contents).toContain(0)
    
  })

  test('title or url missing', async () => {
    const addedBlog = {
      author: "Antwan Hommy",
      likes: 5
    }

    await api
    .post('/api/blogs')
    .send(addedBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })

  test('removing of one blog', async () => {
    const addedBlog = new Blog({
      title: "poista minut",
      author: "RA",
      url: "ei ole haha",
      likes: 0
    })

    await addedBlog.save()
    const blogsAtStart = await blogsInDb()
    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()
    const contents = blogsAfterOperation.map(r => r.title)

    expect(contents).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
      
  })

  test('updating of blog', async () => {
    const allBlogs = await blogsInDb()
    const initial = allBlogs[0].likes
    const update = {
      title: allBlogs[0].title,
      author: allBlogs[0].author,
      url: allBlogs[0].url,
      likes: initial + 1
    }

    await api
      .put(`/api/blogs/${allBlogs[0]._id}`)
      .send(update)
      .expect(204)

    const testi = await getFirst()
    expect(testi.likes).toBe(initial + 1)
  })

  afterAll(() => {
   server.close()
  })
})