import React from 'react'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SImpleblog'

describe('<SimpleBlog />', () => {
  let blog

  beforeAll(() => {
    blog = {
      title: 'titteli',
      author: 'autori',
      likes: '123'
    }
  })

  it('renders content', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('clicking the button calls event handler once', () => {
    const mockHandler = jest.fn()

    const noteComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = noteComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})