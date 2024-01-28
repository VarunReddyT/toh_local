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
  const [uploadStatus, setUploadStatus] = useState(false); // Result
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadStatus) {
      const timeoutId = setTimeout(() => {
        setUploadStatus(false);
      }, 2000);

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
      //  function convertToBase64(selected) {
      //    if (selected) {

      //      //! Converting image to base64String
      //      const reader = new FileReader();
      //      reader.onload = (e) => {
      //        const base = e.target.result;
      //                   // console.log(base); 
      //                   setBase64String(b => [...b, base]);
      //               };
      //               reader.readAsDataURL(selected);

      //           }
      //           else {
      //               console.log("Error converting to base64String");
      //           }
      //       }
      //       convertToBase64(selected);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadStatus(null);
    setLoader(true); // Loader
    if (img.length > 0) {

      const requestData = new FormData();
      for (let i = 0; i < img.length; i++) {
        // console.log("Image No. ", i + 1);
        // console.log(img[i]);
        const tui = `TollUploadImage${i}`
        requestData.append(tui, img[i]);
      }
      // for (let i = 0; i < base64String.length; i++) {
      //   // console.log("b64 No. ", i + 1);
      //   // console.log(base64String[i]);
      //   const b64 = `Base64${i}`
      //   requestData.append(b64, base64String[i]);
      // }
      // console.log(base64String[0]);

      requestData.append('vehicleNumber', vehicleNumber);
      requestData.append('userMobileNumber', userMobileNumber);
      requestData.append('date', dateS);
      requestData.append('tollPlaza', props.selectedToll);

      async function call_express(requestData) {

        // console.log(requestData.get('vehicleNumber'));
        // console.log(requestData.get('userMobileNumber'));
        // console.log(requestData.get('userTyre64'));
        // console.log(requestData.get('tireImage'));

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
    <div className="parenttu">
      <div className='TollUpload container m-0'>
        <form onSubmit={handleSubmit} style={{maxWidth:'500px',width:'100%'}} className='shadow-lg rounded-4 border border-black p-4' encType='multipart/form-data' id='TollUploadForm'>
          <div id="TollUploadText">
            <h1>Upload the data</h1>
          </div>
          <div className="col-sm-7">
            <label htmlFor="TollVehicleNumber" id="TollVehNo" className="form-label">VehicleNumber</label>
            <input type="text" className="form-control " onChange={handleVNOChange} id="TollVehicleNumber" required style={{ textTransform: 'uppercase' }} />
          </div>
          <div className="col-sm-7 mt-2">
            <label htmlFor="TollUserMobileNo" id="TollUserNo" className="form-label">User Mobile Number</label>
            <input type="number" className="form-control " onChange={handleMNOChange} id="TollUserMobileNo" required />
          </div>
          <div className="image col-sm-7 mt-2">
            <label htmlFor="TollTireImage" id="TollUploadTire" className="form-label">Upload Tire(s) :</label>
            <input type="file" accept='image/*' name="tyre" onChange={handleImageChange} required id="TollTireImage" maxLength={8} className='form-control' multiple />
          </div>

          {loader && <Loader />}

          {uploadStatus && (
            <div id='TollUploadResult'>
              <p style={{ color: uploadStatus.includes("Not") ? "red" : "green" }}>{uploadStatus}</p>
            </div>
          )}
          <div className="col-12 mt-2 mb-2">
            <button type="submit" id="TollSubmit" className="btn btn-success">Submit</button>
          </div>
          <div className="col-12 mt-2">
            <Link to="/toll/start"><button type='' id='TollBack' className="btn btn-warning">Go Back</button></Link>
          </div>


        </form>


      </div>
    </div>
  );

} 