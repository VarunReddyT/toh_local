import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Navbar({ signInButton, setCookie }) {
  const navigate = useNavigate()
  const handleLogOut = async (e) => {
    e.preventDefault()
    const response = await axios.get(`http://${window.location.hostname}:4000/logout`, { withCredentials: true })
    if (response.data) {
      setCookie(null)
      navigate('/');
    }

  }
  return (
    <nav className="container navbar navbar-expand-lg  border border-2 border-white rounded-5 w-75 mt-3  border-body fixed-top " style={{background:'black'}}data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" type='button' className="btn btn-light btn-outline-dark rounded-5 me-2" >HOME</Link>
        <button className="navbar-toggler rounded-5 border border-2 border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">AboutUs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stats">Statistics</Link>
            </li>
          </ul>
          {signInButton && (
            <Link to="/toll" className="nav-item btn btn-light btn-outline-dark rounded-5 ">Toll Sign In</Link>
          )}
          {!signInButton && (<button onClick={handleLogOut} className="nav-item btn rounded-5 btn-danger btn-outline-dark text-white">Sign Out</button>
          )}
        </div>
      </div>
    </nav>
  )
}
