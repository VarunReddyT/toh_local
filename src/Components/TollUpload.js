// TollUpload.js
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function TollUpload(props) {

  const [img, setImg] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [userMobileNumber, setUserMobileNo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [dateSub, setDateSub] = useState(null);
    const date = new Date();
    let m = date.getMonth()+1;
    let d = date.getDate();

    if(m<10) m = '0' + m;
    if(d<10) d = '0' + d;
    
  const dateS = (date.getFullYear()+'-'+ m +'-'+String(d));

  const handleVNOChange = (event) => {
    setUploadStatus(null);
    setVehicleNumber(event.target.value.toUpperCase());
    

  }

  const handleMNOChange = (event) => {
    setUploadStatus(null);
    setUserMobileNo(event.target.value);
  }

  const handleImageChange = async (event) => {
    setUploadStatus(null);
    const file = event.target.files[0];
    setImg(file);

    function convertToBase64(file) {
      if (file) {

        //! Converting image to base64String
        const reader = new FileReader();
        reader.onload = (e) => {
          const base = e.target.result;
          // console.log(base); // To log the string
          setBase64String(base);
        };
        reader.readAsDataURL(file);

      }
      else {
        console.log("Error converting to base64String");
      }
    }
    convertToBase64(file);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = new FormData();
    requestData.append('vehicleNumber', vehicleNumber);
    requestData.append('userMobileNumber', userMobileNumber);
    requestData.append('userTyre64', base64String);
    requestData.append('TolluploadImage', img);
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
        });

        // Handle the response, if needed
        console.log(response_express);
        setUploadStatus("Uploaded Successfully");

      } catch (error) {
        console.error('Error submitting form:', error);
        setUploadStatus("Not Uploaded");
        // console.error(error.response.data);
      }
    }


    if (vehicleNumber && userMobileNumber && base64String && img) {
      call_express(requestData);
    }
    else {
      console.log("Error : One or more fields are empty");
    }

    document.getElementById('TollUploadForm').reset();
  };

  return (
    <div className="parenttu">
      <div className='TollUpload container m-0'>
        <form onSubmit={handleSubmit} encType='multipart/form-data' id='TollUploadForm'>
          <div id="TollUploadText">
            <h1>Upload the data</h1>
          </div>
          <div className="col-sm-6">
            <label htmlFor="TollVehicleNumber" id="TollVehNo" className="form-label">VehicleNumber</label>
            <input type="text" className="form-control " onChange={handleVNOChange} id="TollVehicleNumber" placeholder="MP10QR4354" required style={{textTransform:'uppercase'}} />
          </div>
          <div className="col-sm-8">
            <label htmlFor="TollUserMobileNo" id="TollUserNo" className="form-label">User Mobile Number</label>
            <input type="number" className="form-control " onChange={handleMNOChange} id="TollUserMobileNo" placeholder="xxxxxxxxxx" required />
          </div>
          <br />
          <div className="image col-9 mt-2 mb-2">   
            <label htmlFor="TollTireImage" id="TollUploadTire" className="form-label">Upload Tyre :</label>
            <input type="file" accept='image/*' name="tyre" onChange={handleImageChange} required id="TollTireImage" className='form-control' />
          </div>

          {uploadStatus && (
        <div id='TollUploadResult'>
          <p>Upload Status : {uploadStatus}</p>
        </div>
        )}
          <div className="col-12 mt-2 mb-2">
            <button type="submit" id="TollSubmit" className="btn btn-dark">Submit</button>
          </div>

          
        </form>           

        <div>
          <Link to="/toll/start"><button type='' id='TollBack' className="btn btn-dark">Go Back To Home</button></Link>
        </div>
      
    </div>
    </div>
  );

}