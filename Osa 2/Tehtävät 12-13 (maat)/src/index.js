import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Nayta = ({props, filter, klik}) => {
  const maat = props.filter(k => {return (k.name.toLowerCase().includes(filter.toLowerCase()))
  })
  if (maat.length === 1) {
    return (
      <div>
        {maat.map(k=> <div key={k.numericCode}>
          <h2>{k.name}</h2>
          <p>capital: {k.capital}</p>
          <p>population: {k.population}</p>
          <img src={k.flag} alt={k.name} height={200} width={400}/>
        </div>
        )}
     </div>
    )
  }

  else if (maat.length <= 10) {
    return (
      <div>
        {maat.map(k=><div key={k.name} onClick={klik}>
          <p>{k.name}</p>
        </div>)}
      </div>
    )
  }

  else if (maat.length > 10) {
    return (
      <p>too many matches, specify another filter</p>
    )
  }
  }

  const Filter = ({filter, funct}) => {
    return (
      <div>
        <form>
          find countries: <input
                            value={filter}
                            onChange={funct} />
        </form>
      </div>
    )
  }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      maat: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {this.setState({maat: response.data})
  })
}

  filterMuutos = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  klik = (event) => {
    this.setState({filter: event.target.innerHTML})
  }

  render() {
    return (
      <div>
        <Filter filter={this.state.filter} funct={this.filterMuutos} />
        <Nayta props={this.state.maat} filter={this.state.filter} klik={this.klik}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
