import React, { useState, useEffect, useRef } from "react";
import Assigne from "./Assigne";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../loader";
import { useAuth } from "../../Context/AuthContext";
import { Toast, toast } from "react-hot-toast";

const Subjects = () => {
  const { globalResponseData, setGlobalResponseData } = useAuth();
  const location = useLocation();
  const [examObj, setExamObj] = useState([]);
  const [examObject, setExamObject] = useState([]);

  const { id, Subject } = location.state;
  const [loading, setLoading] = useState(true);
 const [isEmpty,setEmpty] =useState(false);
  const optionRef = useRef(null);
  const sessionRef = useRef(null);
const [ExaminerIds,setExaminerIds]=useState([]);

const selectedExaminersRef = useRef([]);
useEffect(() => {
  if (ExaminerIds ) {
    const getExaminerData = async (id) => {
      try {
        const Examiner = await axios.get(`http://localhost:5000/api/r3/getProfessor/${id}`);
        
        setExamObj(prevState => [...prevState, Examiner?.data]);
    
      } catch (error) {
        console.log("Error in getExaminerData", error);
      }
    }
    // Use Promise.all to wait for all asynchronous calls to complete
    Promise.all(ExaminerIds.map(async (item, index) => {
      await getExaminerData(item?._id);
    }));
    
  }
}, [ExaminerIds]);
useEffect(() => {
  const uniqueIds = [];
  const uniqueExamObj = examObj.filter(item => {
    if (!uniqueIds.includes(item._id)) {
      uniqueIds.push(item._id);
      return true;
    }
    return false;
  });
  setExamObject(uniqueExamObj); 
 
}, [examObj]);


  const fetchExaminers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/r3/allprofessors/${id}`
      );
       
      if (response.data && response.data[0].Examiners) {
        setLoading(false);
        setExaminerIds(response.data[0].Examiners);
      
      } else {
        setLoading(false);
        setEmpty(true);
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Some error is coming");
    }
  };

  useEffect(() => {
    fetchExaminers();
  }, []);

 const handleCheckboxChange = (examinerId,name) => {
  const existingExaminerIndex = selectedExaminersRef.current.findIndex(
    (examiner) => examiner=== examinerId
  );

  if (existingExaminerIndex !== -1) {
    // If the examinerId is already in the array, remove it
    selectedExaminersRef.current.splice(existingExaminerIndex, 1);
  } else {
    
    selectedExaminersRef.current.push(examinerId);
  }
};

  const sendExaminersList = () => {
    const loadingToast = toast.loading("creating assignment...");

    if (selectedExaminersRef.current.length === 0) {
      toast.error("Select at least one examiner", { id: loadingToast });
      return;
    }
    
    // Get the values from the refs
    const optionValue = optionRef.current.value;
    const sessionValue = sessionRef.current.value;
  
    if (!optionValue) {
      toast.error("Select an option", { id: loadingToast });
      return;
    }
    
    if (!sessionValue) {
      toast.error("Select a session", { id: loadingToast });
      return
    }
  
    axios
      .post("http://localhost:5000/api/r3/addassignment", {
        SubjectCode: id,
        Branch: "Cse",
        Option: optionValue,
        SessionInfo: sessionValue,
        SemesterNo: 1,
        ExamCode: "1234",
        DOE: new Date(),
        ExaminersId: selectedExaminersRef.current,
        Year: new Date().getFullYear(),
        Subject_name: Subject,
        
        
      })
      .then((response) => {
        toast.success("success", { id: loadingToast });
        console.log("Response from the API:", response.data);
      })
      .catch((error) => {
        toast.error("error", { id: loadingToast });
        console.error("Error:", error);
        alert("Error");
      });
  };

  if (loading)
    return (
      <Assigne>
        <Loader />
      </Assigne>
    );
    if(isEmpty)
    {
      return (
        <Assigne>
         <div class="bg-blue-100 p-4 rounded-lg shadow-md">
<p class="text-blue-500 font-semibold">No Examiner Found</p>
</div>
        </Assigne>
      );

    }

  return (
    <Assigne>
    
      <div className="text-center text-3xl mb-3 font-bold">{Subject} </div>
      <div className="bg-white rounded mt-2 p-3 flex flex-col">
        <div className="p-3 border-[1px] flex flex-col gap-2  overflow-y-auto w-full max-w-lg ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendExaminersList();
            }}
            className=" text-xl"
          >
            <select
              id="option"
              name="option"
              className="w-full  p-2 border rounded-md shadow-sm focus:ring focus:white bg-white"
              ref={optionRef}
            >
              <option value="" selected disabled hidden>
                Choose option
              </option>
              <option  value="regular">Regular</option>
              <option value="reappear">Reappear</option>
              <option value="golden-chance">Golden Chance</option>
            </select>
            <select
              id="session"
              name="session"
              className="w-full  p-2 border rounded-md shadow-sm focus:ring focus:white bg-white"
              ref={sessionRef}
            >
              <option value="" selected disabled hidden>
                Choose session
              </option>
              <option value="july">July</option>
              <option value="january">January</option>
            </select>
            {examObject && (
              <div>
                <h1 className="text-xl my-3">Choose examiners to assign :- </h1>
                {examObject.map((items, i) => (
                  <div
                    key={items.id}
                    className="flex  my-2  bg-neutral-100 px-2  items-center   gap-5"
                  >
                    <div className=" text-xl">{i + 1}.</div>
                    <div className="flex-grow py-[0.2669rem] rounded-md">
                      <p className=" text-xl  ">{items?.name}</p>
                    </div>
                    <div className="ml-10 mr-4">
                      <input
                        type="checkbox"
                        className="  scale-150"
                       
                        onClick={() => handleCheckboxChange(items._id,items.name)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="uppercase mt-3 bg-sky-500 text-white rounded-full px-4 py-2 font-bold"
              type="submit"
            >
              Assign Examiners
            </button>
          </form>
        </div>
      </div>
    </Assigne>
  );
};

export default Subjects;
