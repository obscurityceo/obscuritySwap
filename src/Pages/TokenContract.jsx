import React from 'react'
import { UpdateForm } from '../components/UpdateForm'

import { TokenAddrPropComplete } from '../components/TokenAddrPropForms.jsx'
import { TokenFundPropComplete } from '../components/TokenFundPropForms.jsx'

import { ethers } from 'ethers'

import { Outlet, Link } from 'react-router-dom'

import '../App.css'
// import backgroundVideo from '../file.mp4'

import ContractArtifact from '../contracts/obscurityDAO.sol/obscurityDAO.json'

export class TokenContract extends React.Component {
  constructor (props) {
    super(props)
    this.contract = null
    this.provider = this.props.provider
    this.state = {
      owner: null,
      obsc: '',
      symbol: 'obsc',
      currentBalance: 0,
      HACProposalID: 1,

      HFCProposalID: 1,
      HFCFromAddr: 0x0,
      HFCToAddr: 0x0,
      HFCAmount: 0,
      HFCDesc: 0x0,
      HFCVote: 0,
      HFCMessage: '',
      HFCNonce: '',
      HFCSignature: false
    }

    this.SubmitHAC = this.SubmitHAC.bind(this)
    this.aHACProposalID = this.aHACProposalID.bind(this)

    this.SubmitHFC = this.SubmitHFC.bind(this)
    this.SubmitHFV = this.SubmitHFV.bind(this)
    this.SubmitHFCR = this.SubmitHFCR.bind(this)
    this.aHFProposalID = this.aHFProposalID.bind(this)
    this.aHFFromAddr = this.aHFFromAddr.bind(this)
    this.aHFToAddr = this.aHFToAddr.bind(this)
    this.aHFAmount = this.aHFAmount.bind(this)
    this.aHFDesc = this.aHFDesc.bind(this)
    this.aHFVote = this.aHFVote.bind(this)
    this.aHFMessage = this.aHFMessage.bind(this)
    this.aHFNonce = this.aHFNonce.bind(this)
    this.aHFSignature = this.aHFSignature.bind(this)

    this.onConnected = this.onConnected.bind(this)
    this.onDisconnected = this.onDisconnected.bind(this)

    this.setContract = this.setContract.bind(this)
  }

  componentDidMount () {
    window.ethereum.on('accountsChanged', () => this.onConnected())
  }

  componentWillUnmount () {
    window.ethereum.removeListener('accountsChanged', () => this.onDisconnected())
  }

  async onDisconnected () {
    this.provider = null
    this.setState({
      obsc: '',
      owner: null,
      symbol: '',
      currentBalance: 0,
      HACProposalID: 0,
      HFCProposalID: 0,
      HFCFromAddr: 0x0,
      HFCToAddr: 0x0,
      HFCAmount: 0,
      HFCDesc: 0x0,
      HFCVote: 0,
      HFCMessage: '',
      HFCNonce: '',
      HFCSignature: false
    })
  }

  async onConnected () {
    if (this.provider === null) {
      this.provider = this.props.getProvider()
    }
    try {
      if (this.provider === null) {
        this.contract = new ethers.Contract('0x1d036Bbb3535a112186103a51A93B452307Ebd30',
          ContractArtifact.abi,
          this.provider.getSigner(0)
        )
      }
      this.state.owner = this.provider.getSigner(0)
      const currentSymbol = await this.contract.connect(this.state.owner).symbol()
      const currentBalance = ethers.utils.formatEther(await this.contract.connect(this.state.owner).balanceOf((this.state.owner).getAddress()))
      this.setState({
        obsc: this.contract,
        symbol: currentSymbol,
        currentBalance: currentBalance,
        HACProposalID: this.state.HACProposalID,
        HFCProposalID: this.state.HFCProposalID
      })
    } catch (error) {
    }
  }

  async setContract () {
    this.contract = new ethers.Contract('0x1d036Bbb3535a112186103a51A93B452307Ebd30',
      ContractArtifact.abi,
      this.provider.getSigner(0)
    )
  }

  async SubmitHAC () {
    let tempID = 0

    tempID = ethers.BigNumber.from(this.state.HACProposalID)
    await this.state.obsc.connect(this.owner).completeAddrTransferProposal(
      tempID
    )

    this.setState({
      HACProposalID: 0
    })
  }

