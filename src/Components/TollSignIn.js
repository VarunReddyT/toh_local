import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader.js';
// import ReCAPTCHA from 'react-google-recaptcha';

export default function TollLogin({ setSelectedToll, setSignInButton, setCookie }) {
  setSignInButton(true);
  const [toll, setToll] = useState('');
  const [pwd, setPwd] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [loader, setLoader] = useState(false);
  // const [captcha, setCaptcha] = useState(false);
  const [eye,setEye] = useState(true);
  useEffect(() => {
    return () => {
      if (displayMessage) {
        setDisplayMessage(false);
      }
    };
  }, [displayMessage]);
  // const verifyCaptcha = (value) => {setCaptcha(true); };
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
    setEye(!eye);
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
    // else if (!captcha) {
    //   setDisplayMessage("Please verify captcha");
    // }
    else {
      const formData = new FormData();
      formData.append('toll', toll);
      formData.append('password', pwd);
      postData(formData);
    }


  };

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='mt-4 '>
        <form className="shadow-lg rounded-4 p-4 border-3" >
          <div className='row'>
            <h1>Sign In to Toll Plaza</h1>
          </div>
          <div className='row'>
            <div className="">
              <select className="form-select border border-black mt-3 w-100" id="Select" aria-label="label select example" autoComplete="off" onChange={handleTollChange} required>
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
          <div className="row mt-3">
            <div className="">
            <label className="c"> 
              <input style={{ color: 'black' }} type="password" className="form-control" id="pwd" required value={pwd} placeholder="Password" onChange={handlePwdChange} />
               
                {eye &&
                <svg className="eye" onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
}
                {!eye &&
                <svg className="eye-slash" onClick={togglePasswordVisibility} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
}
              </label>
            </div>
            
          </div>
          <div className="row mt-3 align-items-center">
            {/* <div className='col-md-6'>
            <ReCAPTCHA sitekey="6Lf2FFwpAAAAAJSxFaOazGkU-7voL7EIw2mXtWRT" onChange={verifyCaptcha} />
          </div> */}
            <div className="">
              {loader && <Loader />}
            </div>
          </div>
          {displayMessage && <div className="row mt-2 mb-0">
            <p style={{ color: displayMessage.includes("Invalid") ? "red" : "yellow" }}>{displayMessage}</p>
          </div>}
          <div className="input-group mt-3 row">
            <div className="d-flex justify-content-lg-around ">
              <Link to="/"
                type="button" className="btn btn-warning mt-1 ">
                GoBack
              </Link>
              <div className="ms-5">
                <input type="submit" value="Sign In" className='btn  btn-success mt-1' onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}