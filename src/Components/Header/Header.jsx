import React from 'react'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import {ImSearch} from 'react-icons/im'
import '../../Styles/header.scss'
 
const Header = () => {
  return (
    <nav className='header'>

        <img src={logo} alt='logo'/>
        <div>
            <Link to={'/tvshows'}>TV Shows</Link>
            <Link to={'/movies'}>Movies</Link>
            <Link to={'/recently-added'}>Recently Added</Link>
            <Link to={'/mylist'}>My List</Link>
        </div>
        <ImSearch/>

    </nav>
  )
}

export default Header