import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Home.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Fetch FAQs when selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      axios.get(
        `https://faq-generator-backend-git-main-rishi-jain2602s-projects.vercel.app/db/fetchQuestion/location?location=${selectedLocation}`
      )
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data for location:", error);
      });
    }
  }, [selectedLocation]);
  
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  
  const formatImprovementText = (text) => {
    return text.split('\n').map((line, index) => {
      const formattedLine = line.split('**').map((part, partIndex) => 
        partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
      );
      return <div key={index}>{formattedLine}</div>;
    });
  };
  
  return (
    <div className='container'>
      <h1 className="title">FAQ Generator</h1>
      
      <div className="location-select">
        <label htmlFor="location">Select Location:</label>
        <select id="location" value={selectedLocation} onChange={handleLocationChange}>
          <option value="">--Select a location--</option>
          <option value="Birmingham International Airport">Birmingham International Airport</option>
          <option value="Manchester (UK) Airport">Manchester (UK) Airport</option>
          <option value="newcastle airport">Newcastle Airport</option>
          <option value="bristol airport">Bristol Airport</option>
          <option value="Edinburgh Airport">Edinburgh Airport</option>
        </select>
      </div>

      {selectedLocation && (
        <table className="faq-table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Query</th>
              <th scope="col">Location</th>
              <th scope="col">Database Source</th>
              <th scope="col">AI Response</th>
              <th scope="col">Reference Website</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.query}</td>
                <td>{item.location}</td>
                <td>{item.DB_Source}</td>
                <td>{formatImprovementText(item.Response)}</td>
                <td>{Array.isArray(item.Website) ? item.Website.join(', ') : item.Website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
