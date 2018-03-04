import React from 'react'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let blog
  let blogComponent

  beforeAll(() => {
    blog = {
      title: 'asdasdasdasd',
      author: 'udasdasd',
      likes: '42132'
    }
  })

  beforeEach(() => {
    blogComponent = shallow(
      <Blog blog={blog} />
    )
  })

  it('at start only author and title showing', () => {
    const div = blogComponent.find('.content')
    
    expect(div.text()).toContain(blog.title)
    expect(div.text()).toContain(blog.author)

    !expect(div.text()).toContain(blog.likes)
  })

  it('after clicking the div, more info is displayed', () => {
    const div = blogComponent.find('.content')

    div.at(0).simulate('click')
    const clickedDiv = blogComponent.find('.content')

    expect(clickedDiv.text()).toContain(blog.title)
    expect(clickedDiv.text()).toContain(blog.author)
    expect(clickedDiv.text()).toContain(blog.likes)
  })
})