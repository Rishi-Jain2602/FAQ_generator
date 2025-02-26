import React,{ useEffect, useState }  from 'react'
import axios from 'axios'
import './styles/Home.css'
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://faq-generator-backend-git-main-rishi-jain2602s-projects.vercel.app/db/fetchQuestion')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });

  }, []);
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
      <table className="faq-table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Query</th>
            <th scope="col">Location</th>
            <th scope="col">DataBase Source</th>
            <th scope="col">AI Response</th>
            <th scope="col">Reference website</th>
          </tr>
        </thead>
        <tbody>
      {data.map((item,index)=>(
          <tr>
            <th scope="row">{index+1}</th>
            <td>{item.query}</td>
            <td>{item.location}</td>
            <td>{item.DB_Source}</td>
            <td>{formatImprovementText(item.Response)}</td>
            <td>{item.Website.join(', ')}</td> 
            </tr>

      ))}
          
        </tbody>
      </table>
    </div>
  )
}
