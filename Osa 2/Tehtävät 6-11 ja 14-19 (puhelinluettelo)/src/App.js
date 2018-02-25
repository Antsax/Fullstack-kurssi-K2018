import React from 'react';
import Input from './components/input';
import Nayta from './components/Nayta';
import personService from './services/communicator'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      filter: '',
      ilmoitus: null
    }
  }

  componentDidMount() {
    personService.getAll().then(response => {
      this.setState({persons: response})
    })
  }

  lisaaTeksti = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNum
    }

    if (!this.state.persons.map(k => k.name).includes(personObject.name)) {
      personService.create(personObject).then(response => {
        this.setState({
          persons: this.state.persons.concat(response),
          ilmoitus: `henkilö lisätty`})

          setTimeout(() => {
            this.setState({ilmoitus: null})
          }, 5000)
      })
    }

    else if (window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha numero?`)){
      const henkilo = this.state.persons.find(a => a.name === personObject.name)
      const uusi = {...henkilo, number: personObject.number}
      personService.update(henkilo.id, uusi).then(response => {
        this.setState({
          persons: this.state.persons.map(note => note.id !== henkilo.id ? note : uusi),
          ilmoitus: `numero muutettu`})

          setTimeout(() => {
            this.setState({ilmoitus: null})
          }, 5000)
      }).catch(virhe => {
        this.setState({
          ilmoitus: `numero on jo poistettu`})

          setTimeout(() => {
            this.setState({ilmoitus: null})
          }, 5000)
        })
      }

    this.setState({
      newName: '',
      newNum: ''
    })
}

  muutaNimi = (event) => {
    this.setState({newName: event.target.value})
  }

  muutaNum = (event) => {
    this.setState({newNum: event.target.value})
  }

  muutaFil = (event) => {
    this.setState({filter: event.target.value})
  }

  poista = (henkilo) => {
    return () => {
      if(window.confirm(`poistetaanko ${henkilo.name}?`)) {
        personService.poista(henkilo.id).then(response => {
          this.setState({
            persons: this.state.persons.filter(h => h.id !== henkilo.id),
            ilmoitus: `henkilö poistettu`})

            setTimeout(() => {
              this.setState({ilmoitus: null})
            }, 5000)
        })
    }
  }
  }

  render() {
    const toShow = this.state.persons.filter(k => k.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <h1> Puhelinluettelo </h1>
         <Notification message={this.state.ilmoitus}/>
          <div>
            rajaa näytettäviä: <Input value={this.state.filter} funct={this.muutaFil} />
          </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.lisaaTeksti}>
          <div>
            nimi: <Input value={this.state.newName} funct={this.muutaNimi} />
          </div>
          <div>
            numero: <Input value={this.state.newNum} funct={this.muutaNum} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
            <Nayta value={toShow} poisto={this.poista}/>
        </table>
      </div>
    )
  }
}

export default App
