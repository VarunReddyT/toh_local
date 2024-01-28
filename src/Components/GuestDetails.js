import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

export default function GuestDetails(props) {
    props.setSignInButton(true);
    const statusArray = [];
    const base64Array = [];

    const [vno, setVNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [tollPlaza, setTollPlaza] = useState('');
    const [date, setDate] = useState('');
    const [res, setRes] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleVnoChange = (event) => {
        setVNo(event.target.value);
        setPhoneNo('');
        setRes(false);
        setLoader(false);
    }

    const handleSubmit = async (e) => {
        setLoader(true);
        setRes(false);
        e.preventDefault();
        const response = await axios.get(`http://${window.location.hostname}:4000/guestDet`, {
            params: {
                vehicleNumber: vno,
            },
        });
        if (response.data === "No Data Found") {
            console.log("No Data Found");
            setRes(false);
            setLoader(false);
            console.log(response.data)
            alert("No Data Found");
        }
        else {

            console.log(response.data)
            setPhoneNo(response.data.userMobileNumber);
            setTollPlaza(response.data.tollPlaza);
            setDate(response.data.date);
            for (let i = 0; i < response.data.tyreStatus; i++) {
                statusArray.push(response.data.tyreStatus[i]);
            }
            for (let i = 0; i < response.data.userTyre64.length; i++) {
                base64Array.push(response.data.userTyre64[i]);
                base64Array[i] = "data:image/jpeg;base64," + base64Array[i];
            }
            setLoader(false)
            setRes(true);
        }
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className='container' style={{
                backdropFilter: 'blur(13px)', minHeight: 'auto',
                maxWidth: '600px',
            }}>
                <div className='row'>
                    <form onSubmit={handleSubmit}>
                        <div className='col'>
                            <h1 style={{ color: 'white' }}>Check Your Vehicle Details</h1>
                        </div>
                        <div className="col mt-4">
                            <input type="text" onChange={handleVnoChange} className="form-control border border-black" placeholder='Vehicle Number' name="VehicleNumber" id="vehicleU" required />
                        </div>
                        <div className="row mt-4">
                            <div className="col mt-2 ms-5">
                                <Link to="/guest" className="btn btn-warning back" id="blackbut">Go Back</Link>
                            </div>
                            {res && <div className="col mt-2">
                                <button type="button" className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Result</button>
                            </div>}
                            <div className="col mt-2">
                                <button type="submit" className="btn btn-primary detSub">Submit</button>
                            </div>
                        </div>
                        {loader && <Loader />}
                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Result</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                {res && statusArray.map((item, index) => (<div className='row text-center mb-4 mt-3'>
                                    <p >Vehicle Number: {vno} </p>
                                    <p >Mobile Number: {phoneNo} </p>
                                    <p >Vehicle Number: {tollPlaza} </p>
                                    <p >Vehicle Number: {date} </p>
                                    <p >Classification : {item.class} </p>
                                    <p >Confidence : {item.confidence} </p>
                                    <div id="getImg" >
                                        <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out
                                            src={base64Array[index]} alt="Vehicle Tire" />
                                    </div>
                                    <br />
                                    <hr />
                                </div>))}
                            </div>
                            
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}