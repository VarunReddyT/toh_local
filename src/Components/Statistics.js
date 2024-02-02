import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export default function Statistics(props) {
  props.setSignInButton(true);
  const [stats, setStats] = useState([]);

  async function getStats() {

    try {
      const response = await axios.get(`http://${window.location.hostname}:4000/stats`);
      setStats(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getStats();
  }, []);
  const data = [
    ["Condition", "Number of cases"],
    ["Cracked", stats[0]],
    ["Normal", stats[1]],
  ];

  const options = {
    is3D: true,
  };

  return (
    <div className='container shadow-lg border border-white p-4 rounded-4 bg-white'>
      <h2 className='text-center'>Statistics</h2>
      <p className='text-center'>Analysis of tire conditions based on the vehicles passed through various toll plazas</p>
      <div> 
      <Chart chartType="PieChart" data={data} options={options} width={"100%"} height={"400px"}
      />
      </div>
    </div>
  );
}