import React from "react";
import { Link } from "react-router-dom";
// import {useNavigate } from 'react-router-dom'
export default function Guest() {
    // const navigate = useNavigate();
    return (
   <div className="parentg">
         <div className="Guest container  shadow-lg rounded-3 m-0 border border-black">
            <div className="row">
                    <div className="col-sm-12 mt-4 text-center ">
                    <Link to="/guest/upload"><button type="button" className="btn btn-dark Guestbt">Upload Your Tire Image Here</button></Link>
                    </div>
              
                
                    <div className="col-sm-12 mt-4 text-center">
                    <Link to="/guest/checkdetails"><button type="button" className="btn btn-dark Guestbt" >Check Your Vehicle Details</button></Link>
                    </div>
                
            <div className="col-sm-6 mt-4 mb-2">
            <Link to="/home"><button className="btn btn-dark backb">Go Back</button></Link>
            </div>
            </div>
            {/* <button className="btn btn-dark " id="gbk" onClick={() => navigate(-1)}>Go Back</button> */}
        </div>
   </div>
    );
}