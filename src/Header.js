import { Link, useParams } from 'react-router-dom'
import React from 'react'
import './Header.css'

const HeaderLink = ({ page, selected }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1)
  let className = selected ? 'headerlink-no-link ' : ''
  className += 'headerlink-title'

  return (
    <Link to={`/${page}`} className={className}>
      {title}

    </Link>
  )
}

const Header = () => {
  const page = useParams().page

  return (
    <div className='header'>
      <HeaderLink page='Home' selected={page === 'Home'} />
      <HeaderLink page='CharityWallet' selected={page === 'CharityWallet'} />
      <HeaderLink page='CompanyWallet' selected={page === 'CompanyWallet'} />
      <HeaderLink page='TokenContract' selected={page === 'TokenContract'} />
      <HeaderLink page='BuyTokens' selected={page === 'BuyTokens'} />
    </div>
  )
}

export default Header
