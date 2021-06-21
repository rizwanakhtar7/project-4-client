import { Link } from 'react-router-dom'

function NotFound() {
  
  return (
      <div className="main-content-container">
        <p className="error-redirect">
          Uh oh! The requested URL was not found on our server. <br/>
          Head back to  
          <Link to="/"> E-Learn</Link> </p>
         
      </div>
  )
}
export default NotFound