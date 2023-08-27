import React, { useState, useEffect } from "react";
import Examiner from "./Examiner";
import { clsx } from "clsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generate } from "./TemplateGen";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
const steps = ["setup", "questions", "preview", "publish"];

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
  const [document, setDocument] = useState();
  const [upload, setUpload] = useState("upload PDF only");

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
          <div className=" flex justify-center items-center   relative border-2 p-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            <div className="  p-3  gap-3 flex flex-col w-full bg-sky-50 rounded-xl border-slate-300 border-2 max-w-3xl ">
              <h1 className=" text-2xl uppercase  mb-10 text-center">
                Assignment Information
              </h1>

              <div className=" flex gap-2  items-center">
                <h1 className=" text-xl    ">Exam Code</h1>
                <h1 className=" text-xl bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                  {assignment[0]?.ExamCode}
                </h1>
              </div>

              <div className=" flex gap-2  items-center">
                <h1 className=" text-xl    ">Subject Code</h1>
                <h1 className=" text-xl bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                  {assignment[0]?.Subject?.SubjectCode}
                </h1>
              </div>

              <div className=" flex gap-2  items-center">
                <h1 className=" text-xl    ">Subject</h1>
                <h1 className=" text-xl bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                  {assignment[0]?.Subject?.Name}
                </h1>
              </div>

              <p className=" text-red-600">
                short note on what to do with this Template can be given to an
                examiner. or instruction can be given here if required.
              </p>

              <p>Download Template given below </p>
              <button
                onClick={() => Generate(id)}
                className=" bg-green-500 px-5 py-2 uppercase  flex justify-center items-center gap-3   rounded-full text-white font-bold text-xl"
              >
                <BiSolidDownload /> Download Template
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
          <div className="  flex flex-col  justify-center items-center relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            <div className=" relative border-slate-300 gap-3  h-60 p-4 rounded-2xl font-semibold  border-2 bg-sky-50 px-2 flex flex-col justify-center items-center">
              <div className=" flex flex-col items-center justify-center absolute">
                <label className="    text-7xl ">
                  <AiOutlineCloudUpload />
                </label>
                <p className=" px-4  items-center gap-2 py-2 min-w-[150px] flex justify-center bg-sky-200  rounded-xl  ">
                  <AiFillFilePdf />
                  {upload}
                </p>
              </div>
              <input
                type="file"
                className=" border-2     opacity-0  h-60 cursor-pointer"
                onChange={(e) =>
                  setUpload(
                    e?.target?.files[0]?.name,
                    setDocument(e?.target?.files[0])
                  )
                }
              />
            </div>

            <button
              className={clsx(
                " w-full  my-5 text-white text-xl rounded-full   p-2 uppercase font-bold bg-green-500 max-w-xl",
                {
                  " hidden": !document,
                }
              )}
              onClick={() => console.log("pdf = ", document)}
            >
              upload paper
            </button>
            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Back
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className="  absolute  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
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
