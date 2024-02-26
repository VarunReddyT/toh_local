import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs(props) {
  props.setSignInButton(true);

  return (
    <div className="AboutUs mt-5 container">
      <h1  className="display-4 bg-black border border-white border-3 p-2 rounded-4 text-center "style={{color:'white'}}>Meet The Team G81 !!!</h1>
      <div className="row row-cols-1 row-cols-md-3">
        <div className="col mb-4">
          <div className="card bg-black  text-center"style={{color:'white'}}>
            <img src={require('../images/Varun.jpg')} className="card-img-top" alt="Varun" />
            <div className="card-body">
              <h5 className="card-title">Varun</h5>
              {/* <p className="card-text">Guntur Kaaram is a small word</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card bg-black text-center"style={{color:'white'}}>
            <img src={require('../images/Shiva.jpg')} className="card-img-top" alt="Shiva" />
            <div className="card-body">
              <h5 className="card-title">Shiva</h5>
              {/* <p className="card-text">He is invisible</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card  bg-black text-center"style={{color:'white'}}>
            <img src={require('../images/Deepak.jpg')} className="card-img-top" alt="Deepak" />
            <div className="card-body">
              <h5 className="card-title">Deepak</h5>
              {/* <p className="card-text">I have become death. The destroyer of KMIT</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card bg-black text-center"style={{color:'white'}}>
            <img src={require('../images/Gargey.jpg')} className="card-img-top" alt="Gargey" />
            <div className="card-body">
              <h5 className="card-title">Gargey</h5>
              {/* <p className="card-text">Searching for love.</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card bg-black text-center"style={{color:'white'}}>
            <img src={require('../images/Charan.jpg')} className="card-img-top" alt="Charan" />
            <div className="card-body">
              <h5 className="card-title">Charan</h5>
              {/* <p className="card-text">Something big's coming</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card bg-black text-center"style={{color:'white'}}>
            <img src={require('../images/Manoj.jpg')} className="card-img-top" alt="Manoj" />
            <div className="card-body">
              <h5 className="card-title">Manoj</h5>
              {/* <p className="card-text">Manoj Coderatha Raisaar</p> */}
            </div>
          </div>
        </div>
        
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="map-example">
            <iframe className='border border-black border-3 rounded-4 mb-5' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60916.877541305425!2d78.490234!3d17.397152!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c44533324f%3A0x8aa5456a7d836bb5!2sKeshav%20Memorial%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1704704926760!5m2!1sen!2sin" title="CLocation" style={{ width: "100%", height: "450px", border: "10", marginTop: "20px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className="container col-md-6 d-flex align-items-center">
          <div className="container ms-5 bg-black rounded-4 p-2 border border-white border-3 "style={{color:'white'}}>
            <h1>Contact Us On:</h1>
            
            <div className="d-flex">
              <Link to='https://mail.google.com/mail/u/0/#inbox?compose=new' target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined" style={{ color: "red" }}>
                  mail 
                </span>
              </Link>
            </div>
            <form>
            <div>
              <label classname="form-label">Name</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="mb-3 mt-2">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="abc@gmail.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">State your issue/feedback</label>
              <textarea className="form-control" rows="5"></textarea>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}