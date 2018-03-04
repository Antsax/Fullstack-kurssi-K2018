import React from 'react'

const CreateBlog = ({ createBlog, handleBlogFieldChange, author, title, url }) => {
    return (
      <form onSubmit={createBlog}>
        <div>
          title 
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleBlogFieldChange} />
        </div>
        <div>
          author 
          <input
            type='text'
            name='author'
            value={author}
            onChange={handleBlogFieldChange} />
        </div>
        <div>
          url
          <input
            type='text'
            name='url'
            value={url}
            onChange={handleBlogFieldChange} />
        </div>
        <button type='submit'>submit</button>
      </form>  
    )
  }
  
  export default CreateBlog 