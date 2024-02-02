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
                // console.log("Image No. ", i + 1);
                // console.log(im[i]);
                const gui = `GuestUploadImage${i}`
                formData.append(gui, im[i]);
            }
            async function makeReq(formData) {
                try {
                    console.log("formData", formData.getAll('GuestUploadImage0'));
                    const response = await axios.post(`http://${window.location.hostname}:4000/guestUp`, formData)
                    console.log(response.data[0]);
                    setLoader(false);
                    setRes(true);
                    setClassificationResult(response.data);

                } catch (error) {
                    console.log("Error occured in making request to server", error);
                    setLoader(false);
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

        <div className="container d-flex justify-content-cenetr  mt-5 " style={{ maxWidth: "600px"}}>
            <div className="rounded-4 p-3 border border-black border-3" style={{backdropFilter:'blur(3px'}} >
                <form onSubmit={handleUpload} id='form' >
                    <div className="row text-center mb-3">
                        <h1 style={{ color: 'black' }}>Upload Tire</h1>
                    </div>
                    <div className="image row">
                        <div className="col">
                            <input onChange={handleFileChange} type="file" multiple accept="image/*" name="tyre" className="image form-control " required />
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <Link to="/guest"
                                    className="btn btn-warning" >Go Back
                                </Link>
                            </div>
                            {res && !loader && <div className="col">
                                <button className="btn btn-success mb-2 ms-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Result</button>
                                <div class="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" >
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Result</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                {classificationResult.map((item, index) => (
                                                    <div className='row text-center mb-4 mt-3' style={{ color: 'black' }}>
                                                        <p >Classification : {item.class} </p>
                                                        <p >Confidence : {item.confidence} </p>

                                                        <div id="getImg" >
                                                            <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out

                                                                src={base64String[index]} alt="Vehicle Tire" />
                                                        </div>
                                                        <div></div>
                                                    </div>))}
                                                <hr />
                                                <br />

                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            <div className="col-sm-2">
                                <button type='submit' className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            {(!res && loader) && (<Loader />)}
                        </div>

                    </div>


                </form>
            </div>
        </div>
    );
}