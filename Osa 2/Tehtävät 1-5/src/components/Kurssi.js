import React from 'react'

const Kurssi = (props) => {
  return (
    <div>
      {props.kurssit.map(k=><div key={k.id}>
        <h1>{k.nimi}</h1>
        {k.osat.map(a=><p key={a.id}>{a.nimi} {a.tehtavia}</p>)}
        <p>yhteensä {k.osat.reduce((sum, current) => sum + current.tehtavia, 0)} tehtävää</p>
        </div>
      )}
    </div>
  )
}

export default Kurssi
