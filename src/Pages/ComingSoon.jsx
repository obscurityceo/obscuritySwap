import { Outlet, Link } from 'react-router-dom'
import React from 'react'
// import backgroundVideo from '../file.mp4'

export class ComingSoon extends React.Component {
  constructor (props) {
    super()
    this.state = {
      welcomePage: null
    }
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
      </nav>

      <Outlet />
      </>
      <div id='belowHeader'>
        <h1>Coming Soon or 404 page not found</h1>
      </div>
    </div>
    )
  }
}
