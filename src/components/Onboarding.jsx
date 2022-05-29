import React from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
const MAINNET_PARAMS = {
  chainId: '0x1',
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
  blockExplorerUrls: ['https://etherscan.io']
}

const LOCALHOST_PARAMS = {
  chainId: '0x7a69',
  chainName: 'Localhost',
  nativeCurrency: {
    name: 'Local Host',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['http://localhost:8545']
}

const MAINNET_NETWORK_PARAMS = MAINNET_PARAMS
const LOCALHOST_NETWORK_PARAMS = LOCALHOST_PARAMS

const isMainnet = (chainId) => (
  chainId &&
  chainId.toLowerCase() === MAINNET_PARAMS.chainId.toLowerCase()
)

const isLocalhost = (chainId) => (
  chainId &&
  chainId === LOCALHOST_PARAMS.chainId
)

export class OnboardingButton extends React.Component {
  constructor (props) {
    super(props)
    this.connectInfo = null
    this.connected = false
    this.state = {
      accounts: [],
      chainId: null,
      onboarding: new MetaMaskOnboarding()
    }

    this.connectMetaMask = this.connectMetaMask.bind(this)
    this.onDisconnected = this.onDisconnected.bind(this)
  }

  componentDidMount () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      // Update account if the user switches accounts in MetaMask
      window.ethereum.on('accountsChanged', (accounts) => {
        this.setState({ accounts })
        window.location.reload()
      })

      // Reload the site if the user selects a different chain
      window.ethereum.on('chainChanged', (chainId) => {
        this.setState({ chainId })
        window.location.reload()
      })

      window.ethereum.on('connect', (connectInfo) => {
        const chainId = connectInfo.chainId
        console.log('connect chain', chainId)
        this.setState({ chainId })
      })
    }
  }

  componentWillUnmount () {
    window.ethereum.removeListener('accountsChanged', () => this.onDisconnected())
    window.ethereum.removeListener('chainChanged', () => this.doNothing())
  }

  async onDisconnected () {
    this.provider = null
    this.setState({
      accounts: [],
      chainId: null,
      connected: false,
      onboarding: null
    })
  }

  doNothing () {}

  async connectMetaMask () {
    this.connectInfo = null
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => this.setState({ accounts }))
  }

  switchToRinkebyChain () {
    // Request to switch to the selected Avalanche network
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [LOCALHOST_NETWORK_PARAMS]
      })
  }

  switchToMainnetChain () {
    // Request to switch to the selected Avalanche network
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [MAINNET_NETWORK_PARAMS]
      })
  }

  render () {
    if (this.state.accounts.length > 0) {
      this.connected = true
    }
    console.log('connected', this.connected)
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      // If MetaMask is not yet installed, ask the user to start the MetaMask onboarding process
      // (install the MetaMask browser extension).
      return (
        <div>
          <div>To run this dApp you need the MetaMask Wallet installed.</div>
        </div>
      )
    }
    if (isMainnet(this.state.chainId) && this.connected) {
      return (
        <div>
        </div>
      )
    } else if (isLocalhost(this.state.chainId) && this.connected) {
      return (
        <div>
          MetaMask Wallet connected to localhost! Chain: {this.state.chainId} Account: {this.state.accounts[0]}
        </div>
      )
    } else {
      return (
        <div className='center'>
          <p>*MetaMask Wallet not connected or you need to change your network.</p>
          <p>Click connect or change your network to interact with the token and contracts</p>
          <div className='right'>
            <button onClick={this.connectMetaMask}>Connect</button>
          </div>
        </div>
      )
    }
  }
}
