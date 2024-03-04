import React, { useState, useEffect } from 'react';
import Confidential from '../Confidential';
import axios from 'axios';
import { fromByteArray } from 'base64-js';
import Loader from '../../loader';

const Papers = () => {
  const [pdfData, setPdfData] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [base64String, setBase64String] = useState('');
  const [temp_arr,setTempArr]=useState([]);
  const [arr,setArr]=useState([]);
  
  useEffect(() => {
    const uniqueIds = [];
    const uniquePaperObj = temp_arr.filter(item => {
      if (!uniqueIds.includes(item.Status._id)) {
        console.log(item.Status._id);
        uniqueIds.push(item.Status._id);
        return true;
      }
      return false;
    });
    setArr(uniquePaperObj);
    
  }, [temp_arr]);

  useEffect(()=>{
    console.log("om");
    console.log(arr);
  },[arr]);



  useEffect(() => {
    const fetchDataForAssignments = async () => {
      const promises = [];
      papers.forEach((assignment) => {
        promises.push(
          axios.get(`http://localhost:5000/api/r3/singleassignment2/${assignment.Subject}/${assignment.SessionId}/${assignment._id}/${assignment.ExamineeId}`)
        );
      });

      try {
        const responses = await Promise.all(promises);
        responses.forEach((response) => {
          setTempArr((prevPapers) => [...prevPapers, response.data]);
        });
      } catch (error) {
        console.log("Error fetching data for assignments:", error);
      }
    };

    if (papers.length > 0) {
      fetchDataForAssignments();
      
    }
  }, [papers]);
  



  const fetchPdfData = async (pdf, index) => {
    try {
      
      const uint8Array = Uint8Array.from(atob(pdf), c => c.charCodeAt(0));
      // Convert Uint8Array to Base64 string
      const repairedBase64String = fromByteArray(uint8Array);
      console.log("Repaired Base64");
      console.log(repairedBase64String);
      setPdfData(repairedBase64String);
      setLoading(prevLoading => prevLoading.map((val, i) => i === index ? false : val));
    } catch (error) {
      console.error('Error fetching PDF data:', error);
      setLoading(prevLoading => prevLoading.map((val, i) => i === index ? false : val)); // Set loading to false in case of an error
    }
  };

  const fetchAllPapers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/r4/allassignment`);
      if (response.status === 200) {
        setPapers(response.data);
        // Initialize loading array with false for each paper
        setLoading(Array(response.data.length).fill(false));
      }
    } catch (error) {
      console.log("Error in FetchAllPapers", error);
    }
  };

  useEffect(() => {
    fetchAllPapers();
  }, []);



  const handleDownload = async (id, index) => {
    try {
      setLoading(prevLoading => prevLoading.map((val, i) => i === index ? true : val)); // Set loading to true for the clicked row
      
      const response = await axios.get(`http://localhost:5000/api/r4/pdf/${id}`);
      if (response && response.data.pdf) {
        setBase64String(response.data.pdf);
        fetchPdfData(response.data.pdf, index);
      } else {
        setLoading(prevLoading => prevLoading.map((val, i) => i === index ? false : val)); // Set loading to false if response is not successful
      }
    } catch (error) {
      console.log("Error in handleDownload", error);
      setLoading(prevLoading => prevLoading.map((val, i) => i === index ? false : val)); // Set loading to false in case of an error
    }
  }

 

  return (
    <Confidential>{!pdfData ? (
      <div className="Examiner">
        <div className="overflow-x-auto mt-0">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
              <th className="px-4 py-2 text-3xl">Assigned</th>
                <th className="px-4 py-2 text-3xl">Subject</th>
                <th className="px-4 py-2 text-3xl">Branch</th>
                <th className="px-4 py-2 text-3xl">Session</th>
                <th className="px-4 py-2 text-3xl">Year</th>
                <th className="px-4 py-2 text-3xl">Semester</th>
                <th className="px-4 py-2 text-3xl">password</th>
                <th className="px-4 py-2 text-3xl ">Visibility</th>
              </tr>
            </thead>
            <tbody className="mt-2">
              {arr.length > 0 && arr.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="border px-4 py-3 text-lg font-bold text-center">{item.Examiner.name}</td>
                  <td className="border px-4 py-3 text-lg font-bold text-center">{item.assignment[0].Subject_name}</td>
                  <td className="border px-4 py-3 text-lg font-bold text-center">{item.assignment[0].Branch}</td>
                  <td className="border px-4 py-3 text-lg font-bold text-center">{item.Sssion.Session}</td>
                  <td className="border px-4 py-3 text-lg font-bold text-center">{item.Sssion.Year}</td>
                  <td className="border px-4 py-3 text-lg font-bold text-center">{item.assignment[0].SemesterNo}</td>
                  <td className="border px-4 py-3 text-lg font-bold text-center">{item?.Status.password}</td>

                  <td className="border px-4 py-3 text-lg font-bold text-center cursor-pointer" onClick={() => handleDownload(item.Status._id, index)}>
                    {loading[index] ? 
                    <div className="h-5">
                    <Loader />
                    </div> : <div className='text-blue-800 font-bold'>View</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ):(
        <div>
        <div 
  onClick={() => { setPdfData(null); }} 
  className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2 inline-block"
>
  Go back
</div>

        <iframe title="PDF Viewer" src={`data:application/pdf;base64,${pdfData}`}
        style={{ width: '100%', height: '800px' }}
         />
      

        </div>
       
      )}

    </Confidential>
  );
};

export default Papers;
