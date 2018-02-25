import React from 'react'

const Input = ({value, funct}) => {
  return (
    <div>
      <input
        value={value}
        onChange={funct} />
    </div>
  )
}

export default Input
