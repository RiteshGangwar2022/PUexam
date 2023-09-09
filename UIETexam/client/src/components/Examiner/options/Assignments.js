import React, { useState, useEffect } from "react";
import Examiner from "../Examiner";
import { Link } from "react-router-dom";
import Loader from "../../loader";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { MdDone, MdQuestionMark } from "react-icons/md";

const Assignments = () => {
  const { globalResponseData, setGlobalResponseData } = useAuth();
  const [ass, setAss] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAssignments() {
    const id = globalResponseData?._id;
    if (!globalResponseData) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/r2/assignments/${id}`
      );

      if (response.statusText === "OK") {
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
    const fetchData = async () => {
      // Retrieve data from local storage when the component mounts
      try {
        const data = JSON.parse(localStorage.getItem("globalData"));
        if (data) {
          setGlobalResponseData(data);
          // Load assignments asynchronously
        }
        // Further processing with parsedData
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
    if (globalResponseData) getAssignments();
  }, [globalResponseData]);

  if (loading)
    return (
      <Examiner>
        <Loader />
      </Examiner>
    );

  return (
    <Examiner>
      <h1 className="text-center text-3xl font-bold">Assignments List</h1>

      <div className=" px-6 py-3 font-semibold text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
        <div className=" flex items-center ">
          <h1 className="  ml-16  "> Subject </h1>
        </div>

        <h1 className="  ">Subject Code</h1>
        <h1 className="  ">Branch</h1>
        <h1 className="  ">Semester</h1>
        <h1 className="  ">Date</h1>
        <h1 className="  ">Status</h1>
      </div>
      {ass.map((assignment, index) => (
        <Link key={index} to={`/Examiner/Assignment/${assignment._id}`}>
          <div className="px-6 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
            <div className=" flex items-center ">
              <p className="  text-base font-bold">{index+1}</p>
              <h1 className=" ml-16  ">{assignment?.Subject?.Name}</h1>
            </div>

            <h1 className="  ">{assignment?.Subject?.SubjectCode}</h1>
            <h1 className="  ">{assignment?.Branch}</h1>
            <h1 className="  ">{assignment?.SemesterNo}</h1>
            <h1 className="  ">
              {new Date(assignment?.DOE).toLocaleDateString()}
            </h1>
            {assignment.Ispending ? (
              <MdQuestionMark className="  fill-red-500 border text-3xl rounded-full bg-white p-1 " />
            ) : (
              <MdDone className="fill-green-500 border text-3xl rounded-full bg-white p-1 " />
            )}
          </div>
        </Link>
      ))}
    </Examiner>
  );
};

export default Assignments;
