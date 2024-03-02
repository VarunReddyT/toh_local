import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TollStart from './Components/TollStart';
import TollUpload from './Components/TollUpload';
import Home from './Components/Home';
import Guest from './Components/Guest'
import GuestUpload from './Components/GuestUpload';
import GuestDetails from './Components/GuestDetails';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import TollLogin from "./Components/TollSignIn";
import Statistics from './Components/Statistics';
import Loader from './Components/Loader';
import CheckRecords from './Components/TollCheckRecords';
import NoAccess from './Components/NoAccess';
import Footer from './Components/Footer';
// import Feedback from './Components/Feedback';
import Check from './Components/check';
import Check2 from './Components/check2';
import './all_css/Home.css';
import './all_css/Loader.css';
import './all_css/Footer.css';
import './all_css/TollSignIn.css';
import './all_css/Navbar.css';
import './App.css';

const NotFound = (props) => (
  <h1>404 Error. The page you are looking for does not exist</h1>
);

function App() {
  const [selectedToll, setSelectedToll] = useState('');
  const [signInButton, setSignInButton] = useState(true);
  const [cookie, setCookie] = useState(document.cookie);
  

  useEffect(() => {
    const storedToll = localStorage.getItem('selectedToll');
    if (storedToll) {
      setSelectedToll(storedToll);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedToll', selectedToll);
  }, [selectedToll]);

  return (
    <>
      <div className="app-container">
        <Router>
          <Navbar signInButton={signInButton} setCookie={setCookie} />
          <Routes>
            <Route path='/' element={<Home setSignInButton={setSignInButton} />} />
            <Route path='/loader' element={<Loader />} />
            <Route path='/aboutus' element={<AboutUs setSignInButton={setSignInButton} />} />
            <Route path='/toll' element={<TollLogin setCookie={setCookie} selectedToll={selectedToll} setSelectedToll={setSelectedToll} setSignInButton={setSignInButton} />} />
            {!cookie &&
              <>
                <Route path='/toll/start' element={<NoAccess />} />
                <Route path='/toll/upload' element={<NoAccess />} />
                <Route path='/toll/checkrecords' element={<NoAccess />} />
              </>
            }

            {cookie &&
              <>
                <Route path='/toll/start' element={<TollStart selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
                <Route path='/toll/upload' element={<TollUpload selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
                <Route path='/toll/checkrecords' element={<CheckRecords selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
              </>
            }


            <Route path='/stats' element={<Statistics setSignInButton={setSignInButton} />} />
            <Route path='/guest' element={<Guest setSignInButton={setSignInButton} />} />
            <Route path='/guest/upload' element={<GuestUpload setSignInButton={setSignInButton} />} />
            <Route path='/guest/checkdetails' element={<GuestDetails setSignInButton={setSignInButton} />} />
            {/* <Route path = '/feedback' element = {<Feedback/>}/> */}
            <Route path='*' element={<NotFound setSignInButton={setSignInButton} />} />
            <Route path='/check' element={<Check/>} />
            <Route path='/check2' element={<Check2/>} />
          </Routes>
        </Router>
      </div>
      <div className='footer'>
            <Router>
              <Routes>
              <Route path='*' element={<Footer/>} />
              </Routes>
            </Router>
      </div>

    </>
  );
}

export default App;
