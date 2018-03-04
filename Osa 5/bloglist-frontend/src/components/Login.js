import React from 'react'

const LoginForm = ({ handleLogin, handleLoginFieldChange, username, password }) => {
    return (
      <div>
        <h2>Login</h2>
  
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              onChange={handleLoginFieldChange}
              name="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  

  export default LoginForm