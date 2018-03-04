import React from 'react'

const Logout = ({user, handleLogout}) => {
  return (
    <div>
      <p>{user.name} logged in as {user.username}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Logout