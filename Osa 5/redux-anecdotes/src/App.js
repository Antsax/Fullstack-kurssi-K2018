import React from 'react';
import { createStore } from 'redux'
import reducer from './reducer'


class App extends React.Component {

  voteAnecdote = (anecdote) => () => {
      this.props.store.dispatch({
      type: 'VOTE',
      data: {
        id: anecdote.id
      }
    }) 
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'APPEND',
      data: {
        content
      }
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a,b) => b.votes - a.votes)
          .map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default App