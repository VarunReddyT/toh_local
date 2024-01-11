import React from 'react';
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div className="container" id='Home'>
            <div className="row mt-5 text-center me-5">
                <h1 id='title'>TIRES ON HIGHWAYS</h1>
                <div className="mt-5 row-col-auto">
                    <Link to='/guest'><button type="button" className="btn btn-lg btn-dark mt-3">Continue as Guest</button></Link>
                </div>
                <div className="mt-4 row-col-auto">
                    <Link to="/toll"><button type="button" className="btn btn-lg btn-dark">Toll Sign In</button></Link>
                </div>
            </div>
        </div>
    );}