  aHACProposalID (event) {
    console.log('apropose')
    this.setState({
      HACProposalID: event
    })
    console.log('apropose', this.state.HACProposalID)
  }

  async SubmitHFC () {
    let tempID = 0

    tempID = ethers.BigNumber.from(this.state.HFCProposalID)
    await this.state.obsc.connect(this.owner).completeAddrTransferProposal(
      tempID
    )

    this.setState({
      HFCProposalID: 0
    })
  }

  async SubmitHFV (event) {
    try {
      await this.state.obsc.connect(this.owner).founderFundVote(
        ethers.BigNumber.from(this.state.proposalID),
        ethers.BigNumber.from(this.state.founderVote),
        this.state.aHFToAddr, // to,
        this.state.aHFAmount, // amount
        this.state.aHFMessage, // message
        this.state.aHFNonce, // nonce
        this.state.aHFSignature
      )
    } catch (error) {
      return false
    }
    return true
  }

  async SubmitHFCR (event) {
    console.log('HFCR')
  }

  aHFProposalID (event) {
    this.setState({
      HFCProposalID: event
    })
    console.log('apropose', this.state.HFCProposalID)
  }

  async aHFFromAddr (event) {
    console.log('HFaHFFromAddrFromAddr')
  }

  async aHFToAddr (event) {
    console.log('HFToAddr')
  }

  async aHFAmount (event) {
    console.log('aHFAmount')
  }

  async aHFDesc (event) {
    console.log('aHFDesc')
  }

  async aHFVote (event) {
    console.log('aHFVote')
  }

  async aHFMessage (event) {
    console.log('aHFMessage')
  }

  async aHFNonce (event) {
    console.log('aHFNonce')
  }

  async aHFSignature (event) {
    try {
      const kecMes = ethers.utils.arrayify(ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(['address', 'uint256', 'string', 'uint256'], [
          this.state.to, // to,
          this.state.amount, // amount
          this.state.message, // message
          this.state.nonce // nonce
        ])
      ))
      await this.owner.signMessage(kecMes)
    } catch (error) {
      return false
    }
    this.state.HFSignature = true
    return true
  }

  render () {
    return (
    <div className='TokenContract'>
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
            <Link to="/FundProposal">Fund Proposals</Link>
          </li>
          <li id='subMenuLI'>
            <Link to="/AddressProposal">Address Proposals</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      </>
      </nav>

      <Outlet />
      </>
        <h1>obscurityDAO: Token Contract</h1>
        <div className='left'>
          <UpdateForm
            onConnected={this.onConnected}
            _currentBalance={this.state.currentBalance}
            _symbol={this.state.symbol}
          />
        </div>
        <div>
          <div className='center'>
            <TokenFundPropComplete
              _HFCProposalID={this.state.HFCroposalID}
              _HFFromAddr={this.state.HFFromAddr}
              _HFToAddr={this.state.HFToAddr}
              _HFAmount={this.state.HFAmount}
              _HFDesc={this.state.HFDesc}
              _HFVote={this.state.HFVote}
              _HFMessage={this.state.HFMessage}
              _HFNonce={this.state.HFNonce}
              _HFSignature={this.state.HFSignature}

              SubmitHFC={this.SubmitHFC}
              SubmitHFV={this.SubmitHFV}
              SubmitHFCR={this.SubmitHFCR}

              aHFProposalID={this.aHFProposalID}
              aHFFromAddr={this.aHFFromAddR}
              aHFToAddr={this.aHFToAddr}
              aHFAmount={this.aHFAmount}
              aHFDesc={this.aHFDesc}
              aHFVote={this.aHFVote}
              aHFMessage={this.aHFMessage}
              aHFNonce={this.aHFNonce}
              aHFSignature={this.aHFSignature}
            />
          </div>
        </div>
        <div className='center'>
          <TokenAddrPropComplete
            _HACProposalID={this.state.HACProposalID}
            SubmitHAPC={this.SubmitHAC}
            aHACProposalID={this.aHACProposalID}
          />
        </div>
      </div>
    )
  }
}
