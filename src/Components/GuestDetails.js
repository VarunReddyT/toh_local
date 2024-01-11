import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GuestDetails() {


    const [vno, setVNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [status, setStatus] = useState('');
    const [confidence, setConfidence] = useState('');
    const [image, setImage] = useState('');

    const handleVnoChange = (event) => {
        setVNo(event.target.value);
        setConfidence('');
        setImage('');
        setStatus('');
        setPhoneNo('');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Input : VehicleNo : ", vno);

        const response = await axios.get('http://localhost:4000/guestDet', {
            params: {
                vehicleNumber: vno,
            },
        });
        if(response.data === "No Data Found"){
            console.log("No Data Found");
            alert("No Data Found");
        }
        else{
        console.log("Output : PhoneNo : ", response.data[0].userMobileNumber);
        console.log("Output : Status : ", response.data[0].tyreStatus);
        console.log("Output : Confidence : ", response.data[0].tyreStatus.confidence);
        setStatus(response.data[0].tyreStatus.class);
        setConfidence(response.data[0].tyreStatus.confidence);
        setImage(response.data[0].userTyre64);
        setPhoneNo(response.data[0].userMobileNumber);
        }
    }

    return (
        <div className="parentgd">
            <div className='GuestDetails container m-0 border border-black rounded-4 shadow p-4' >
            <div className='row'>
                <form onSubmit={handleSubmit}>
                    <div className='col'>
                        <h1>Enter Vehicle Number</h1>
                    </div>
                    <div className="col">
                        <label htmlFor="vehicleU" className="form-label">VehicleNumber</label>
                        <input type="text" onChange={handleVnoChange} className="form-control " name="VehicleNumber" id="vehicleU" placeholder="MP10QR4354" required />
                    </div>
                    {/* <div className="col-md-8">
                        <label htmlFor="UserMobileNo" className="form-label">Owner Mobile Number</label>
                        <input type="number" className="form-control bg-dark" max={9999999999}  id="mobileNo" placeholder="xxxxxxxxxx" required/>
                    </div> */}
                    <br></br>
                    <div className="row">
                        <div className="col-sm-3 mt-2">
                        <button type="submit" className="btn btn-dark detSub" id="blackbut">Submit</button>
                        </div>
                        <div className="col-sm-3 mt-2">
                        <Link to="/guest" ><button type="submit" className="btn btn-dark back">Go Back</button></Link>
                        </div>
                    </div>
                    <br />

                    {phoneNo && status && confidence && image && (
                        <div id='getRes'>
                            <p>PhoneNo : {phoneNo} </p>
                            <p>Status : {status} </p>
                            <p>Confidence : {confidence} </p>

                            <div id="getResImg">
                                <img className="enlarge" style={{ width: '300px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease', }}
                                    onMouseOver={(e) => (e.currentTarget.style.width = '400px')} // Enlarge on hover
                                    onMouseOut={(e) => (e.currentTarget.style.width = '300px')} // Shrink on mouse out

                                    src={image} alt="Vehicle Tire" />
                            </div>
                        </div>
                    )}

                </form>
            </div>

        </div>
        </div>
    );
}