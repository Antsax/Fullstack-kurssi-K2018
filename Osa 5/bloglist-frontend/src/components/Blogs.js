import React from 'react'
import Blog from './Blog'

const blogForm = ({blogs, onLike, onDelete, authoredUser, user}) => {
    return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={onLike} onDelete={onDelete} user={user} authoredUser={authoredUser}/>
      )}
    </div>
    )
}

export default blogForm