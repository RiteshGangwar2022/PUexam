import React, { useState, useEffect } from "react";
import Assigne from "./Assigne";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Subjects = () => {
    const location = useLocation();
    const [examObj, setExamObj] = useState();
    const [selectedExaminers, setSelectedExaminers] = useState([]);
    const { id, Subject } = location.state;

    useEffect(() => {
        fetchExaminers();
    }, []);

    const fetchExaminers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/r3/allexaminers/${id}`
            );

            if (response.data && response.data[0]) {
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

      
    }

    return (
        <Assigne>
            <div className="bg-white rounded mt-2 px-4 py-2 flex flex-col">
                <div className="text-4xl font-bold items-center justify-center">{Subject}</div>
                <div className="flex gap-14 justify-center items-center">
                    <div className='font-bold text-3xl text-black flex flex-col justify-center items-center pb-12'>
                        Assign to
                    </div>
                    <div className="w-fit bg-white rounded-lg shadow border-2 border-gray-500">
                        <div className="max-h-36 overflow-y-auto max-w-lg w-80">
                            {examObj && examObj.Examiners.map((items, i) => (
                                <div key={items.id} className="flex items-start border-2 border-gray-500 gap-5">
                                    <div>{i + 1}.</div>
                                    <div className="flex-grow py-[0.2669rem] rounded-md">
                                        <p className="text-gray-800">{items.name}</p>
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
                        onClick={()=>sendExaminersList()}
                        >
                            Add Examiners
                        </button>
                    </div>
                </div>
            </div>
        </Assigne>
    );
};

export default Subjects;
