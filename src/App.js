import './App.css'

import React from 'react'
import { ethers } from 'ethers'

import { OnboardingButton } from './components/Onboarding'
import { UpdateForm } from './components/UpdateForm'
// import { router } from './components/Router'

// Import contract address and artifact
import ContractArtifact from './contracts/obscurityDAO_V2.sol/obscurityDAO_V2.json'
// import contractAddress from './contracts/helloworld-address.json'

import backgroundVideo from './file.mp4'

class App extends React.Component {
  constructor () {
    super()
    this.accounts = null
    this.provider = null
    this.owner = null
    this.state = {
      isConnected: false,
      obsc: '',
      symbol: 'obsc',
      currentBalance: 123,
      // proposalIDs: [],
      // proposalState: [],
      // proposalDesc: [],

      proposalID: 1,
      founderVote: -1,
      to: '0x0',
      amount: 10,
      message: 'some signature message',
      nonce: 2,
      hasSignature: false,
      signature: ''
    }

    this.onConnected = this.onConnected.bind(this)
    this.signMessage = this.signMessage.bind(this)
    this.submitVote = this.submitVote.bind(this)

    this.aHandleTo = this.aHandleTo.bind(this)
    this.aHandleMessage = this.aHandleMessage.bind(this)
    this.aHandleAmount = this.aHandleAmount.bind(this)
    this.aHandleFounderVote = this.aHandleFounderVote.bind(this)
    this.aHandleProposalID = this.aHandleProposalID.bind(this)
    this.aHandleNonce = this.aHandleNonce.bind(this)
  }

  async onConnected () {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    const temp = new ethers.Contract('0x6af8786B1C879Cc5949c3b42566b063AdB8a0feC',
      ContractArtifact.abi,
      this.provider.getSigner(0)
    )

    this.owner = this.provider.getSigner(0)

    this.setState({
      isConnected: true,
      obsc: temp,
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
      isConnected: true,
      obsc: temp,
      symbol: await this.state.obsc.connect(this.owner).symbol(),
      currentBalance: ethers.utils.formatEther(await this.state.obsc.connect(this.owner).balanceOf(this.owner.getAddress())),
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: this.state.amount,
      message: this.state.message,
      nonce: this.state.nounce,
      hasSignature: false,
      signature: this.state.signature
    })
  }

  async submitVote () {
    let tempID = 0
    let founderV = 0

    tempID = ethers.BigNumber.from(this.state.proposalID)
    founderV = ethers.BigNumber.from(this.state.founderVote)
    console.log('tempid: ', tempID)
    console.log('founderV: ', founderV)
    await this.state.obsc.connect(this.owner).founderFundVote(
      tempID,
      founderV,
      this.state.to, // to,
      this.state.amount, // amount
      this.state.message, // message
      this.state.nonce, // nonce
      this.state.signature
    )

    this.setState({
      isConnected: true,
      obsc: '',
      symbol: 'obsc',
      currentBalance: 123,
      // proposalIDs: [],
      // proposalState: [],
      // proposalDesc: [],

      proposalID: 1,
      founderVote: -1,
      to: '0x0',
      amount: 10,
      message: 'some signature message',
      nonce: 2,
      hasSignature: false,
      signature: ''
    })
  }

  async signMessage (address) {
    console.log('message: ', this.state.message)
    console.log('nounce: ', this.state.nonce)

    const kecMes = ethers.utils.arrayify(ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'string', 'uint256'], [
        this.state.to, // to,
        this.state.amount, // amount
        this.state.message, // message
        this.state.nonce // nonce
      ])
    ))
    await this.owner.signMessage(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(this.state.message)))

    this.setState({
      isConnected: true,
      obsc: this.state.obsc,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: this.state.amount,
      message: this.state.message,
      nonce: this.state.nonce,
      hasSignature: false,
      signature: await this.owner.signMessage(kecMes)
    })
  }

  aHandleProposalID (event) {
    console.log('apropose')
    this.setState({
      isConnected: this.state.isConnected,
      obsc: this.state.obsc,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: event,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: this.state.amount,
      message: this.state.message,
      nonce: this.state.nonce,
      hasSignature: this.state.hasSignature,
      signature: this.state.signature
    })
    console.log('apropose', this.state.proposalID)
  }

  aHandleFounderVote (event) {
    this.setState({
      isConnected: this.state.isConnected,
      obsc: this.state.obsc,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: this.state.proposalID,
      founderVote: event,
      to: this.state.to,
      amount: this.state.amount,
      message: this.state.message,
      nonce: this.state.nonce,
      hasSignature: this.state.hasSignature,
      signature: this.state.signature
    })
    console.log('avote', this.state.founderVote)
  }

  aHandleTo (event) {
    this.setState({
      isConnected: this.state.isConnected,
      obsc: this.state.obsc,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: event,
      amount: this.state.amount,
      message: this.state.message,
      nonce: this.state.nonce,
      hasSignature: this.state.hasSignature,
      signature: this.state.signature
    })
    console.log('ato', this.state.to)
  }

  aHandleMessage (event) {
    this.setState({
      isConnected: this.state.isConnected,
      obsc: this.state.obsc,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: this.state.amount,
      message: event,
      nonce: this.state.nonce,
      hasSignature: this.state.hasSignature,
      signature: this.state.signature
    })
    console.log('amessage', this.state.message)
  }

  aHandleAmount (event) {
    console.log('a: ', event)
    this.setState({
      isConnected: this.state.isConnected,
      obsc: this.state.obsc,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: event,
      message: this.state.message,
      nonce: this.state.nonce,
      hasSignature: this.state.hasSignature,
      signature: this.state.signature
    })
    console.log('aAmount', this.state.amount)
  }

  aHandleNonce (event) {
    this.setState({
      isConnected: this.state.isConnected,
      obsc: this.state.obsc,
      symbol: this.state.symbol,
      currentBalance: this.state.currentBalance,
      proposalID: this.state.proposalID,
      founderVote: this.state.founderVote,
      to: this.state.to,
      amount: this.state.amount,
      message: this.state.message,
      nonce: event,
      hasSignature: this.state.hasSignature,
      signature: this.state.signature
    })
    console.log('anonce', this.state.nonce)
  }

  render () {
    return (
      <div className="App">
        <video autoPlay loop muted style=
        {
          {
            position: 'absolute',
            left: '0',
            top: '0',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%,',
            zIndex: -1,
            width: '100%'
          }
        }
        >
          <source src={backgroundVideo} type='video/mp4'/>
        </video>
        <h1>obscurityDAO</h1>
        <OnboardingButton onConnected={this.onConnected} />
        {this.state.isConnected &&
          <div>
            <div>
            </div>
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
          </div>
        }
      </div>
    )
  }
}

export default App
