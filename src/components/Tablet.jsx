import React from 'react'

import './componentCSS/tablet.css'
import { ethers } from 'ethers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { OnboardingButton } from '../components/Onboarding.jsx'
import { CompanyWallet } from '../Pages/CompanyWallet.jsx'
import { CharityWallet } from '../Pages/CharityWallet.jsx'
import { TokenContract } from '../Pages/TokenContract.jsx'
import { Home } from '../Pages/Home.jsx'
import { BuyTokens } from '../Pages/BuyTokens.jsx'
import { ComingSoon } from '../Pages/ComingSoon.jsx'
import backgroundVideo from '../file.mp4'
export class Tablet extends React.Component {
  constructor (props) {
    super(props)
    this.provider = null
    this.state = {
      isConnected: false
    }
    this.onConnected = this.onConnected.bind(this)
    this.getProvider = this.getProvider.bind(this)
  }

  getProvider () {
    console.log('return provider')
    if (this.provider === null) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
    }
    return this.provider
  }

  async onConnected () {
    if (this.provider === null) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
    }
    console.log('getting new provider')
    return this.provider
  }

  render () {
    return (
    <div className="desktop">
      <div id='belowHeader'>
        <OnboardingButton onConnected={this.onConnected}/>
      </div>
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
          width: '100%',
          filter: 'brightness(40%)'
        }
      }
      >
        <source src={backgroundVideo} type='video/mp4'/>
      </video>
      <BrowserRouter>
       <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/CharityWallet' element={<CharityWallet {...this}/>} />
          <Route path='/CompanyWallet' element={<CompanyWallet {...this}/>} />
          <Route path='/TokenContract' element={<TokenContract {...this}/>} />
          <Route path='/BuyTokens' element={<BuyTokens {...this}/>} />
          <Route path='*' exact={true} element={<ComingSoon/>} />
        </Routes>
      </BrowserRouter>
    </div>
    )
  }
}
