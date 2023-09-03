import React, { useState, useEffect } from "react";
import Examiner from "../Examiner";
import { Link } from "react-router-dom";
import Loader from "../../loader";
import axios from "axios";
import { useAuth } from '../../../Context/AuthContext';
const Assignments = () => {
  const { globalResponseData, setGlobalResponseData } = useAuth();
  const [ass, setAss] = useState([]);
  const [loading, setLoading] = useState(true);
  

  async function getAssignments() {
  const id=globalResponseData?._id;
  if(!globalResponseData) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/r2/assignments/${id}`
    );
  
      if (response.statusText==="OK") {
        console.log(response);
      //  console.log(response.data);
      const data = await response.data;
      setAss(data);
        setLoading(false);
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Some error is coming");
    }
    
    
  }

  useEffect(() => {
    getAssignments();
  }, []);

  useEffect(() => {
    console.log("Asse", JSON.stringify(ass, null, 2));
    
  }, [ass]);

  if (loading)
    return (
      <Examiner>
      <Loader/>
      </Examiner>
    );

  return (
    <Examiner>
      <h1 className="text-center text-3xl font-bold">Assignments List</h1>

      {ass.map((assignment, index) => (
        <Link key={index} to={`/Examiner/Assignment/${assignment._id}`}>
          <div className="px-6 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
            <p className="  font-bold">{index}</p>
            <h1 className="  ">{assignment?.Subject?.Name}</h1>
            
            <h1 className="  ">{assignment?.Subject?.SubjectCode}</h1>
            <h1 className="  ">
            
              {new Date(assignment?.DOE).toLocaleDateString()}
            </h1>
            <h1 className=" font-bold text-red-600"> pending </h1>
          </div>
        </Link>
      ))}
    </Examiner>
  );
};

export default Assignments;
