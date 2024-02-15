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
  const [papers,setPapers]=useState([]);
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
        `http://localhost:5000/api/r2/assignments/${id}`
      );
         
      if (response.statusText === "OK") {
       // console.log(response.data[0].Exam);
       // console.log(response.data[0].Exam);
        setAss(response.data[0].Exam);
       // setindexrArr(data.indexOfExamIdInExaminersArray);
        setLoading(false);
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      alert("Some error is coming");
    }
  }
 useEffect(() => {
  const fetchDataForAssignments = async () => {
    // Define an array to store promises for each API call
    const promises = [];

    // Loop through each assignment
    ass.forEach((assignment) => {
      // Push the promise for each API call into the promises array
      promises.push(
        axios.get(`http://localhost:5000/api/r2/singleassignment/${assignment._id}`)
      );
    });

    try {
      // Wait for all API calls to finish
      const responses = await Promise.all(promises);

      // Iterate over each response and add it to the papers array
      responses.forEach((response) => {
        setPapers((prevPapers) => [...prevPapers, response.data]);
      });
    } catch (error) {
      console.log("Error fetching data for assignments:", error);
    }
  };

  // Call the function to fetch data for assignments when 'ass' changes
  if (ass.length > 0) {
    fetchDataForAssignments();
  }
}, [ass]);
useEffect(() => {
  const fetchDataForAssignments = async () => {
    // Define an array to store promises for each API call
    const promises = [];

    // Loop through each assignment
    ass.forEach((assignment) => {
      // Push the promise for each API call into the promises array
      promises.push(
        axios.get(`http://localhost:5000/api/r2/singleassignment/${assignment._id}`)
      );
    });

    try {
      // Wait for all API calls to finish
      const responses = await Promise.all(promises);

      // Flatten and filter responses to ensure only objects are included
      const filteredResponses = responses.flatMap((response) => response.data).filter((item) => typeof item === "object");

      // Update the papers state with the filtered array of objects
      setPapers(filteredResponses);
    } catch (error) {
      console.log("Error fetching data for assignments:", error);
    }
  };

  // Call the function to fetch data for assignments when 'ass' changes
  if (ass.length > 0) {
    fetchDataForAssignments();
  }
}, [ass]);

  
  useEffect(()=>{
     console.log(papers);
  },[papers])

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
      { papers.length>0 && papers.map((item, i) => (
        <div className=" px-6 py-3 font-semibold text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
         <h1>{item.Subject_name}</h1>
         <h1>{item._id}</h1>
         <h1>{item.Branch}</h1>
         <h1>{item.SemesterNo}</h1>
         <h1>{item.DOE}</h1>
        
     </div>
      
     ))}
     
        
      


         
    </Examiner>
  );
};

export default Assignments;
