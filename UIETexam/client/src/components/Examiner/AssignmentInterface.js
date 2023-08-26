import React, { useState, useEffect } from "react";
import Examiner from "./Examiner";
import { clsx } from "clsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generate } from "./TemplateGen";


const steps = ["setup", "questions", "preview", "publish"];
// var docxConverter = require('docx-pdf');



const GetAssignmentInfo = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/r2/singleassigmnet/${id}`
    );

    return response;
  } catch (error) {
    console.log("Exam not found");
    alert("Exam not found. Try again.");
  }
};

const Generate = async (id) => {
  const info = await GetAssignmentInfo(id);
  // console.log(info.data)
  generate(info.data);
};

const AssignmentInterface = () => {
  const { id } = useParams();
  const [active, setActive] = useState(0);
  const [assignment, setAssignment] = useState([]);
  const [document,setDocument]  = useState();

// const pdf = {
//   input: document,
//   output: "/tmp/encrypted.pdf",
//   password: "1234",
// }

// async function encryptPDF (){
  
//   const encPdf =  await encrypt(pdf);
// }
  
  async function getAssignments() {
    const res = await fetch("http://localhost:5000/api/r2/assigmnets");

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch assignments data");
    }

    const data = await res.json();
    setAssignment(data);
    // console.log("d=", data);
  }

  useEffect(() => {
    getAssignments();
  }, []);

  const Tabs = () => {
    switch (active) {
      case 0:
        return (
          <div className=" flex justify-center  relative border-2 p-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            <div className="  p-2  gap-3 flex flex-col w-full max-w-3xl ">
              <h1 className=" text-3xl  mb-10 text-center">Assignment</h1>
              <h1 className=" text-2xl    ">
                ExamCode:- {assignment[0]?.ExamCode}
              </h1>
              <h1 className=" text-2xl    ">
                SubjectCode:- {assignment[0]?.Subject?.SubjectCode}
              </h1>
              <h1 className=" text-2xl    ">
                Subject:- {assignment[0]?.Subject?.Name}
              </h1>
              {/* <h1 className=" text-2xl  text-red-700  ">Subject {assignment[0]?.Providers[0]?.name}</h1> */}
              {/* <h1 className=" text-2xl  text-red-700  ">Providers </h1> */}

              <p className=" text-red-600" >
                short note on what to do with this Template can be given to an
                examiner. or instruction can be given here if required.
               
                
              </p>

              <p>Download Template given below  </p>
              <button
                onClick={() => Generate(id)}
                className=" bg-green-400 px-5 py-2    rounded-full text-white font-bold text-xl"
              >
                Download Template
              </button>
            </div>
            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Back
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      case 1:
        return (
          <div className=" relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            questions
            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Back
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className=" relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            preview
            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Back
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className=" relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            

                <label>Upload</label>
                <input type='file'  onChange={(e)=>(console.log(" f= ",e.target.files[0]))}  />


            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Back
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      default:
        return <h1>error </h1>;
    }
  };

  return (
    <Examiner>
      <h1 className=" text-center text-3xl font-bold mb-7 ">Create Exam</h1>
      <div>
        <div className="grid grid-cols-4 ">
          {steps.map((x, index) => (
            <div className="flex items-center " key={index}>
              <h1
                onClick={() => setActive(index)}
                className={clsx(
                  "cursor-pointer border-sky-400 border-2  px-4 py-1 text-xl rounded-full",
                  { "font-bold bg-sky-300 text-white": index === active }
                )}
              >
                {x}
              </h1>
              {index < 3 && <div className="w-full h-[3px] bg-sky-400"></div>}
            </div>
          ))}
        </div>
        {Tabs()}
      </div>
    </Examiner>
  );
};

export default AssignmentInterface;
