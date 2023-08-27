import React, { useState, useEffect } from "react";
import Examiner from "../Examiner";
import { Link } from "react-router-dom";

const Assignments = () => {
  const [ass, setAss] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAssignments() {
    const res = await fetch("http://localhost:5000/api/r2/assigmnets");

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch assignments data");
    }

    const data = await res.json();
    setAss(data);
    setLoading(false);
  }

  useEffect(() => {
    getAssignments();
  }, []);
  if (loading)
    return (
      <Examiner>
        <p className=" text-xl my-auto mx-auto ">fetching data...</p>{" "}
      </Examiner>
    );

  return (
    <Examiner>
      <h1 className="text-center text-3xl font-bold">Assignments List</h1>

      {ass.map((assignment, index) => (
        <Link key={index} to={`/Examiner/Assignments/${assignment._id}`}>
          <div className="px-6 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
            <p className="  font-bold">{index}</p>
            <h1 className="  ">{assignment?.Subject?.Name}</h1>
            <h1 className="  ">{assignment?.Subject?.SubjectCode}</h1>

            <h1 className="  ">
              {new Date(assignment?.DOE).toLocaleDateString()}{" "}
            </h1>
            <h1 className=" font-bold text-red-600"> pending </h1>
          </div>
        </Link>
      ))}
    </Examiner>
  );
};

export default Assignments;
