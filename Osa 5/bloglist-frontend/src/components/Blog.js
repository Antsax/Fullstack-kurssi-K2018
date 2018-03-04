import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extend: false
    }
  }

  onExtend = () => {
    this.setState({ extend: !this.state.extend })  
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const authorToRemove = (blog, authoredUser, onDelete) => {
      const isAuthored = blog.user.id === authoredUser._id
      
      return (
        isAuthored ?
          <button 
            value={JSON.stringify(blog)} 
            onClick={onDelete}>
            delete
          </button>
          :
            null
      )
    }

    return (
      <div style={blogStyle}>
        {this.state.extend ?
          <div onClick={this.onExtend}>
             <p>{this.props.blog.title}: {this.props.blog.author}</p>
             <a href={this.props.blog.url}>{this.props.blog.url}</a>
             <p>{this.props.blog.likes}</p>
             <button 
              value={JSON.stringify(this.props.blog)}
              onClick={this.props.onLike}>
              like
             </button>
             {authorToRemove(this.props.blog, this.props.user, this.props.onDelete)}
            <p>added by {this.props.user.name}</p>
          </div>
          :
          <div onClick={this.onExtend}>
            {this.props.blog.title} {this.props.blog.author}
          </div>}
      </div>
    )
  }
}

export default Blog