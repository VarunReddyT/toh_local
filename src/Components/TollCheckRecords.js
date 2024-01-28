import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

export default function CheckRecords(props) {
  props.setSignInButton(false);
  const [dateSub, setDateSub] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [tireStatus, setTireStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState(null);
  const [loader, setLoader] = useState(false); // Loader
  const [resp, setResp] = useState([]);
  const navigate = useNavigate();
  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;

  const dateS = date.getFullYear() + '-' + m + '-' + String(d);

  async function checkDate(e) {
    setLoader(true);
    e.preventDefault();
    console.log(props.selectedToll)
    try {
      const response = await axios.get(`http://${window.location.hostname}:4000/checkRecords`, {
        params: {
          date: dateSub,
          tollPlaza: props.selectedToll,
        },
        withCredentials: true,
      });
      setResp(response.data);
      setLoader(false);

      setRecords(response.data.length);

      // setTableData(tableRows);
      // console.log(response.data);
      console.log(records);
      // document.getElementById('p').innerHTML = "Total Records : " + resp.length;
    } catch (err) {
      console.log(err);
      // alert("No Data Found");
    }
  }

  const handleDateChange = (e) => {
    setLoader(false);
    setDateSub(e.target.value);
  }

  const handleImageClick = () => {
    setShowModal(true);
  }

  async function getImage(vehicleNumber) {
    try {
      const imageSrcData = await axios.get(`http://${window.location.hostname}:4000/getIm`, {
        params: {
          date: dateSub,
          tollPlaza: props.selectedToll,
          vehicleNumber: vehicleNumber,
        },
        withCredentials: true,
      });
      for (let i = 0; i < imageSrcData.data[0].length; i++) {
        imageSrcData.data[0][i] = "data:image/jpeg;base64," + imageSrcData.data[0][i];
      }
      const b64Array = imageSrcData.data[0]; // this is an array containing base64 strings of images
      const statusArray = imageSrcData.data[1];  // this is an array containing classification results
      setSelectedImage(b64Array);
      setTireStatus(statusArray);
      handleImageClick();
    }
    catch (err) {
      console.log(err);
    }
  }

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedImage([]);
  // }

  const goTo = () => {
    navigate('/toll/start');
  }

  return (
    <div>
      <h1 className='mt-3 text-center'>Check Records</h1>
      <div className='container text-center'>
        <form onSubmit={checkDate}>
          <label htmlFor='date'>Enter date : &nbsp;</label>
          <input type='date' name='date' className='me-3' onChange={handleDateChange} max={dateS} required></input>
          {!loader && <input type='submit' className='btn btn-primary me-1' value='Check' />}
          <input type='button' className='btn btn-warning ms-1' onClick={goTo} value='Go Back' />

          {loader && <Loader />}
        </form>
        <div id='p' className='mt-3 mb-3'>
          {records && <p>Total Records : {records}</p>}
        </div>
      </div>

      <div className=' table-responsive'>
        {
          records &&
          <table className="table table-light table-bordered">
            <thead>
              <tr>
                <th scope="col">Vehicle Number</th>
                <th scope="col">Mobile Number</th>
                <th scope="col" style={{ width: 'auto' }}>Image</th>
              </tr>
            </thead>
            <tbody>
              {resp.map((item, index) => (
                <tr key={index}>
                  <td>{item.vehicleNumber}</td>
                  <td>{item.userMobileNumber}</td>
                  {/* <td>{item.tyreStatus[0].class}</td> */}
                  {/* <td>{item.tyreStatus[0].confidence}</td> */}
                  <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal" onClick={() => getImage(item.vehicleNumber)}>
                    Image(s)
                  </button>
                    {
                      <div className="modal fade " id="Modal" tabindex="-1">
                        <div className="modal-dialog modal-dialog-scrollable">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Image Tire</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              { showModal &&
                              tireStatus.map((item, index) => (<div className='row text-center mt-3 '>
                                <div id="getImg" >
                                  <img className="enlarge" style={{ width: '200px', height: 'auto', borderRadius: '10px', transition: 'width 0.3s ease' }} // Shrink on mouse out
                                    src={selectedImage[index]} alt="Vehicle Tire" />
                                </div>
                                <p >Classification : {item.class} </p>
                                <p >Confidence : {item.confidence} </p>
                                

                              </div>))}
                              {
                                !showModal && 
                                 <Loader />
                              }
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>

                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>



    </div>
  )
}