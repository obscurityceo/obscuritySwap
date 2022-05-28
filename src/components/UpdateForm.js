import React from 'react'

export class UpdateForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      _currentBalance: 0,
      _symbol: 'not fetched'
    }
  }

  componentDidMount () {
    this.props.onConnected()
  }

  render () {
    return (
      <div>
        <div id='currentBalance'>
            <h2>Current Balance</h2>
            <p></p>
            <label>
            Token Symbol:&nbsp;&nbsp;&nbsp;<input value={ this.props._symbol } readOnly/>
            </label>
            <p></p>
            <label>
            Current Balance: <input value={ this.props._currentBalance } readOnly/>
            </label>
        </div>
      </div>
    )
  }
}
