import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      kaikki: 0
    }
  }

  lisaaArvo = (arvo) => () => {
    this.setState({[arvo]: this.state[arvo] + 1})
    this.setState({kaikki: this.state.kaikki + 1})
  }

  render() {
    const Button = (props) => {
      return (
          <button onClick={props.funktio}>{props.name}</button>
      )
    }

    const Statistics = () => {
      if(this.state.kaikki!==0) {
        return (
          <div>
            <table>
              <tbody>
                  <Statistic name='hyvä' funktio={this.state.hyva} />
                  <Statistic name='neutraali' funktio={this.state.neutraali} />
                  <Statistic name='huono' funktio={this.state.huono} />
                  <Statistic name='keskiarvo' funktio={Math.round(((this.state.hyva * 1) + (this.state.huono * -1)) / this.state.kaikki * 10) / 10} />
                  <Statistic name='positiivisia' funktio={Math.round(this.state.hyva / this.state.kaikki * 1000) / 10 } loppupaate='%' />
              </tbody>
            </table>
          </div>
        )
      }

      else {
        return (
            <p>ei yhtään palautetta annettu</p>
        )
      }
    }

    const Statistic = (props) => {
      return (
        <tr>
          <td>{props.name}</td>
          <td>{props.funktio} {props.loppupaate}</td>
        </tr>
      )
    }

    return (
      <div>
        <h1> anna palautetta </h1>
        <Button funktio={this.lisaaArvo('hyva')} name='hyvä'/>
        <Button funktio={this.lisaaArvo('neutraali')} name='neutraali'/>
        <Button funktio={this.lisaaArvo('huono')} name='huono'/>
        <h1> statistiikka </h1>
        <Statistics />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
