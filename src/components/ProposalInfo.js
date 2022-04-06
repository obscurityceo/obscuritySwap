import React from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'


export class OnboardingButton extends React.Component {
  constructor (props) {
    super(props)

    	this.state = {

    	}

    }

    connectMetaMask () {
    // Request to connect to the MetaMask wallet
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => this.setState({ accounts }))
  }

}