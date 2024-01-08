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
  const [isSelected,setisSelected]= useState();
  const [index,setIndex] =useState();
  const [examId,setexamId]= useState();

const[load,setReload]=useState(false);

  const modify = async (index, isSelectedValue, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/r2/ModifySelect/${id}/${index}`, { isSelected: isSelectedValue });
      console.log(response.data.message);
      if(response){
        window.location.reload();
      }
    
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };


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
        const data = JSON.parse(localStorage.getItem("Professor"));
        if (data) {
          setGlobalResponseData(data);
          
          setLoading(false);
        }
      } catch (error) {
        
        console.error("Error parsing JSON:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (globalResponseData) {
      getAssignments();
    }
    else console.log("Nothing");
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
     
        <h1 className="  ml-11 "> Subject </h1>
        <h1 className="  ">Subject Code</h1>
        <h1 className="  ">Branch</h1>
        <h1 className="  ">Semester</h1>
        <h1 className="  ">Date</h1>
        <h1 className="  ">Status1</h1>
        <h1 className="  ">Status2</h1>
      </div>
    
      {ass.map((assignment, index) => (
  <div  key={`${index}-${assignment._id}`}>
    {assignment.Examiners && indexArr[index] !== undefined ? (
      <div>
        {assignment.Examiners[indexArr[index].index]?.IsSelected === 1 ? (
          <Link to={`/Examiner/Assignment/${assignment._id}`}>
            <div className="px-9 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
              <div className="flex items-center">
                <p className="text-base font-bold">{index + 1}</p>
                <h1 className="ml-16">{assignment?.Subject?.Name}</h1>
              </div>

              <h1>{assignment?.Subject?.SubjectCode}</h1>
              <h1 className=" ml-24">{assignment?.Branch}</h1>
              <h1>{assignment?.SemesterNo}</h1>
              <h1>{new Date(assignment?.DOE).toLocaleDateString()}</h1>
              {assignment.Examiners[indexArr[index].index]?.Ispending ? (
                <MdQuestionMark className="fill-red-500 border text-3xl rounded-full bg-white p-1" />
              ) : (
                <MdDone className="fill-green-500 border text-3xl rounded-full bg-white p-1" />
              )}
              {assignment.Examiners[indexArr[index].index]?.IsSelected === 0 ? (
                <div className="display flex justify-center gap-3 cursor-pointer">
                  <div
                    className="text-green-500 text-lg "
                    onClick={() => modify(indexArr[index].index, 1, assignment._id)}
                  >
                    Accept
                  </div>
                  <div
                    className="text-red-500 text-lg  "
                    onClick={() => modify(indexArr[index].index, -1, assignment._id)}
                  >
                    Decline
                  </div>
                </div>
              ) : assignment.Examiners[indexArr[index].index]?.IsSelected === 1 ? (
                <div className="text-green-500 text-lg">Accepted</div>
              ) : assignment.Examiners[indexArr[index].index]?.IsSelected === -1 ? (
                <div className="text-red-500 text-lg">Declined</div>
              ) : (
                <p>Something wrong here</p>
              )}
            </div>
          </Link>
        ) : (
          <div className="px-9 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
            <div className="flex items-center">
              <p className="text-base font-bold">{index + 1}</p>
              <h1 className="ml-16">{assignment?.Subject?.Name}</h1>
            </div>

            <h1>{assignment?.Subject?.SubjectCode}</h1>
            <h1 className=" ml-24">{assignment?.Branch}</h1>
            <h1>{assignment?.SemesterNo}</h1>
            <h1>{new Date(assignment?.DOE).toLocaleDateString()}</h1>
            {assignment.Examiners[indexArr[index].index]?.Ispending? (
              <MdQuestionMark className="fill-red-500 border text-3xl rounded-full bg-white p-1" />
            ) : (
              <MdDone className="fill-green-500 border text-3xl rounded-full bg-white p-1" />
            )}
            {assignment.Examiners[indexArr[index].index]?.IsSelected === 0 ? (
              <div className="display flex justify-center gap-3 cursor-pointer">
                <div
                  className="text-green-500 text-lg"
                  onClick={() => modify(indexArr[index].index, 1, assignment._id)}
                >
                  Accept
                </div>
                <div
                  className="text-red-500 text-lg"
                  onClick={() => modify(indexArr[index].index, -1, assignment._id)}
                >
                  Decline
                </div>
              </div>
            ) : assignment.Examiners[indexArr[index].index]?.IsSelected === -1 ? (
              <div className="text-red-500 text-lg">Declined</div>
            ) : (
              <p>Something wrong here</p>
            )}
          </div>
        )}
      </div>
    ) : (
      <div className="px-9 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
        <div className="flex items-center">
          <p className="text-base font-bold">{index + 1}</p>
          <h1 className="ml-16">{assignment?.Subject?.Name}</h1>
        </div>

        <h1>{assignment?.Subject?.SubjectCode}</h1>
        <h1 className=" ml-24">{assignment?.Branch}</h1>
        <h1>{assignment?.SemesterNo}</h1>
        <h1>{new Date(assignment?.DOE).toLocaleDateString()}</h1>
        {assignment.Examiners[indexArr[index].index]?.Ispending ? (
          <MdQuestionMark className="fill-red-500 border text-3xl rounded-full bg-white p-1" />
        ) : (
          <MdDone className="fill-green-500 border text-3xl rounded-full bg-white p-1" />
        )}
      </div>
    )}
  </div>
))}


         
    </Examiner>
  );
};

export default Assignments;
