import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
import Blogs from '../components/Blogs'
import Login from '../components/Login'
import CreateBlog from '../components/CreateBlog'
import Notification from '../components/Notification'
import Logout from '../components/Logout'
import Togglable from '../components/Togglable'
jest.mock("../services/blogs")

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App/>)
    })

    it('only login form is rendered', () => {
      app.update()
      expect(app.find(Login)).toHaveLength(1)
      expect(app.find(Blogs)).toHaveLength(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App/>)
    })

    it('all notes are rendered', () => {
      app.update()
      expect(app.find(Login)).toHaveLength(0)
      expect(app.find(Blogs)).toHaveLength(1)
    })
  })
})