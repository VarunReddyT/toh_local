// TollUpload.js
import { Link,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader.js';


export default function TollUpload(props) {
  props.setSignInButton(false);
  const [img, setImg] = useState([]);
  const [base64String, setBase64String] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [userMobileNumber, setUserMobileNo] = useState(null);
  const [loader, setLoader] = useState(false); // Loader
  const [display , setDisplay] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false); // Result
  const navigate = useNavigate();

  function validateVehicleNumber(vehicleNumber) {
    const vehicleRegex = /^([A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4})$/;
    return vehicleRegex.test(vehicleNumber);
  }
  function validatePhoneNumber(userMobileNumber) {
    const phoneRegex = /^([0-9]{10})$/;
    return phoneRegex.test(userMobileNumber);
  }
  useEffect(() => {
    if (uploadStatus) {
      const timeoutId = setTimeout(() => {
        setUploadStatus(false);
      }, 4000);

      return () => clearTimeout(timeoutId); // This will clear the timeout if the component unmounts or if uploadStatus changes before the timeout completes
    }
  }, [uploadStatus]);

  // const [dateSub, setDateSub] = useState(null);
  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;

  const dateS = (date.getFullYear() + '-' + m + '-' + String(d));

  const handleVNOChange = (event) => {
    setLoader(false); // Loader
    setUploadStatus(null);
    setVehicleNumber(event.target.value.toUpperCase());
  }

  const handleMNOChange = (event) => {
    setLoader(false); // Loader
    setUploadStatus(null);
    setUserMobileNo(event.target.value);
  }

  const handleImageChange = async (event) => {
    setUploadStatus(null);
    setBase64String([]); // Base64String
    setImg([]);
    setLoader(false); // Loader

    for (let i = 0; i < event.target.files.length; i++) {
      const selected = event.target.files[i];
      setImg(s => [...s, selected]);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadStatus(null);
    setLoader(true);
    setDisplay(false);
    const validateVNO = validateVehicleNumber(vehicleNumber);
    const validateMNO = validatePhoneNumber(userMobileNumber);
    if (!validateVNO && !validateMNO) {
      setVehicleNumber(null);
      setUserMobileNo(null);
      setDisplay("Invalid Vehicle Number and Mobile Number");
      setLoader(false);
      return;
    }
    else if (!validateVNO) {
      setVehicleNumber(null);
      setDisplay("Invalid Vehicle Number");
      setLoader(false);
      return;
    }
    else if (!validateMNO) {
      setUserMobileNo(null);
      setDisplay("Invalid Mobile Number");
      setLoader(false);
      return;
    }
    if (img.length > 0) {

      const requestData = new FormData();
      for (let i = 0; i < img.length; i++) {
        // console.log("Image No. ", i + 1);
        // console.log(img[i]);
        const tui = `TollUploadImage${i}`
        requestData.append(tui, img[i]);
      }

      requestData.append('vehicleNumber', vehicleNumber);
      requestData.append('userMobileNumber', userMobileNumber);
      requestData.append('date', dateS);
      requestData.append('tollPlaza', props.selectedToll);

      async function call_express(requestData) {
        try {
          const response_express = await axios.post('http://localhost:4000/tollupload', requestData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });

          // Handle the response, if needed
          console.log(response_express);
          setLoader(false); // Loader
          setDisplay(null);
          setUploadStatus("Uploaded Successfully");
          document.getElementById('TollUploadForm').reset();


        } catch (error) {
          console.error('Error submitting form:', error);
          setLoader(false); // Loader
          setUploadStatus("Not Uploaded");
          console.error(error.response.data);
          if(error.response.data === "Session Expired, Please Login Again"){
            alert("Session Expired, Please Login Again");
            navigate('/toll');
          }
        }
      }


      if (vehicleNumber && userMobileNumber && base64String && img) {
        call_express(requestData);
      }
      else {
        console.log("Error : One or more fields are empty");
      }
    };
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mt-2" style={{fontWeight:'bold'}}>
      <div className='m-0 ' style={{backdropFilter:'blur(10px)'}}>
        <form onSubmit={handleSubmit} style={{maxWidth:'500px',width:'100%'}} className='shadow-lg rounded-4 border border-black p-4' encType='multipart/form-data' id='TollUploadForm'>
          <div id="TollUploadText">
            <h1>Upload the data</h1>
          </div>
          <div className="col">
            <label htmlFor="TollVehicleNumber" id="TollVehNo" className="form-label">VehicleNumber</label>
            <input type="text" className="form-control" onChange={handleVNOChange} id="TollVehicleNumber" required style={{ textTransform: 'uppercase'}} />
          </div>  
          <div className="col mt-2">
            <label htmlFor="TollUserMobileNo" id="TollUserNo" className="form-label">User Mobile Number</label>
            <input type="number" className="form-control " placeholder='XXXXXXXXXX' onChange={handleMNOChange} id="TollUserMobileNo" required />
          </div>
          <div className="image col mt-2">
            <label htmlFor="TollTireImage" id="TollUploadTire" className="form-label">Upload Tire(s) :</label>
            <input type="file" accept='image/*' name="tyre" onChange={handleImageChange} required id="TollTireImage" maxLength={8} className='form-control' multiple />
          </div>

          {loader && <Loader />}

          {display && <p className='alert alert-danger'>{display}</p>}
        
          {uploadStatus && (
            <div className='mt-2'>
              <p className='alert alert-success' style={{ color: uploadStatus.includes("Not") ? "red" : "green" }}>{uploadStatus}</p>
            </div>
          )}
          <div className='d-flex mt-4'>
          <div className="col">
            <Link type='button' id='TollBack' className="btn btn-warning" to="/toll/start">Go Back</Link>
          </div>
          <div className="col">
            <button type="submit" id="TollSubmit" className="btn btn-success">Submit</button>
          </div>
          </div>

        </form>


      </div>
    </div>
  );

} 