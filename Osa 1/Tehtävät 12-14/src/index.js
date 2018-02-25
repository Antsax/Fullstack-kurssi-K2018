import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [0, 0, 0, 0, 0, 0]
    }
  }

  muuta = () => {this.setState({selected: Math.floor((Math.random() * 4))})}
  lisaaPiste = () => {
    const kopio = this.state.pisteet
    kopio[this.state.selected] += 1
    this.setState({})
  }

  render() {

    const Winner = () => {
      var a = this.state.pisteet;
      var i = a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

      return (
        <div>
        {this.props.anecdotes[i]}
          <div>
            {this.state.pisteet[i]}
          </div>
        </div>
      )
    }

      return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <div>
          <button onClick={this.lisaaPiste}>Vote</button>
          <button onClick={this.muuta}>Next anecdote</button>
        </div>
        <h2>Anecdote with most votes</h2>
        <Winner />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
