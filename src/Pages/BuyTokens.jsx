// import React, { useEffect } from 'react'
import React from 'react'
import { ethers } from 'ethers'

import { Outlet, Link } from 'react-router-dom'

import '../App.css'
// import backgroundVideo from '../file.mp4'
import { UpdateForm } from '../components/UpdateForm'
import SaleArtifact from '../contracts/Crowdsale.sol/crowdsalePhaseZero.json'
import ContractArtifact from '../contracts/obscurityDAO.sol/obscurityDAO.json'
import { BuyTokensForm } from '../components/BuyTokensForm.jsx'
import { SendTokensForm } from '../components/SendTokensForm.jsx'

export class BuyTokens extends React.Component {
  constructor (props) {
    super(props)
    this.provider = this.props.provider
    this.contract = null
    this.saleContract = null
    this.state = {
      owner: null,
      obsc: '',
      symbol: 'obsc',
      currentBalance: 0,
      to: '0x0',
      amount: 1,
      sendTo: '0x0',
      sendAmount: 1
    }
    this.aHandleTo = this.aHandleTo.bind(this)
    this.aHandleAmount = this.aHandleAmount.bind(this)
    this.submitBuy = this.submitBuy.bind(this)

    this.aHandleSendTo = this.aHandleSendTo.bind(this)
    this.aHandleSendAmount = this.aHandleSendAmount.bind(this)
    this.submitSend = this.submitSend.bind(this)

    this.onConnected = this.onConnected.bind(this)
    this.onDisconnected = this.onDisconnected.bind(this)

    this.setContract = this.setContract.bind(this)
    this.setSaleContract = this.setSaleContract.bind(this)
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
      to: '0x0',
      amount: 0,
      sendTo: '0x0',
      sendAmount: 0
    })
  }

  async setContract () {
    this.contract = new ethers.Contract('0x1d036Bbb3535a112186103a51A93B452307Ebd30',
      ContractArtifact.abi,
      this.provider.getSigner(0)
    )
  }

  async setSaleContract () {
    this.saleContract = new ethers.Contract('0xD97c81Bf6e1fdfCaaF77724edd86f94A405D798B',
      SaleArtifact.abi,
      this.provider.getSigner(0)
    )
  }

  async onConnected () {
    if (this.provider === null) {
      this.provider = this.props.getProvider()
    }
    try {
      if (this.provider !== null) {
        this.setSaleContract()
        this.setContract()

        this.state.owner = this.provider.getSigner(0)
        const currentSymbol = await this.contract.connect(this.state.owner).symbol()
        const currentBalance = ethers.utils.formatEther(await this.contract.connect(this.state.owner).balanceOf((this.state.owner).getAddress()))
        this.setState({
          obsc: this.contract,
          symbol: currentSymbol,
          currentBalance: currentBalance,
          to: this.state.to,
          amount: this.state.amount
        })
      }
    } catch (error) {
    }
  }

  async submitBuy () {
    const shortenedTo = this.state.to.substr(0, 5) + '...' + this.state.to.substr(38)
    const obscAmount = this.state.amount * (5000000000 / 200)
    window.alert('Attempting to buy, if the transaction looks incorrect do not proceed\n\n To: ' + shortenedTo + '\n ETH Amount Sent: ' + this.state.amount + '\n OBSC Received: ' + obscAmount)
    if (this.provider === null) {
      this.onConnected()
    }
    try {
      if (this.saleContract === null) {
        this.setSaleContract()
        console.log(this.saleContract)
        this.state.owner = this.provider.getSigner(0)
      }
      if (this.saleContract !== null) {
        await this.saleContract.connect(this.state.owner).buyTokens(
          this.state.to, { value: ethers.utils.parseEther(this.state.amount) }
        )
      }
    } catch (error) {
      window.alert('Failed to Buy', error)
      return
    }
    window.alert('Sent Buy')
  }

  async submitSend () {
    const fee = (this.state.sendAmount * 0.0007)
    const amountAfterFee = (this.state.sendAmount - fee)
    const shortenedTo = this.state.sendTo.substr(0, 5) + '...' + this.state.sendTo.substr(38)
    window.alert('Attempting to transfer, if the transaction looks incorrect do not proceed:\n\nTo: ' + shortenedTo + '\n Original Amount: ' + this.state.sendAmount + '\n Fee: ' + fee + '\nAmount after fee: ' + amountAfterFee)
    if (this.provider === null) {
      this.onConnected()
    }
    try {
      if (this.contract === null) {
        this.setContract()
        console.log(this.contract)
        this.state.owner = this.provider.getSigner(0)
      }
      if (this.contract !== null) {
        await this.contract.connect(this.state.owner).transfer(
          this.state.sendTo, ethers.utils.parseEther(this.state.sendAmount)
        )
      }
    } catch (error) {
      window.alert('Failed to Transfer', error)
      return
    }
    window.alert('Sent Transfer')
  }

  aHandleAmount (event) {
    this.setState({
      amount: event
    })
    console.log('aAmount', this.state.amount)
  }

  aHandleTo (event) {
    this.setState({
      to: event
    })
    console.log('ato', this.state.to)
  }

  aHandleSendAmount (event) {
    this.setState({
      sendAmount: event
    })
    console.log('sAmount', this.state.sendAmount)
  }

  aHandleSendTo (event) {
    this.setState({
      sendTo: event
    })
    console.log('sto', this.state.SendTo)
  }

  render () {
    return (
    <div className='BuyTokens'>
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
        <h1>obscurityDAO: Buy/Send Tokens</h1>
        <div className='left'>
          <UpdateForm
            onConnected={this.onConnected}
            _currentBalance={this.state.currentBalance}
            _symbol={this.state.symbol}
          />
        </div>
        <div className='center'>
          <BuyTokensForm
            _to={this.state.to}
            _amount={this.state.amount}
            aHandleTo={this.aHandleTo}
            aHandleAmount={this.aHandleAmount}
            submitBuy={this.submitBuy}
          />
        </div>
        <div className='center'>
          <SendTokensForm
            _sendTo={this.state.sendTo}
            _sendAmount={this.state.sendAmount}
            aHandleSendTo={this.aHandleSendTo}
            aHandleSendAmount={this.aHandleSendAmount}
            submitSend={this.submitSend}
          />
        </div>
    </div>
    )
  }
}
