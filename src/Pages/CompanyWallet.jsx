import React from 'react'
// import { UpdateForm } from '../components/UpdateForm'
// import { ethers } from 'ethers'
// import { OnboardingButton } from '../components/Onboarding'

import { Outlet, Link } from 'react-router-dom'

// import backgroundVideo from '../file.mp4'

// import ContractArtifact from '../contracts/obscurityDAO.sol/obscurityDAO.json'

export class CompanyWallet extends React.Component {
  constructor (props) {
    super(props)
    this.owner = null
    this.companyAddress = '0x920Bf81087C296D57B4F7f5fCfd96cA71582F066'
    this.state = {
      obsc: '',
      symbol: 'obsc',
      currentBalance: 123
      // proposalID: 1,
      // founderVote: -1,
      // to: '0x0',
      // amount: 10,
      // message: 'some signature message',
      // nonce: 2,
      // hasSignature: false,
      // signature: ''
    }
  }

  async onConnected () {
    /* this.contract = new ethers.Contract('0x1d036Bbb3535a112186103a51A93B452307Ebd30',
      ContractArtifact.abi,
      this.props.provider.getSigner(0)
    )
    this.owner = this.props.provider.getSigner(0)

    this.setState({
      obsc: this.contract,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: this.state.amount,
      message: this.state.message,
      nonce: this.state.nonce,
      hasSignature: false,
      signature: this.state.signature
    })

    this.setState({
      obsc: this.contract,
      symbol: await this.state.obsc.connect(this.owner).symbol(),
      currentBalance: ethers.utils.formatEther(await this.state.obsc.connect(this.owner).balanceOf((this.owner).getAddress())),
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: this.state.amount,
      message: this.state.message,
      nonce: this.state.nounce,
      hasSignature: false,
      signature: this.state.signature
    }) */
  }

  /*  <div>
           <UpdateForm
            _currentBalance={this.state.currentBalance}
            _symbol={this.state.symbol}
            _proposalID={this.state.proposalID}
            _founderVote={this.state.founderVote}
            _to={this.state.to}
            _amount={this.state.amount}
            _message={this.state.message}
            _nonce={this.state.nonce}
            _hasSignature={this.state.hasSignature}
            signMessage={this.signMessage}
            submitVote={this.submitVote}
            aHandleTo={this.aHandleTo}
            aHandleMessage={this.aHandleMessage}
            aHandleAmount={this.aHandleAmount}
            aHandleFounderVote={this.aHandleFounderVote}
            aHandleProposalID={this.aHandleProposalID}
            aHandleNonce={this.aHandleNonce}
          />
        </div> */
  render () {
    return (
    <div className='CompanyWallet'>
      <>
      <nav id='navigation'>
        <ul id='navigationUL'>
          <li id='navigationLI'>
            <Link to="/">Home</Link>
            </li>
          <li id='navigationLI'>
            <Link to="/CharityWallet">Charity Wallet</Link>
          </li>
          <li id='navigationLI'>
            <Link to="/CompanyWallet">Company Wallet</Link>
          </li>
          <li id='navigationLI'>
            <Link to="/TokenContract">Token Wallet</Link>
          </li>
          <li id='navigationLI'>
            <Link to="/BuyTokens">Buy/Send Tokens</Link>
          </li>
        </ul>
        <>
      <nav id='subMenu'>
        <ul id='subMenuUL'>
          <li id='subMenuLI'>
            <Link to="/tokenFundProposal">Fund Proposals</Link>
          </li>
          <li id='subMenuLI'>
            <Link to="/tokenAddressProposal">Address Proposals</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      </>
      </nav>

      <Outlet />
      </>
      <div id='belowHeader'>
        <h1>obscurityDAO</h1>
        Company Wallet: Coming Soon
      </div>
    </div>
    )
  }
}
