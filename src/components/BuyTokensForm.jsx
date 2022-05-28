import React from 'react'

export class BuyTokensForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      _to: '0x0',
      _amount: 1
    }

    this.handleBuy = this.handleBuy.bind(this)
    this.handleTo = this.handleTo.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
  }

  handleBuy (event) {
    console.log('Buy Tokens')
    this.props.submitBuy()
    event.preventDefault()
  }

  handleTo (event) {
    this.setState({ _to: event.target.value })
    console.log('set state for to')
    this.props.aHandleTo(event.target.value)
  }

  handleAmount (event) {
    this.setState({ _amount: event.target.value })
    console.log('set state for amount')
    this.props.aHandleAmount(event.target.value)
  }

  render () {
    return (
      <div>
        <div className='center' id='buyTokens'>
            <h2>Buy Tokens</h2>
            <label>To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input value={this.state._to || this.props.to } onPaste={this.handleTo} onBlur={this.handleTo} onChange={this.handleTo} />
            </label>
            <p></p>
            <label>
              Amount:&nbsp;&nbsp;<input value={this.state._amount || this.props.amount } onPaste={this.handleAmount} onBlur={this.handleAmount} onChange={this.handleAmount} />
            </label>
            <p></p>
            <button onClick={this.handleBuy}>Buy Tokens</button>
        </div>
      </div>
    )
  }
}
