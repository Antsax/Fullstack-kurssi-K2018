import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import BlogForm from './components/Blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      username: '',
      password: '',
      user: undefined,
      blogs: [],
      title: '',
      author: '',
      url: ''
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
     if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }

  login = async (event) => {
    event.preventDefault()
  try {
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'incorrect username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: undefined})
  }

  createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '', author: '', url: '',
          error: 'a new blog has been succesfully added!'
        })
        setTimeout(() => {
          this.setState({ error: ''})
        }, 5000)
      })
  }

  updateBlog = async (event) => {
    event.preventDefault()
    const blog = JSON.parse(event.target.value)
    blog.likes = blog.likes + 1
    try {
      const updatedBlog = await blogService
        .update(blog)
      
      this.setState({
        blogs: this.state.blogs.map(b =>
          b.id === updatedBlog.id ? updatedBlog : b),
        error: 'succesfull like'
      })
    } catch (e) {
      this.setState({error: 'error happened during blog update'})
    } setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  deleteBlog = async (event) => {
    event.preventDefault()
    const removeBlog = JSON.parse(event.target.value)
    try {
      await blogService
        .remove(removeBlog)

      this.setState({error: 'blog removed'})
      this.setState({
        blogs: this.state.blogs.filter( b => 
          b.id !== removeBlog.id)
      })
    } catch (e) {
      this.setState({error: 'failure while deleting'})
    } setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  render() {
    const sortedBlogs = this.state.blogs.sort((a, b) => b.likes - a.likes)
    

    return (
      <div>
        <Notification message={this.state.error}/>
        {this.state.user === undefined ?
          <div>
          <Login 
            handleLogin={this.login}
            handleLoginFieldChange={this.handleLoginFieldChange}
            username={this.state.username}
            password={this.state.password}
            /> 
          </div>
          :
          <div>
            <Logout 
              user={this.state.user}
              handleLogout={this.logout} />
            <BlogForm 
              blogs={sortedBlogs}
              user={this.state.user}
              onLike={this.updateBlog}
              onDelete={this.deleteBlog}
              authoredUser={this.state.user} />
              <br/>
            <Togglable buttonLabel="create blog">
              <CreateBlog
                createBlog={this.createBlog}
                handleBlogFieldChange={this.handleBlogChange}
                author={this.state.author}
                title={this.state.title}
                url={this.state.url}
              />
            </Togglable>
          </div>
        }
      </div>
    )
  }
}

export default App;
