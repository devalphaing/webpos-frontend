import React from 'react'
import Navbar from '../layout/Navbar'

const Layout = (props)=> {
  return (
        <div>
          <Navbar setIsLoggedIn={props.setIsLoggedIn}/>
            {props.children}    
        </div>
  )
}
export default Layout;