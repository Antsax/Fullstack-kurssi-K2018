import React from 'react'

const Nayta = ({value, poisto}) => {
  return (
    <tbody>
    {value.map(h =>
      <tr key={h.name}>
      <td>{h.name}</td>
      <td>{h.number} </td>
      <td><button onClick={poisto(h)}> poista </button> </td>
      </tr>
    )}
    </tbody>
  )
}

export default Nayta
