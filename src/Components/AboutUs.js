import React from 'react';

export default function AboutUs(props) {
  props.setSignInButton(true);

  return (
    <div className="AboutUs container">
      <div className="row row-cols-1 row-cols-md-3">
        <div className="col mb-4">
          <div className="card text-center">
            <img src={require('../images/Varun.jpg')} className="card-img-top" alt="Varun" />
            <div className="card-body">
              <h5 className="card-title">Varun</h5>
              {/* <p className="card-text">Guntur Kaaram is a small word</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={require('../images/1.jpg')} className="card-img-top" alt="Shiva" />
            <div className="card-body">
              <h5 className="card-title">Shiva</h5>
              {/* <p className="card-text">He is invisible</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={require('../images/2.jpg')} className="card-img-top" alt="Deepak" />
            <div className="card-body">
              <h5 className="card-title">Deepak</h5>
              {/* <p className="card-text">I have become death. The destroyer of KMIT</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={require('../images/3.jpg')} className="card-img-top" alt="Gargey" />
            <div className="card-body">
              <h5 className="card-title">Gargey</h5>
              {/* <p className="card-text">Searching for love.</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={require('../images/4.jpg')} className="card-img-top" alt="Charan" />
            <div className="card-body">
              <h5 className="card-title">Charan</h5>
              {/* <p className="card-text">Something big's coming</p> */}
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card text-center">
            <img src={require('../images/5.jpg')} className="card-img-top" alt="Manoj" />
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60916.877541305425!2d78.490234!3d17.397152!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c44533324f%3A0x8aa5456a7d836bb5!2sKeshav%20Memorial%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1704704926760!5m2!1sen!2sin" title="CLocation" style={{ width: "100%", height: "450px", border: "10", marginTop: "20px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="ms-5">
            <h3>Contact Us On:</h3>
            <div className="d-flex">
              <a href="mailto:g81projectschool@gmail.com" target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined" style={{ color: "blue" }}>
                  mail
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
