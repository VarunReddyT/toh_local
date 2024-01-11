import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Start({ selectedToll, setSelectedToll }) {
  const [toll, setToll] = useState('');
  const [pwd, setPwd] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  const tollPlaza = {
    "Hyderabad": "",
    "Delhi": "",
    "Bangalore": "",
  };

  const handleTollChange = (event) => {
    setToll(event.target.value);
  };

  const handlePwdChange = (event) => {
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
    if (toll === '') {
      setDisplayMessage("Please select a toll plaza");
      return;
    }
    if (tollPlaza[toll] === pwd) {
      setDisplayMessage("Redirecting to home page...");
      setSelectedToll(toll);
      navigate('/toll/start');
    } else {
      setDisplayMessage("Invalid Password");
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <h1 className='col-12 mt-5'>Tires On Highway</h1>
        <select className="form-select mt-3 w-50" aria-label="Default select example" autoComplete="off" onChange={handleTollChange} required>
          <option value="">Select Toll Plaza</option>
          {Object.keys(tollPlaza).map((key) => (
            <option value={key} key={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className='row mt-4'>
        <form className="col-12 col-md-6">
          <label htmlFor="pwd" style={{ textAlign: "center" }}>
            Password:
          </label>
          <br />
          <div className='mt-2'>
            <input type="password" id="pwd" className="btn btn-secondary opacity-50" placeholder="Enter your password" required value={pwd} style={{color:'dark'}} onChange={handlePwdChange} />
          </div>
          <br></br>
          <div className="input-group mt-3">
            <button type="button" className="btn btn-primary" onClick={togglePasswordVisibility}>Show Password</button>
            <Link to="/toll/start">
              <button type="button" id="LoginSubmit" onClick={handleSubmit} className="btn btn-success ms-3">
                Submit
              </button>
            </Link>
          </div>
        </form>
        <div className='row'>
          {displayMessage && <p className='text-danger mt-2'>{displayMessage}</p>}
          <div className='mt-4'>
            <Link to="/" >
              <button type="button" className="btn btn-danger">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
