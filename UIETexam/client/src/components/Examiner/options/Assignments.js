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
  const [indexArr,setindexrArr] =useState([]);
  const [loading, setLoading] = useState(true);

  async function getAssignments() {
    const id = globalResponseData?._id;
    if (!globalResponseData) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/r2/singleassignment/${id}`
      );

      if (response.statusText === "OK") {
        const data = await response.data;
        setAss(data.assignmentData);
        setindexrArr(data.indexOfExamIdInExaminersArray);
        setLoading(false);
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
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
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (globalResponseData) getAssignments();
  }, [globalResponseData]);

  useEffect(() => {
    console.log("Data:");
    ass.forEach((assignment, index) => {
      const formattedAssignment = JSON.stringify(assignment, null, 2);
      console.log(`Assignment ${index + 1}:`);
      console.log(formattedAssignment);
    });
    console.log("data 1", indexArr);
    console.log(ass)

  }, [ass, indexArr]);

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
     
        <h1 className="  ml-11 "> Subject </h1>
        <h1 className="  ">Subject Code</h1>
        <h1 className="  ">Branch</h1>
        <h1 className="  ">Semester</h1>
        <h1 className="  ">Date</h1>
        <h1 className="  ">Status1</h1>
        <h1 className="  ">Status2</h1>
      </div>
    
      {ass.map((assignment, index) => (
  <Link key={index} to={`/Examiner/Assignment/${assignment._id}`}>
    <div className="px-9 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
      <div className="flex items-center">
        <p className="text-base font-bold">{index + 1}</p>
        <h1 className="ml-16">{assignment?.Subject?.Name}</h1>
      </div>

      <h1>{assignment?.Subject?.SubjectCode}</h1>
      <h1 className=" ml-24">{assignment?.Branch}</h1>
      <h1>{assignment?.SemesterNo}</h1>
      <h1>{new Date(assignment?.DOE).toLocaleDateString()}</h1>
      {assignment.Ispending ? (
        <MdQuestionMark className="fill-red-500 border text-3xl rounded-full bg-white p-1" />
      ) : (
        <MdDone className="fill-green-500 border text-3xl rounded-full bg-white p-1" />
      )}
      {assignment.Examiners && indexArr[index] !== undefined ? (
        assignment.Examiners[indexArr[index].index]?.IsSelected === 0 ? (
          <div className="display flex justify-center gap-3">
            <div className="text-green-500 text-lg">Accept</div>
            <div className="text-red-500 text-lg">Decline</div>
          </div>
        ) : assignment.Examiners[indexArr[index].index]?.IsSelected === 1 ?  (
          <p>Render something when Examiners[index] is 1</p>
        ) : 
        assignment.Examiners[indexArr[index].index]?.IsSelected === -1 ?
        (
          <p>Render something when Examiners[index] is -1</p>
        )
        :(
          <p>Something wrong here</p>
        )
      ) : (
        <p>Examiners data not available</p>
      )}
    </div>
  </Link>
))}

         
    </Examiner>
  );
};

export default Assignments;
