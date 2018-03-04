import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div class='content'>
    <div>
      {blog.title} {blog.author}
    </div>
    <div class='likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog