import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useRef,useEffect } from 'react';


// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
export default function Navbar({ signInButton }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  // const handleLogOut = async (e) => {
  //   e.preventDefault()
  //   const response = await axios.get(`http://${window.location.hostname}:4000/logout`, { withCredentials: true })
  //   if (response.data) {
  //     navigate('/toll/logoutwarning');
  //   }
  // }
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, navigate]);

  function handleOpenModal() {
    setModal(true);
  }
  function handleCloseModal() {
    setModal(false);
    navigate('/');
  }
  function modalClose() {
    setModal(false);
  }

  return (
    <nav className="container navbar navbar-expand-lg border border-2 border-white rounded-5 w-75 mt-3  border-body fixed-top" style={{ background: '#333333' }} data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="btn btn-light btn-outline-dark rounded-5 me-2" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
            <Link className='nav-item btn btn-light btn-outline-dark rounded-5' type='button' to="/toll">Toll Sign In</Link>
          )}

          {!signInButton && (
            <div>
              <button type="button" className="nav-item btn rounded-5 btn-danger btn-outline-dark text-white" data-bs-target="#exampleModal" onClick={handleOpenModal}>Sign Out</button>
            </div>
          )
          }
          {modal && (
            <div>
              <div className="modal show" style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} data-bs-dismiss='modal'>
                <div className="modal-dialog" style={{ width: '100%', margin: 'auto' }}>
                  <div className="modal-content" ref={modalRef}>
                    <div className="modal-header text-light">
                      <button type="button" className="btn-close" onClick={modalClose} data-bs-dismiss='modal' ></button>
                    </div>
                    <div className="modal-body" style={{ color: 'white' }}>
                      Are you sure ?
                    </div>
                    <div class="modal-footer">
                      <button type="button" className="nav-item btn rounded-5 btn-danger btn-outline-dark text-white" data-bs-dismiss='modal' onClick={handleCloseModal}>Sign Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}