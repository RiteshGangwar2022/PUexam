import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Assigne from "../Assigne";
import { useNavigate } from 'react-router-dom';

const Assign = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    FetchSubjects();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated subjects:", subjects);
  }, [subjects]);

  const FetchSubjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/r3/getsubject"
      );

      if (response.data) {
        //  console.log(response.data);
        setSubjects(response.data);
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Some error is coming");
    }
  };

  const handleRedirect = (url, data) => {
    navigate(url, { state: data });
  };

  return (
    <>
      <Assigne>
        <h1 className="text-center text-3xl mb-3 font-bold">Subjects List</h1>

        <div className="  grid  grid-cols-3 gap-3">
          {subjects.map((sub, index) => (
            
            <div onClick={() => handleRedirect(  `/Assigne/Subjects/${sub.Name}`, { id: sub._id,
              Subject: sub.Name,
               })} key={index} className=" cursor-pointer bg-white rounded-md p-3">
              <div className=" flex gap-2">
                <h1 className=" text-xl"> Subject </h1>
                <h1 className=" text-xl font-semibold"> {sub.Name} </h1>
              </div>
              <div className=" flex gap-2">
                <h1 className="text-xl"> Subject Code </h1>
                <h1 className=" text-xl font-semibold"> {sub.SubjectCode} </h1>
              </div>
            </div>
          ))}
        </div>
      </Assigne>
    </>
  );
};

export default Assign;
