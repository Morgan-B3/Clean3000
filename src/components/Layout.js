import React from 'react'
import Header from './Header'

const Layout = ({isHome = false, children}) => {
  return (
    <div>
        <Header isHome={isHome}/>
        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout