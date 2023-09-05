import React, { useState, useEffect } from "react";
import Assigne from "./Assigne";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Loader from "../loader";
import { useAuth } from '../../Context/AuthContext';
const Subjects = () => {
    const { globalResponseData, setGlobalResponseData } = useAuth();
    const location = useLocation();
    const [examObj, setExamObj] = useState();
    const [selectedExaminers, setSelectedExaminers] = useState([]);
    const { id, Subject } = location.state;
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        fetchExaminers();
    }, []);

    const fetchExaminers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/r3/allexaminers/${id}`
            );

            if (response.data && response.data[0]) {
               setLoading(false)
                setExamObj(response.data[0]);
            } else {
                alert("Not able to fetch");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Some error is coming");
        }
    };

    useEffect(() => {
      console.log("Exmainers Slected ");
      console.log(selectedExaminers);
  }, [selectedExaminers]);

    const handleCheckboxChange = (examinerId) => {
      
      setSelectedExaminers((prevItems) => {
        if (prevItems.includes(examinerId)) {

          
          return prevItems.filter((item) => item !== examinerId);
        } else {
          
          return [...prevItems, examinerId];
        }
      });
    };

 
    const sendExaminersList = ()=>{    
axios
      .post('http://localhost:5000/api/r3/addassignment', {
        DOE: new Date(),
        ExamCode: "1234",
        Branch: "Cse",
        SemesterNo: 1,
        Examiners: selectedExaminers,
        Subject: id
          
      })
      .then((response) => {
        console.log('Response from the API:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error");
      });

      
    }


    if(loading) return <Assigne> <Loader/> </Assigne>

    return (
        <Assigne>
                <div className="text-center text-3xl mb-3 font-bold">{Subject} </div>
            <div className="bg-white rounded mt-2 p-3 flex flex-col">
                {/* <div className="flex gap-14 justify-center items-center">
                    <div className='font-bold text-3xl text-black flex flex-col justify-center items-center pb-12'>
                        Assign to
                    </div>
                    <div className="w-fit bg-white rounded-lg shadow ">
                        <div className="max-h-36 p-3 overflow-y-auto max-w-lg w-80">
                            {examObj && examObj.Examiners.map((items, i) => (
                                <div key={items.id} className="flex  items-center   gap-5">
                                    <div className=" text-xl">{i + 1}.</div>
                                    <div className="flex-grow py-[0.2669rem] rounded-md">
                                        <p className=" text-xl text-gray-800">{items.name}</p>
                                    </div>
                                    <div className='ml-10 mr-4'>
                                        <input
                                            type="checkbox"
                                            // onChange={() => handleCheckboxChange(items.id)}
                                            onChange={() => handleCheckboxChange(items._id)}

                                         
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col justify-end items-end '>
                        <button className="uppercase bg-sky-500 text-white rounded-full px-4 py-2 shadow-md ml-4 font-bold 
                        "
                        onClick={sendExaminersList}
                        >
                            Assign Exmainers
                        </button>
                    </div>
                </div> */}

                <h1 className=" text-xl">Choose examiners to assign :- </h1>
                <div className="w-full max-w-4xl  my-3  bg-white rounded-sm  ">
                        <div className=" p-3 border-[1px] overflow-y-auto w-full max-w-lg ">
                            {examObj && examObj.Examiners.map((items, i) => (
                                <div key={items.id} className="flex  my-2  bg-neutral-100 px-2  items-center   gap-5">
                                    <div className=" text-xl">{i + 1}.</div>
                                    <div className="flex-grow py-[0.2669rem] rounded-md">
                                        <p className=" text-xl  ">{items.name}</p>
                                    </div>
                                    <div className='ml-10 mr-4'>
                                        <input
                                            type="checkbox"
                                            // onChange={() => handleCheckboxChange(items.id)}
                                            onChange={() => handleCheckboxChange(items._id)}
                                            className="  scale-150"
                                         
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="uppercase mt-3 bg-sky-500 text-white rounded-full px-4 py-2 font-bold 
                        "
                        onClick={sendExaminersList}
                        >
                            Assign Exmainers
                        </button>
                    </div>
            </div>
        </Assigne>
    );
};

export default Subjects;
