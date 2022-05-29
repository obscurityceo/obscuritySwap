
import React from 'react'
import { useMediaQuery } from 'react-responsive'

import { Desktop } from './components/Desktop.jsx'
import { Mobile } from './components/Mobile.jsx'
import { Tablet } from './components/Tablet.jsx'

const Dtop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tab = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mob = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

class App extends React.Component {
  constructor () {
    super()
    this.loaded = null
  }

  render () {
    return (
      <div>
        <Dtop><Desktop /></Dtop>
        <Tab><Tablet /></Tab>
        <Mob><Mobile /></Mob>
      </div>
    )
  }
}

export default App
