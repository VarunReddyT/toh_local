import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import Loader from './Loader.js';

export default function GuestUpload(props) {
    props.setSignInButton(true);
    const [im, setIm] = useState(null);
    const [classificationResult, setClassificationResult] = useState([]);
    const [base64String, setBase64String] = useState([]);
    const [loader, setLoader] = useState(false);
    const [res, setRes] = useState(false);

    const handleFileChange = (e) => {
        setClassificationResult([]);
        setBase64String([]);
        setIm([]);
        setLoader(false);
        setRes(false);



        for (let i = 0; i < e.target.files.length; i++) {

            const selected = e.target.files[i];
            setIm(s => [...s, selected]);
            function convertToBase64(selected) {
                if (selected) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base = e.target.result;
                        setBase64String(b => [...b, base]);
                    };
                    reader.readAsDataURL(selected);

                }
                else {
                    console.log("Error converting to base64String");
                }
            }
            convertToBase64(selected);
        }

    };


    const handleUpload = (e) => {
        setClassificationResult([]);
        setRes(false);
        e.preventDefault();
        setLoader(true);
        if (im.length > 0) {

            const formData = new FormData();
            for (let i = 0; i < im.length; i++) {
                console.log("Image No. ", i + 1);
                console.log(im[i]);
                const gui = `GuestUploadImage${i}`
                formData.append(gui, im[i]);
            }

            async function makeReq(formData) {
                try {
                    const response = await axios.post(`http://${window.location.hostname}:4000/guestUp`, formData)
                    console.log(response.data);
                    setLoader(false);
                    setRes(true);
                    setClassificationResult(response.data);

                } catch (error) {
                    console.log("Error occured in making request to server", error);
                    setLoader(null);
                    setRes(false);
                }
            }
            makeReq(formData);
        }
        else {
            console.error("No file selected");
        }
    };



    return (

        <div className="container d-flex justify-content-cenetr  mt-5">
            <div className="GuestUpload container  rounded-4 p-3" style={{ backdropFilter: 'blur(15px)',maxWidth:'450px',maxHeight:'200px' }}>
                <form onSubmit={handleUpload} id='form' >
                    <div className="row text-center mb-3">
                        <h1 style={{ color: 'white' }}>Upload Tire</h1>
                    </div>
                    <div className="image row">
                        <div className="col">
                            <input style={{ borderColor: 'black' }} onChange={handleFileChange} type="file" multiple accept="image/*" name="tyre" className="image form-control " required />
                        </div>
                        <div className="row">
                            <div className="col mt-2 ">
                                <Link to="/guest"
                                    className="btn btn-warning" >Go Back
                                </Link>
                            </div>
                            <div className="col mt-2">
                                {res && <button className="btn btn-success mb-2 ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Result</button>}
                            </div>
                            <div className="col-sm-2">
                                <button type='submit' className="btn btn-primary mt-2 mb-2">Submit</button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            {loader && <Loader />}
                        </div>
                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Result</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                {res && classificationResult.map((item, index) => (<div className='row text-center mb-4 mt-3'>
                                    <p >Classification : {item.class} </p>
                                    <p >Confidence : {item.confidence} </p>
                                    <div id="getImg" >
                                        <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out

                                            src={base64String[index]} alt="Vehicle Tire" />
                                    </div>
                                    <hr />

                                </div>))}

                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
}