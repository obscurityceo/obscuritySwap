import React from 'react'

export class TokenAddrPropComplete extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      _proposalID: 1
    }

    this.handleComplete = this.handleComplete.bind(this)
    this.handleProposalID = this.handleProposalID.bind(this)
  }

  handleComplete (event) {
    console.log('submitted')
    this.props.SubmitHAPC()
    event.preventDefault()
  }

  handleProposalID (event) {
    this.setState({ _proposalID: event.target.value })
    console.log('set state for proposal ID')
    this.props.aHACProposalID(event.target.value)
    event.preventDefault()
  }

  render () {
    return (
      <div className='center' id='tokenAddrVote'>
        <h2>Token Address Proposal</h2>
        <label>
          Proposal ID:&nbsp;&nbsp;<input value={this.state._proposalID || this.props._HACProposalID } onChange={this.handleProposalID} />
        </label>
        <p/>
        <button onClick={this.handleComplete}>Create</button>
        <button onClick={this.handleComplete}>Sign</button>
        <button onClick={this.handleComplete}>Vote</button>
        <button onClick={this.handleComplete}>Complete</button>
      </div>
    )
  }
}
