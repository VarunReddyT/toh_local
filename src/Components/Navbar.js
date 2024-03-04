import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';


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
            <Link className='nav-item btn btn-light rounded-5' type='button' to="/toll">Toll Sign In</Link>
          )}

          {!signInButton && (
            <div>
              <button type="button" className="nav-item Btn" data-bs-target="#exampleModal" onClick={handleOpenModal}>
                <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                <div class="text">Logout</div>
              </button>
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
