import React from 'react';
import { Link } from "react-router-dom";


export default function Home(props){
    props.setSignInButton(true);
    return (
        <div className="container d-flex justify-content-center align-items-center text-center">
            <div className="row mt-5">
                <h1>TIRES ON HIGHWAYS</h1>
                <div className="mt-5">
                    <Link to='/guest'><button type="button" className="btn btn-lg btn-dark mt-3">Continue as Guest</button></Link>
                </div>
            </div>
        </div>
    );}