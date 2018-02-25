import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehi1tys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={kurssi} />
      <Yhteensa summa={kurssi} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi.nimi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa o1={props.osat.osat[0].nimi} t1={props.osat.osat[0].tehtavia} />
      <Osa o2={props.osat.osat[1].nimi} t2={props.osat.osat[1].tehtavia} />
      <Osa o3={props.osat.osat[2].nimi} t3={props.osat.osat[2].tehtavia} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.o1} {props.t1}</p>
      <p>{props.o2} {props.t2}</p>
      <p>{props.o3} {props.t3}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p> yhteensä {props.summa.osat[0].tehtavia + props.summa.osat[1].tehtavia + props.summa.osat[2].tehtavia} tehtävää </p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
