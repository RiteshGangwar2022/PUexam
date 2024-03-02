import React, { useState, useEffect } from 'react';
import Assigne from '../Assigne';
import Loader from '../../loader';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Papers = () => {
  const [data, setData] = useState([]);
  const [temp_arr,setTempArr]=useState([]);
  const [arr,setArr]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/r3/getexamList");

      if (response.data) {
        setData(response.data);

      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      alert("Some error is coming");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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

  // useEffect(()=>{
  //   console.log("om");
  //   console.log(arr);
  // },[arr]);



  useEffect(() => {
    const fetchDataForAssignments = async () => {
      const promises = [];
      data.forEach((assignment) => {
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

    if (data.length > 0) {
      fetchDataForAssignments();
      
    }
  }, [data]);
  
  useEffect(()=>{
   if(arr.length>0)
   {
    setLoading(false);
   }
  },[arr]);
  if (loading)
  return (
    <Assigne>
      <Loader />
    </Assigne>
  );

  return (
    <Assigne>
      <h1 className="text-center text-3xl font-bold">Papers List</h1>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-2xl">Assigned</th>
            <th className="px-4 py-2 text-2xl">Subject</th>
            <th className="px-4 py-2 text-2xl">Branch</th>
            <th className="px-4 py-2 text-2xl">Session</th>
            <th className="px-4 py-2 text-2xl">Year</th>
            <th className="px-4 py-2 text-2xl">Semester</th>
           
            <th className="px-4 py-2 text-2xl">Status1</th>
            <th className="px-4 py-2 text-2xl">Status2</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((examiner, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="border px-4 py-3 text-lg font-bold text-center">{examiner.Examiner.name}</td>
              <td className="border px-4 py-3 text-lg font-bold text-center">{examiner?.assignment[0]?.Subject_name}</td>
              <td className="border px-4 py-3 text-lg font-bold text-center">{examiner?.assignment[0]?.Branch}</td>
              <td className="border px-4 py-3 text-lg font-bold text-center">{examiner?.Sssion?.Session}</td>
              <td className="border px-4 py-3 text-lg font-bold text-center">{examiner?.Sssion?.Year}</td>
              <td className="border px-4 py-3 text-lg font-bold text-center">{examiner?.assignment[0]?.SemesterNo}</td>
           
              <td className="border px-4 py-3 text-lg font-bold text-center">
                {examiner?.Status.Ispending === true ? (
                  <div className="text-red-950 text-lg">Pending</div>
                ) :  (
                  <div className="text-green-500 text-lg">Completed</div>
                ) }
              </td>
              <td className="border px-4 py-3 text-lg font-bold text-center">
                {examiner?.Status.IsSelected === 0 ? (
                  <div className="text-red-950 text-lg">Pending</div>
                ) : examiner?.Status.IsSelected === 1 ? (
                  <div className="text-green-500 text-lg">Accepted</div>
                ) : examiner?.Status.IsSelected === -1 ? (
                  <div className="text-red-500 text-lg">Declined</div>
                ) : (
                  <p>Something wrong here</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Assigne>
  );
};

export default Papers;
