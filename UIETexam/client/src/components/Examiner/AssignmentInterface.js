import React, { useState, useEffect, useMemo } from "react";
import Examiner from "./Examiner";
import { clsx } from "clsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { generate } from "./TemplateGen";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiFillFilePdf } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../loader";
import { Viewer } from "@react-pdf-viewer/core";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


const steps = ["setup", "upload", "preview", "publish"];
const AssignmentInterface = () => {
  const { globalResponseData } = useAuth();

  const location = useLocation();
  const { Obj } = location.state;
   console.log(Obj);
  const [active, setActive] = useState(0);
  const [assignment, setAssignment] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  
  const [upload, setUpload] = useState("upload PDF only");
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState("");

  const onChange = (e) => {
    const files = e?.target?.files;
    console.log(URL.createObjectURL(files[0]));
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
    setSelectedFile(e?.target?.files[0]);
    setUpload(e?.target?.files[0].name);
  };

  const handlePublish = async () => {
   
      if (!selectedFile) {
        alert("No File Selected");
        return;
      }
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Replace with the actual exam _id and examiner_id
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/r2/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            session_id: `${Obj.Sssion._id}`,
            examiner_id: `${Obj.Status.ExamineeId}`,
            subject_code: `${Obj.Status.Subject}`,
            _id: `${Obj.Status._id}`
          },
        });
    
        if (response.status === 200) {
          setLoading(false);
          alert("Document Uploaded Successfully");
        } else {
          setLoading(false);
          alert("Failed to upload document");
        }
      } catch (error) {
        setLoading(false);
        console.error('Error uploading file:', error);
      }

  }
  const handleDownload = () => {
    // Create a blob with the content of the Word file
    const wordContent = "You Can Make Here";
    const blob = new Blob([wordContent], { type: 'application/msword' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Set the attributes for the link
    link.href = url;
    link.download = `Paper.doc`; // Specify the file name

    // Append the link to the document body
    document.body.appendChild(link);
    // Click the link to trigger the download
    link.click();
    // Cleanup: remove the link and revoke the URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const Tabs = () => {
    switch (active) {
      case 0:
        return (
          <div className=" flex justify-center items-center   relative border-2 p-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            <div className="  p-3  gap-3 flex flex-col w-full bg-sky-50 rounded-xl border-slate-300 border-2 max-w-3xl ">
              <h1 className=" text-2xl uppercase   text-center">
                Assignment Information
              </h1>

              <div className=" grid grid-cols-2 my-3    gap-x-12  gap-y-3   grid-flow-row">
                <div className=" flex gap-2  justify-between  items-center">
                  <h1 className=" text-xl    ">Exam Code</h1>
                  <h1 className=" text-xl  max-w-[200px]  w-full flex justify-center bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                    {Obj?.assignment[0].ExamCode}
                  </h1>
                </div>

                <div className=" flex gap-2  justify-between items-center">
                  <h1 className=" text-xl    ">Subject Code</h1>
                  <h1 className=" text-xl w-full max-w-[200px] flex justify-center bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                    {Obj?.assignment[0]._id}
                  </h1>
                </div>

                <div className=" flex gap-2  justify-between items-center">
                  <h1 className=" text-xl    ">Subject</h1>
                  <h1 className=" text-xl w-full max-w-[200px] flex justify-center bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                    {Obj?.assignment[0].Subject_name}
                  </h1>
                </div>
                <div className=" flex gap-2  justify-between items-center">
                  <h1 className=" text-xl    ">Semester</h1>
                  <h1 className=" text-xl w-full flex max-w-[200px] justify-center bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                    {Obj?.assignment[0].SemesterNo}
                  </h1>
                </div>
                <div className=" flex gap-2  justify-between items-center">
                  <h1 className=" text-xl    ">Date</h1>
                  <h1 className=" text-xl w-full flex max-w-[200px] justify-center bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                    {new Date(Obj?.Sssion?.DOE).toLocaleDateString()}
                  </h1>
                </div>
                <div className=" flex gap-2 justify-between  items-center">
                  <h1 className=" text-xl    ">Branch</h1>
                  <h1 className=" text-xl         w-full max-w-[200px] flex justify-center bg-slate-100 font-semibold rounded-sm border-slate-900  border-[1px] p-1">
                    {Obj?.assignment[0].Branch}
                  </h1>
                </div>
              </div>

              <h1 className="text-base underline">Directions -</h1>

              <p className=" text-red-600">
                1. Download the Template given below.
              </p>
              <p className=" text-red-600">
                2. Write questions on it and add corresponding images with
                proper layout.
              </p>
              <p className=" text-red-600">
                3. After checking layout,export word document to PDF file.
              </p>
              <p className=" text-red-600">4. At last, upload PDF file.</p>

              <p>Download Template given below </p>
              <button
                onClick={handleDownload}
                className=" bg-green-500 px-5 py-2 uppercase  flex justify-center items-center gap-3   rounded-full text-white font-bold text-xl"
              >
                <BiSolidDownload /> Download Template
              </button>
            </div>
            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" pointer-events-none  opacity-25 absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className="  absolute  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowRight />
            </button>
          </div>
        );
      case 3:
        return (
          <div className=" flex justify-center flex-col items-center relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            <h1 className=" text-xl text-red-600 my-3 ">
              Review document before publishing it under Preview section.
            </h1>

            <button
              className={clsx(
                " w-full flex justify-center items-center gap-3  my-5 text-white text-xl rounded-full   p-2 uppercase font-bold bg-green-500 max-w-xl",
                {
                  "  opacity-25     pointer-events-none :": !selectedFile,
                }
              )}
              onClick={handlePublish}
            >
              <BiUpload />
              publish paper
            </button>
           
            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute pointer-events-none  opacity-25  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowRight />
            </button>
            {loading &&   <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  backdrop-blur">
      <Loader/>
      </div>
      }
          </div>
        );
      case 2:
        return (
          <div className=" relative flex  flex-col items-center  justify-center   border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            <h1 className=" text-xl text-red-600 my-3 ">
              This is a preview of a paper {selectedFile?.name} you are going to be
              submitting.
            </h1>
            {url && (
              <div className=" max-h-[700px]  border  mb-20 border-neutral-600 overflow-y-auto  w-3/4">
                <Viewer fileUrl={url} />
              </div>
            )}
            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute z-10  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  z-10 bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowRight />
            </button>
          </div>
        );
      case 1:
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
                className=" border-2   opacity-0  h-60 cursor-pointer"
                accept=".pdf"
                onChange={onChange}
              />
            </div>

            <button
              onClick={() => setActive((active - 1) % 4)}
              className=" absolute  bottom-2  left-1/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              onClick={() => setActive((active + 1) % 4)}
              className="  absolute  bottom-2  left-2/3 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              <AiOutlineArrowRight />
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
