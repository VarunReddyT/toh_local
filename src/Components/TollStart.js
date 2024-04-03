import React from "react";
import { Link } from "react-router-dom";

export default function TollStart(props) {
    props.setSignInButton(false);
    return (
        
            <div className="container" >
                <div className="mt-5 d-flex container flex-column justify-content-center align-items-center shadow-lg p-4" style={{borderRadius:'10px' , maxWidth:'600px'  }}>
                <h2 className="shadow-lg p-4 rounded-4 bg-dark" style={{color:'white'}} >Toll Plaza : {props.selectedToll}</h2>
                <div className="row mt-4 d-flex justify-content-around">
                    <div className="col-sm-5  d-flex justify-content-center">
                    <Link to="/toll/upload" type="button" className="btn btn-dark d-flex">
                            UPLOAD DATA
                    </Link>
                    </div>

                    <div className="col-sm-5  d-flex justify-content-center">
                    <Link to="/toll/checkrecords" type="button" className="btn btn-dark d-flex">
                            CHECK RECORDS
                    </Link>
                    </div>
                    
                </div>
              
            </div>
            </div>
        
    );
}