import React from 'react'
import { Link } from 'react-router-dom'
export default function NoAccess() {
    return (
        <div className='container'>
            <div className='col mt-5'>
            <h2 className='row'style={{color:'white'}}>Access Denied, Please Sign In to continue</h2>
            <Link to="/toll" type="button" className="btn btn-light row ">Toll Sign In</Link>
            </div>
        </div>
    )
}
