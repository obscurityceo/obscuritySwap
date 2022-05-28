import React from 'react'

export class TokenFundPropComplete extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      _HFCProposalID: 1,
      _HFCFromAddr: 0x0,
      _HFCToAddr: 0x0,
      _HFCAmount: 0,
      _HFCDesc: 0x0,
      _HFCVote: 0,
      _HFCMessage: '',
      _HFCNonce: '',
      _HFCSign: false
    }

    this.handleFVote = this.handleFVote.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleProposalID = this.handleProposalID.bind(this)
    this.handleFromAddr = this.handleFromAddr.bind(this)
    this.handleToAddr = this.handleToAddr.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleNonce = this.handleNonce.bind(this)
    this.handleFSign = this.handleFSign.bind(this)
  }

  handleFVote (event) {
    console.log('vote')
    const voted = this.props.SubmitHFV()
    if (voted) {
      window.alert('Sent Vote')
    } else {
      window.alert('Vote Failed')
    }
    event.preventDefault()
  }

  handleCreate (event) {
    console.log('create')
    this.props.SubmitHFCR()
    event.preventDefault()
  }

  handleComplete (event) {
    console.log('complete')
    this.props.SubmitHFC()
    event.preventDefault()
  }

  handleProposalID (event) {
    this.setState({ _HFCProposalID: event.target.value })
    console.log('set state for proposal ID')
    this.props.aHFProposalID(event.target.value)
    event.preventDefault()
  }

  handleFromAddr (event) {
    this.setState({ _HFCFromAddr: event.target.value })
    console.log('set state for From Addr')
    this.props.aHFFromAddr(event.target.value)
    event.preventDefault()
  }

  handleToAddr (event) {
    this.setState({ _HFToAddr: event.target.value })
    console.log('set state for To Addr')
    this.props.aHFToAddr(event.target.value)
    event.preventDefault()
  }

  handleAmount (event) {
    this.setState({ _HFAmount: event.target.value })
    console.log('set state for Amount')
    this.props.aHFAmount(event.target.value)
    event.preventDefault()
  }

  handleDesc (event) {
    this.setState({ _HFDesc: event.target.value })
    console.log('set state for Desc')
    this.props.aHFDesc(event.target.value)
    event.preventDefault()
  }

  handleVote (event) {
    this.setState({ _HFVote: event.target.value })
    console.log('set state for Vote')
    this.props.aHFVote(event.target.value)
    event.preventDefault()
  }

  handleMessage (event) {
    this.setState({ _HFNonce: event.target.value })
    console.log('set state for Nonce')
    this.props.aHFNonce(event.target.value)
    event.preventDefault()
  }

  handleNonce (event) {
    this.setState({ _HFMessage: event.target.value })
    console.log('set state for Message')
    this.props.aHFMessage(event.target.value)
    event.preventDefault()
  }

  handleFSign (event) {
    this.setState({ _HFCSign: event.target.value })
    console.log('set state for Sign')
    const signed = this.props.aHFSignature(event.target.value)
    this.setState({ _HFCSign: signed })
    event.preventDefault()
  }

  render () {
    return (
      <div className='center' id='tokenFundVote'>
        <h2>Token Fund Proposal</h2>
        <label>
          Proposal ID:<input style= { { marginLeft: '27px' } } value={this.state._HFCProposalID || this.props.HFCProposalID } onChange={this.handleProposalID} />
        </label>
        <p></p>

        <label>
          From:<input style= { { marginLeft: '69px' } } value={this.state._HFFromAddr || this.props.HFCFromAddr } onChange={this.handleFromAddr} />
        </label>
        <p></p>

        <label>
          To:<input style= { { marginLeft: '90px' } } value={this.state._HFToAddr || this.props.HFCToAddr } onChange={this.handleToAddr} />
        </label>
        <p></p>

        <label>
          Amount:<input style= { { marginLeft: '48px' } } value={this.state._HFAmount || this.props.HFCAmount } onChange={this.handleAmount} />
        </label>
        <p></p>

        <label>
          Description:<input style= { { marginLeft: '26px' } } value={this.state._HFDesc || this.props.HFCDesc } onChange={this.handleDesc} />
        </label>
        <p></p>

        <label>
          Vote:<input style= { { marginLeft: '73px' } } value={this.state._HFVote || this.props.HFCVote } onChange={this.handleVote} />
        </label>
        <p></p>

        <label>
          Message:<input style= { { marginLeft: '43px' } } value={this.state._HFMessage || this.props.HFCMessage } onChange={this.handleMessage} />
        </label>
        <p></p>

        <label>
          Nonce:<input style= { { marginLeft: '59px' } } value={this.state._HFNonce || this.props.HFCNonce } onChange={this.handleNonce} />
        </label>
        <p></p>

        <label>
          Signature:<input style= { { marginLeft: '37px' } } value={this.state._HFSignature || this.props.HFCSignature } readOnly={true} />
        </label>
        <p></p>

        <button onClick={this.handleCreate}>Create</button>
        <button onClick={this.handleFSign}>Sign</button>
        <button onClick={this.handleFVote}>Vote</button>
        <button onClick={this.handleComplete}>Complete</button>
      </div>
    )
  }
}
