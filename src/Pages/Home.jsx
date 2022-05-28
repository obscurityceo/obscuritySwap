import { Outlet, Link } from 'react-router-dom'
import React from 'react'
import '../App.css'
// import backgroundVideo from '../file.mp4'

export class Home extends React.Component {
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
      <div>
        <h1>obscurityDAO</h1>
        <div>
          <p>*obscurity will never ask for a nemonic or private key. Never send Ethereum directly to the token contract.* For more tips on security, visit https://ethereum.org/en/security The obscurity ecosystem - consisting of crypto currencies/tokens, NFT&apos;s and NFT marketplace, a Swap, and Play-to-Earn Gaming, will be launching in the coming months and years!</p>
          <p>Our Mission: Through art and community build, grow and inspire one another to be their best self. Our open source token releases are community owned and driven. The (TBD: WELLS*) coin will be the governance token of the community, ownership of said future token will grant voting rights to token owners to determine the future direction of the network.</p>
          <ul id='coreValuesUL'>
            Core Values:
            <li id='coreValuesIL'>Privacy and Anonymity are respected.</li>
            <li id='coreValuesIL'>Zero censorship policy.</li>
            <li id='coreValuesIL'>Decency and Respect are expected.</li>
            <li id='coreValuesIL'>Supporting veterans and others who need and deserve mental health guidance.</li>
            <li id='coreValuesIL'>Providing liquidity to charitable organizations in an open and transparent manner.</li>
          </ul>
          <h2>*NOTES:</h2>
          <p>*Do not use the built in buy send swap functions in MetaMask. Swap functionality will be comming soon. Use the Buy/Send page to purchase or send your tokens.</p>
          <p>**obscurity will never ask for a nemonic or private key. Never send Ethereum directly to the token contract.* For more tips on security, visit https://ethereum.org/en/security The obscurity ecosystem - consisting of crypto currencies/tokens, NFT&apos;s and NFT marketplace, a Swap, and Play-to-Earn Gaming, will be launching in the coming months and years!</p>
        </div>
      </div>
    </div>
    )
  }
}
