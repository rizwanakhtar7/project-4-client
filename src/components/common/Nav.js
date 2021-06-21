import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faFilm, faSignOutAlt, faRegistered, faFileUpload} from '@fortawesome/free-solid-svg-icons'
import siteLogo from '../../assets/images/site-logo.png'
import { isAuthenticated,removeToken } from '../../lib/auth'

function Nav() {
  const history = useHistory()
  const isLoggedIn = isAuthenticated()
  const [showColor, setShowColor] = React.useState(false)
  const [sidebarShow, setSidebarShow] = React.useState(false)
  const handleSideBar = () => setSidebarShow(!sidebarShow)


  const handleLogout = () => {
    removeToken()
    history.push('/')
  }


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
        <li><Link to="/courses/new" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faFilm} />New Course</Link></li>
        <li><Link to="/dashboard" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faSignOutAlt} />Dashboard</Link></li>
        <li><Link to="/upload" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faFileUpload} />Upload</Link></li>

        {!isLoggedIn ?
          <> 
            <li><Link to="/register" className="navbar-item"><FontAwesomeIcon className="fa-items-icon" icon={faRegistered} />Register</Link></li>
          </>
          :
          <>
            <li className="navbar-item logout-link" onClick={handleLogout}><FontAwesomeIcon className="fa-items-icon" icon={faSignOutAlt} />Log out</li>
          </>
        }
      </ul>
      
    </div>
  </>
  )
  }
export default Nav