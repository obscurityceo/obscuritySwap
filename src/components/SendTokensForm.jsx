import React from 'react'

export class SendTokensForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      _sendTo: '0x0',
      _sendAmount: 1
    }

    this.handleSend = this.handleSend.bind(this)
    this.handleSendTo = this.handleSendTo.bind(this)
    this.handleSendAmount = this.handleSendAmount.bind(this)
  }

  handleSend (event) {
    console.log('Send Tokens')
    this.props.submitSend()
    event.preventDefault()
  }

  handleSendTo (event) {
    this.setState({ _sendTo: event.target.value })
    console.log('set state for to')
    this.props.aHandleSendTo(event.target.value)
  }

  handleSendAmount (event) {
    this.setState({ _sendAmount: event.target.value })
    console.log('set state for amount')
    this.props.aHandleSendAmount(event.target.value)
  }

  render () {
    return (
      <div>
        <div className='center' id='sendTokens'>
          <h2>Send Tokens</h2>
            <label>To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input value={this.state._sendTo || this.props.sendTo } onPaste={this.handleSendTo} onBlur={this.handleSendTo} onChange={this.handleSendTo} />
            </label>
            <p></p>
            <label>Amount:&nbsp;&nbsp;<input value={this.state._sendAmount || this.props.sendAmount } onPaste={this.handleSendAmount} onBlur={this.handleSendAmount} onChange={this.handleSendAmount} />
            </label>
            <p></p>
            <button onClick={this.handleSend}>Send Tokens</button>
        </div>
      </div>
    )
  }
}
