import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TollLogin from './Components/TollLogin';
import TollStart from './Components/TollStart';
import TollUpload from './Components/TollUpload';
import Home from './Components/Home';
import Guest from './Components/Guest'
import GuestUpload from './Components/GuestUpload';
import GuestDetails from './Components/GuestDetails';
import Navbar from './Components/Navbar';
import './css/Loader.css';
import './css/Home.css';
import './css/TollLogin.css';
import './css/TollStart.css';
import './css/TollUpload.css';
import './css/Guest.css';
import './css/GuestDetails.css';
import './css/GuestUpload.css';
// import Start from "./Components/TollLogin";
import './webfontkit-20231017-084401/stylesheet.css';
import { useEffect,useState } from 'react';
import CheckRecords from './Components/CheckRecords';
import Statistics from './Components/Statistics';

const NotFound = () => <h1>404 Error.
  The page you are looking for does not exist
</h1>;


function App() {
  const [selectedToll, setSelectedToll] = useState('');

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
      <Router>
          <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          {/* <Route path='/signIn' element={<Start/>}/> */}
          <Route path='/toll' element={<TollLogin selectedToll={selectedToll} setSelectedToll={setSelectedToll} />} />
          <Route path='/toll/start' element={<TollStart selectedToll={selectedToll}/>} />
          <Route path='/toll/upload' element={<TollUpload selectedToll={selectedToll} />} />
          <Route path='/guest' element={<Guest />} />
          <Route path='/guest/upload' element={<GuestUpload />} />
          <Route path='/guest/checkdetails' element={<GuestDetails />} />
          <Route path='/toll/checkrecords' element={<CheckRecords selectedToll={selectedToll} />} />
          <Route path='/stats' element={<Statistics/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
