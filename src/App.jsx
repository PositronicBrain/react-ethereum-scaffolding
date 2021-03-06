import React from 'react'
import ReactDOM from 'react-dom'
import Form from './Form'
import Display from './Display'
import './app.scss'
import Contract from './contracts/counter'

const Counter = Contract['counter.sol:Counter']
const web3 = Contract.web3
const account = web3.eth.accounts[0]

const App = React.createClass({
  getInitialState: () => ({
    counter: 0,
    isLoading: true
  }),

  componentDidMount: function () {
    Counter.CounterUpdated((err, ev) => {
      if (err) {
        console.error(err)
      }
      this.setState({
        isLoading: false,
        counter: ev.args.value.toNumber()
      })
    })
  },

  setCounter: function (x) {
      this.setState({
        isLoading: true,
      })
    Counter.setCounter(x, {from: account}, (err) => {
      if (err) {
        console.error(err)
      }
    })
  },

  render: function () {
    const {isLoading, counter} = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-6 offset-md-3'>
            <h1 className='text-center'> Register a number! </h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 offset-md-3'>
            <Display counter={counter} isLoading={isLoading}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 offset-md-3'>
            <Form setCounter={this.setCounter} />
          </div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
