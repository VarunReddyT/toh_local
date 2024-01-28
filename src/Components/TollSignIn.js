import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader.js';

export default function TollLogin({ setSelectedToll, setSignInButton, setCookie }) {
  setSignInButton(true);
  const [toll, setToll] = useState('');
  const [pwd, setPwd] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    return () => {
      if (displayMessage) {
        setDisplayMessage(false);
      }
    };
  }, [displayMessage]);

  const handleTollChange = (event) => {
    setDisplayMessage('');
    setToll(event.target.value);
    setSelectedToll(event.target.value);
  };

  const handlePwdChange = (event) => {
    setDisplayMessage('');
    setPwd(event.target.value);
  };

  const togglePasswordVisibility = () => {
    const pwdInput = document.getElementById("pwd");
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
    } else {
      pwdInput.type = "password";
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    async function postData(formData) {
      setLoader(true);
      try {
        const response = await axios.post(`http://${window.location.hostname}:4000/login`, formData, { withCredentials: true });
        console.log(response);
        if (response.data === "Success") {
          setCookie(document.cookie);
          setSelectedToll(toll);
          setLoader(false);
          navigate('/toll/start');
        }
        else {
          setLoader(false);
          setDisplayMessage("Invalid Password");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    if (!toll && !pwd) {
      setDisplayMessage("Please select a toll plaza and enter password");
    }
    else if (!toll) {
      setDisplayMessage("Please select a toll plaza");
    }
    else if (!pwd) {
      setDisplayMessage("Please enter password");
    }
    else {
      const formData = new FormData();
      formData.append('toll', toll);
      formData.append('password', pwd);
      postData(formData);
    }


  };

  return (
    <div className='container ms-6 mt-5 d-flex justify-content-center'>
      <form className="col-12 col-md-5 shadow-lg rounded-4 p-4" style={{ backdropFilter:'blur(4px)'}} >
        <div className='row '>
          <h1 className='col' style={{color:'white'}}>Sign In to Toll Plaza</h1>
        </div>
        <div className='row'>
          <div className="col-md-6">
            <select  className="form-select border border-black mt-3 w-100" id="Select" aria-label="label select example" autoComplete="off" onChange={handleTollChange} required>
              <option selected >Select Toll Plaza</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Surat">Surat</option>
            </select>
          </div>
        </div>
        <div className="row mt-3 align-items-center">
          <div className="col-md-6"> {/* Adjust the column size based on your layout */}
            <input style={{ borderColor: 'black',color:'black' }} type="password" className="form-control" id="pwd" required value={pwd} placeholder="Password" onChange={handlePwdChange} />
          </div>
          <div className="col-md-6"> {/* Adjust the column size based on your layout */}
            <label className="form-check-label d-flex mt-2 mt-md-0 ">
              <input type="checkbox" id="showPassword" className="form-check-input border border-black" onClick={togglePasswordVisibility} />  <span className="ms-2"style={{color:'white'}}>Show Password</span>
            </label>
          </div>
        </div>
        <div className="row mt-3 align-items-center">
          <div className="col-md-6">
            {loader && <Loader />}
          </div>
        </div>
        {displayMessage && <div className="row mt-2 mb-0">
          <p style={{ color: displayMessage.includes("Invalid") ? "red" : "blue" }}>{displayMessage}</p>
        </div>}
        <div className="input-group mt-3 row">
          <div className="left col-sm-3">
            <Link to="/"
              type="button" className="btn btn-warning mt-1 ">
              Go Back
            </Link>
          </div>
          <div className="right col-sm-3">
            <input type="submit" value="Sign In" className='btn  btn-success mt-1' onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
}