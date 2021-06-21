import { Link } from 'react-router-dom'
function NotAuthorized() {

  return (
    <div>


      <>

        <p>Unauthorized request! Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> in order to proceed. Otherwise, you can head back to the <Link className="homepage-link" to="/">homepage</Link>.</p>

      </>


    </div>
  )
}
export default NotAuthorized