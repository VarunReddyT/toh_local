import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export default function Statistics() {
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
    title: "Analysis of Tires",
    is3D: true,
  };

  return (
    <div className='container'>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}
