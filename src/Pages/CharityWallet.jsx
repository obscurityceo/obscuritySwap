import React from 'react'
// import { UpdateForm } from '../components/UpdateForm'
import { ethers } from 'ethers'

import { Outlet, Link } from 'react-router-dom'

import '../App.css'
// import backgroundVideo from '../file.mp4'

import ContractArtifact from '../contracts/obscurityDAO.sol/obscurityDAO.json'

export class CharityWallet extends React.Component {
  constructor (props) {
    super(props)
    this.contract = null
    this.provider = this.props.provider
    this.state = {
      owner: null,
      obsc: '',
      symbol: 'obsc',
      currentBalance: 123
    }
  }

  componentDidMount () {
    window.ethereum.on('accountsChanged', () => this.onConnected())
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
    } catch (error) {
      return
    }

    this.state.owner = this.provider.getSigner(0)
    const currentSymbol = await this.contract.connect(this.state.owner).symbol()
    const currentBalance = ethers.utils.formatEther(await this.contract.connect(this.state.owner).balanceOf((this.state.owner).getAddress()))

    this.setState({
      obsc: this.contract,
      symbol: currentSymbol,
      currentBalance: currentBalance
    })
  }

  render () {
    return (
    <div className='CharityWallet'>
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
      </nav>

      <Outlet />
      </>
        <h1>obscurityDAO</h1>
        Charity Wallet: Coming Soon
    </div>
    )
  }
}
