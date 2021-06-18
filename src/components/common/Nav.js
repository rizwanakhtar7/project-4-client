import React from 'react'
import { Link } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faFilm} from '@fortawesome/free-solid-svg-icons'
import siteLogo from '../../assets/images/site-logo.png'

function Nav(){
  const [showColor, setShowColor] = React.useState(false)
  const [sidebarShow, setSidebarShow] = React.useState(false)
  const handleSideBar = () => setSidebarShow(!sidebarShow)

  React.useEffect(() => {
    const scrollListener = () => {
      (window.scrollY > 150) ? setShowColor(true) : setShowColor(false)
    }
    window.addEventListener('scroll', scrollListener) 
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <>
      <div className={`navbar ${showColor ? 'navbar-show-color' : 'navbar-default-color'}`}>
        <Link to="/"><img src={siteLogo} alt="Site logo" width="140" /></Link>

      <div className="menu-items-end" onClick={handleSideBar}>
        <Hamburger toggled={sidebarShow} toggle={setSidebarShow} className="test" />

      </div>
    </div>
    <div className={sidebarShow ? 'side-nav-menu-container active' : 'side-nav-menu-container'}>
      <ul className="navbar-content-container" onClick={handleSideBar}>
        <li><Link to="/" className="navbar-item" ><FontAwesomeIcon className="fa-items-icon" icon={faHome} />Home</Link></li>
        <li><Link to="/courses" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faFilm} />Courses</Link></li>
        <li><Link to="/register" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faFilm} />Register</Link></li>
      </ul>
      
    </div>
  </>
  )
  }
export default Nav