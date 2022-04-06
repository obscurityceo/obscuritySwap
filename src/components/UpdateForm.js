import React from 'react'

export class UpdateForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      _currentBalance: 0,
      _symbol: 'not fetched',
      _proposalID: 1,
      _founderVote: 0,
      _to: '0x0',
      _amount: 1,
      _message: 'some signature message',
      _nounce: 0,
      _hasSignature: false
      // proposalIDs: [],
      // proposalState: [],
      // proposalDesc: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSymbol = this.handleSymbol.bind(this)
    this.handleSubmitVote = this.handleSubmitVote.bind(this)
    this.handleSign = this.handleSign.bind(this)
    this.handleProposalID = this.handleProposalID.bind(this)
    this.handleFounderVote = this.handleFounderVote.bind(this)

    this.handleTo = this.handleTo.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.handleNonce = this.handleNonce.bind(this)
  }

  handleChange (event) {
    this.props.updateContractBalance('0x6af8786B1C879Cc5949c3b42566b063AdB8a0feC')
  }

  handleSymbol (event) {
    this.setState({ _symbol: event.target.value })
  }

  handleSubmitVote (event) {
    console.log('submitted vote')
    this.props.submitVote()
    event.preventDefault()
  }

  handleSign (event) {
    const temp = this.props.signMessage('0x6af8786B1C879Cc5949c3b42566b063AdB8a0feC')
    this.setState({ _hasSignature: temp })
    event.preventDefault()
    console.log('fake sign')
    event.preventDefault()
  }

  handleProposalID (event) {
    this.setState({ _proposalID: event.target.value })
    console.log('set state for proposal ID')
    this.props.aHandleProposalID(event.target.value)
    event.preventDefault()
  }

  handleFounderVote (event) {
    this.setState({ _founderVote: event.target.value })
    console.log('set state for vote')
    this.props.aHandleFounderVote(event.target.value)
    event.preventDefault()
  }

  handleTo (event) {
    this.setState({ _to: event.target.value })
    console.log('set state for to')
    this.props.aHandleTo(event.target.value)
    event.preventDefault()
  }

  handleMessage (event) {
    this.setState({ _message: event.target.value })
    console.log('set state for message')
    this.props.aHandleMessage(event.target.value)
    event.preventDefault()
  }

  handleAmount (event) {
    this.setState({ _amount: event.target.value })
    console.log('set state for amount')
    this.props.aHandleAmount(event.target.value)
    event.preventDefault()
  }

  handleNonce (event) {
    this.setState({ _nounce: event.target.value })
    console.log('set state for nounce')
    this.props.aHandleNonce(event.target.value)
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <div id='contractInfo'>
            <p></p>
            <label>
            Token Symbol:&nbsp;&nbsp;&nbsp;<input value={ this.props._symbol } readOnly/>
            </label>
            <p></p>
            <label>
            Current Balance: <input value={ this.props._currentBalance } readOnly/>
            </label>
            <p></p>

            <div className="dropdown">
              <button className="dropbtn">ProposalID</button>
              <div className="dropdown-content">
              </div>
            </div>
        </div>

        <div id='proposalVote'>
            <label>
              Proposal ID:&nbsp;&nbsp;&nbsp;&nbsp; <input value={this.state._proposalID || this.props.proposalID } onChange={this.handleProposalID} />
            </label>
            <p></p>
            <label>
              Founder Vote: &nbsp;<input value={this.state._founderVote || this.props._founderVote } onChange={this.handleFounderVote} />
            </label>
            <p></p>
            <label>
              To Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input value={this.state._to || this.props.to } onChange={this.handleTo} />
            </label>
            <p></p>
            <label>
              Amount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input value={this.state._amount || this.props.amount } onChange={this.handleAmount} />
            </label>
            <p></p>
            <label>
              Message:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input value={this.state._message || this.props.message } onChange={this.handleMessage} />
            </label>
            <p></p>
            <label>
              Nonce:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input value={this.state._nonce || this.props.nonce } onChange={this.handleNonce} />
            </label>
             <p></p>
            <label>
              Has Signature: <input value={this.state._hasSignature || this.props.hasSignature } readOnly={true}/>
            </label>
            <p></p>
              <button onClick={this.handleSign}>Sign</button> <button onClick={this.handleSubmitVote}>Submit</button>
        </div>
      </div>
    )
  }
}
