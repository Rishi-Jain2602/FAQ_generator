import React,{ useEffect, useState }  from 'react'
import axios from 'axios'
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

  return (
    <div className='container'>
      <table className="table">
        <thead className="thead-dark">
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
            <td>{item.Response}</td>
            <td>{item.Website}</td>
            </tr>

      ))}
          
        </tbody>
      </table>
    </div>
  )
}
