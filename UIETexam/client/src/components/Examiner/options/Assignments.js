import React, { useState, useEffect } from "react";
import Examiner from "../Examiner";
import { Link } from "react-router-dom";
import Loader from "../../loader";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { MdDone, MdQuestionMark } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Assignments = () => {
  const { globalResponseData, setGlobalResponseData } = useAuth();
  const [ass, setAss] = useState([]);
  const [papers, setPapers] = useState([]);
  const [Branches,setBranches]=useState([]);
  const [loading, setLoading] = useState(true);
 const [sessVal,setSessVal]=useState("$");
 const [Subjects,setSubjects]=useState([]);
 const [subject,setSubject]=useState("$");
 const [years,setYears]=useState([]);
 const [year,setYear]=useState("$");
  const [load, setReload] = useState(true);
  const [papersObject, setPapersObject] = useState([]);
  const [Session,setSession]=useState([]);
  const [BranchVal,setBranchVal]=useState("$");

  const navigate = useNavigate();
  const handleRedirect = (url, data) => {
    navigate(url, { state: data });
  };
  useEffect(()=>{
console.log(papersObject);
  },[papersObject])
  useEffect(() => {
    const uniqueIds = [];
    const uniqueSession=[];
    const uniqueBranch=[];
    const uniqueSubjects=[];
    const uniqueyear=[];
    
    const uniquePaperObj = papers.filter(item => {
      if (!uniqueIds.includes(item.Sssion._id)) {
        uniqueIds.push(item.Sssion._id);
        return true;
      }
      return false;
    });
    const uniquesess = papers.filter(item => {
      if (!uniqueSession.includes(item.Sssion.Session)) {
        uniqueSession.push(item.Sssion.Session);
        return true;
      }
      return false;
    });
    const uniqueBranches = papers.filter(item => {
    
      if (!uniqueBranch.includes(item.assignment[0].Branch)) {
        uniqueBranch.push(item.assignment[0].Branch);
        return true;
      }
      return false;
    });
    const uniqueSubjext = papers.filter(item => {
    
      if (!uniqueSubjects.includes(item.assignment[0].Subject_name)) {
        uniqueSubjects.push(item.assignment[0].Subject_name);
        return true;
      }
      return false;
    });
    const uniqueYr = papers.filter(item => {
      if (!uniqueyear.includes(item.Sssion.Year)) {
        uniqueyear.push(item.Sssion.Year);
        return true;
      }
      return false;
    });
    setYears(uniqueyear);
    setSubjects(uniqueSubjects);
    setPapersObject(uniquePaperObj);
    setSession(uniqueSession);
    setBranches(uniqueBranch);
  }, [papers]);

  // useEffect(() => {
  //   console.log("om");
  //   console.log(Branches);
  // }, [Branches]);

  const modify = async (id, isSelectedValue, i) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/r2/ModifySelect/${id}`, { isSelected: isSelectedValue });
      //console.log(response.data.message);
      if (response) {
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
      const response = await axios.get(`http://localhost:5000/api/r2/assignments/${id}`);
      if (response.statusText === "OK") {
        setAss(response.data[0].Exam);
        if(response.data[0].Exam.length===0) setReload(false);
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      alert("Some error is coming");
    }
  }

  useEffect(() => {
    const fetchDataForAssignments = async () => {
      const promises = [];
      ass.forEach((assignment) => {
        promises.push(
          axios.get(`http://localhost:5000/api/r2/singleassignment/${assignment._id}/${assignment.SessionId}`)
        );
      });

      try {
        const responses = await Promise.all(promises);
        responses.forEach((response) => {
          setPapers((prevPapers) => [...prevPapers, response.data]);
        });
      } catch (error) {
        console.log("Error fetching data for assignments:", error);
      }
    };

    if (ass.length > 0) {
      fetchDataForAssignments();
    }
  }, [ass]);

  useEffect(() => {
    const fetchData = async () => {
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
    } else {
      console.log("Nothing");
    }
  }, [globalResponseData]);
  useEffect(()=>{
  if(papersObject.length>0){
    setReload(false);
  }
  },[papersObject])

  useEffect(()=>{
    console.log(sessVal);
   },[sessVal]);
   useEffect(()=>{
    console.log(Session);
   },[Session]);

  if (load) {
    return (
      <Examiner>
        <Loader />
      </Examiner>
    );
  }
  const check=(data)=>{
      if(sessVal!=="$")
    {
      if(data.Sssion.Session!==sessVal) return false;
    }
    if(BranchVal!=="$")
    {
      if(data.assignment[0].Branch!==BranchVal) return false;
    }
   
   if(subject!=="$")
    { 
      if(data.assignment[0].Subject_name!==subject) return false;
    
    }

    if(year!=="$")
    {
      if(data.Sssion.Year!=year) return false;
    }
  
 

    return true;
    

  }

  return (
    <Examiner>
      <div className="Examiner">
        <div className="overflow-x-auto ">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
              <th className="px-2 py-2 text-3xl ">
  <select
    id="Subject"
    name="Subject"
    className="w-full px-2 text-black text-3xl font-bold mt-3 appearance-none text-center cursor-pointer bg-gray-200"
    onChange={(e) => setSubject(e.target.value)} 
  >
    <option value="$" className="text-base" >Subject</option>
    {Subjects.map((sb, index) => (
      <option key={index} value={sb} className="text-base">{sb}</option>
    ))}
  </select>
</th>

                <th className="px-4 py-2 text-3xl">Subject Code</th>
                <th className="px-4 py-2 text-3xl">
                <select
  id="branch"
  name="branch"
  className="w-full px-2 text-black text-3xl font-bold mt-3 appearance-none cursor-pointer bg-gray-200"
  onChange={(e) => setBranchVal(e.target.value)} 
>
  <option value="$" className="text-base" >Branch</option>
  {Branches.map((br, index) => (
    <option key={index} value={br}
    className="text-base"
    >{br}</option>
  ))}
</select>
                </th>
               <th>
               <select
  id="session"
  name="session"
  className="w-full px-2 text-black text-3xl font-bold mt-3 appearance-none cursor-pointer bg-gray-200"
  onChange={(e) => setSessVal(e.target.value)} 
>
  <option value="$" className="text-base" >Session</option>
  {Session.map((session, index) => (
    <option key={index} value={session}
    className="text-base"
    >{session}</option>
  ))}
</select>
               </th>
              
                <th className="px-4 py-2 text-3xl">Semester</th>
                <th className="px-2 py-2 text-3xl">
  <select
    id="Year"
    name="Year"
    className="w-full px-2 text-black text-3xl font-bold mt-3 appearance-none text-center cursor-pointer bg-gray-200"
    onChange={(e) => setYear(e.target.value)} 
  >
    <option value="$" className="text-base" >Year</option>
    {years.map((yr, index) => (
      <option key={index} value={yr} className="text-base cursor-pointer">{yr}</option>
    ))}
  </select>
</th>
                <th className="px-4 py-2 text-3xl">Status1</th>
                <th className="px-4 py-2 text-3xl">Status2</th>
              </tr>
            </thead>
            <tbody className="mt-2">
  {papersObject.length > 0 &&
    papersObject.map((item, i) => (
      check(item) && (
        <tr key={i} className={i % 2 === 0 ? 'bg-gray-100 c' : 'bg-white '}>
          <td className="border px-4 py-3 text-lg font-bold text-center">{item.assignment[0].Subject_name}</td>
          <td className="border px-4 py-3 text-lg font-bold text-center">{item.assignment[0]._id}</td>
          <td className="border px-4 py-3 text-lg font-bold text-center">{item.assignment[0].Branch}</td>
          <td className="border px-4 py-3 text-lg font-bold text-center">{item.Sssion.Session}</td>
          <td className="border px-4 py-3 text-lg font-bold text-center">{item.assignment[0].SemesterNo}</td>
          <td className="border px-4 py-3 text-lg font-bold text-center">{item.Sssion.Year}</td>
          <td className="border px-4 py-3">
            {item.Status.IsSelected === 0 ? (
              <div className="flex gap-3">
                <div
                  className="bg-green-500 text-white px-1 rounded cursor-pointer text-center"
                  onClick={() => { modify(item.Status._id, 1) }}
                >
                  Accept
                </div>
                <div
                  className="bg-red-500 text-white px-1 rounded  text-center cursor-pointer"
                  onClick={() => { modify(item.Status._id, -1) }}
                >
                  Decline
                </div>
              </div>
            ) : (
              <>
                {item.Status.IsSelected === 1 ? (
                  <div
                    className="text-green-700 font-bold px-2 text-lg rounded text-center cursor-pointer"
                    onClick={() => handleRedirect(`/Examiner/Assignment/${item.assignment[0].ExamCode}`, { Obj: item })}
                  >
                    GO
                  </div>
                ) : (
                  <div className="text-red-800 font-bold px-2 rounded text-center text-lg">Declined</div>
                )}
              </>
            )}
          </td>
          <td className="border px-4 py-3">
            {item.Status.Ispending ? (
              <div className="text-red-800 font-bold px-2 rounded text-center">Pending</div>
            ) : (
              <div className="text-green-700 text-lg font-bold px-2 rounded text-center">Completed</div>
            )}
          </td>
        </tr>
      )
    ))}
</tbody>
          </table>
        </div>
      </div>
    </Examiner>
  );
};

export default Assignments;
