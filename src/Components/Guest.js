import React from "react";
import { Link } from "react-router-dom";
// import {useNavigate } from 'react-router-dom'
export default function Guest(props) {
    props.setSignInButton(true);
    // const navigate = useNavigate();
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="shadow-lg rounded-3 m-0 border border-white">
                <div className="row">
                    <div className="mt-4 text-center">
                        <Link type="button" className="btn btn-dark" to="/guest/upload">Upload Your Tire Image Here</Link>
                    </div>
                    <div className="mt-4 text-center">
                        <Link type="button" className="btn btn-dark" to="/guest/checkdetails">Check Your Vehicle Details</Link>
                    </div>
                    <div className="mt-4 mb-2 text-center">
                        <Link type="button" className="btn btn-dark" to="/">Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}