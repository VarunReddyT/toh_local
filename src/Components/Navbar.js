import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Navbar() {
    const[navbar,setNavbar] = useState(true);

    const handleNavbar = ()=>{
        setNavbar(null);
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body fixed-top" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">TiresOnHighways</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/aboutus">AboutUs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/faq">FAQ</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/stats">Statistics</Link>
        </li>
      </ul>
      <li className="nav-item">
        {navbar && 
         <Link className="btn btn-outline-light" onClick={handleNavbar} to="/toll">Toll Sign In</Link>
         }
      </li>
    </div>
  </div>
</nav>
  )
}