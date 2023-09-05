import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Assigne from "../Assigne";
import { useNavigate } from "react-router-dom";

const Assign = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    FetchSubjects();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated subjects:", subjects);
  }, [subjects]);

  const FetchSubjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/r3/getsubject"
      );

      if (response.data) {
        //  console.log(response.data);
        setSubjects(response.data);
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Some error is coming");
    }
  };

  const handleRedirect = (url, data) => {
    navigate(url, { state: data });
  };

  return (
    <>
      <Assigne>
        <h1 className="text-center text-3xl mb-3 font-bold">Subjects List</h1>

        <div className="  grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
          {subjects.map((sub, index) => (
            <div
              key={index}
              className="  relative  aspect-video  bg-white  rounded-md p-3"
            >
              <div className=" flex gap-2">
                <h1 className=" text-2xl"> Subject </h1>
                <h1 className=" text-2xl font-semibold"> {sub.Name} </h1>
              </div>
              <div className=" flex gap-2">
                <h1 className="text-base"> Subject Code </h1>
                <h1 className=" text-base font-semibold">
                  {" "}
                  {sub.SubjectCode}{" "}
                </h1>
              </div>

              <button
                onClick={() =>
                  handleRedirect(`/Assigne/Subjects/${sub.Name}`, {
                    id: sub._id,
                    Subject: sub.Name,
                  })
                }
                className=" absolute  bottom-3 mx-auto bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
              >
                Setup
              </button>
            </div>
          ))}
        </div>
      </Assigne>
    </>
  );
};

export default Assign;
