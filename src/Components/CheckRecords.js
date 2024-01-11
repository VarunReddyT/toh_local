import React, { useState } from 'react';
import axios from 'axios';

export default function CheckRecords(props) {
  const [dateSub, setDateSub] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [records, setRecords] = useState(0);

  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;

  const dateS = date.getFullYear() + '-' + m + '-' + String(d);

  async function checkDate(e) {
    e.preventDefault();
    console.log(props.selectedToll)
    try {
      const response = await axios.get(`http://${window.location.hostname}:4000/checkRecords`, {
        params: {
          date: dateSub,
          tollPlaza : props.selectedToll,
        },
      });
      let a = response.data;
      
      const tableRows = a.map((item, index) => (
        <tr key={index}>
          <td>{item.vehicleNumber}</td>
          <td>{item.userMobileNumber}</td>
          <td>{item.tyreStatus[0].class}</td>
          {/* <td>{item.tyreStatus[0].confidence}</td> */}
          <td><button className='btn btn-primary' onClick={() => handleImageClick(item.userTyre64)}>Image</button></td>
        </tr>
      ));
      setTableData(tableRows);
      setRecords(a.length);
      console.log(records);
      document.getElementById('p').innerHTML = "Total Records : " + a.length;
    } catch (err) {
      console.log(err);
      // alert("No Data Found");
    }
  }

  const handleDateChange = (e) => {
    setDateSub(e.target.value);
  }

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  }

  const handleCloseModal = () => {
    setSelectedImage(null);
  }



  return (
    <div>
      <h1>Check Records</h1>
      <div className='container text-center'>
        <div></div>
        <form onSubmit={checkDate}>
          <label htmlFor='date'>Enter date</label>
          <input type='date' name='date' className='me-3' onChange={handleDateChange} max={dateS} required></input>
          <input type='submit' className='btn btn-primary' value='Check' />
        </form>
        <div id='p' className='mt-3 mb-3'></div>
      </div>
      <div className=' table-responsive'>
        <table className="table table-light table-bordered">
          <thead>
            <tr>
              <th scope="col">Vehicle Number</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Tyre Status</th>
              <th scope="col" style={{ width: 'auto' }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
      {selectedImage && (
        <div className="modal" style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div className="modal-dialog" style={{ width: '100%', margin: 'auto' }}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <img src={selectedImage} alt="Tyre" style={{ width: '85%', height: 'auto' }} />
            </div>
            <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onClick={handleCloseModal} data-bs-dismiss="modal">Close</button>
      </div>
          </div>
        </div>
      </div>
      
      )}
    </div>
  )
}
