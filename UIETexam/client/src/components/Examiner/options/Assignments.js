import React, { useState, useEffect } from "react";
import Examiner from "../Examiner";
import { Link } from "react-router-dom";

const Assignments = () => {
  const [ass, setAss] = useState([]);

  async function getAssignments() {
    const res = await fetch("http://localhost:5000/api/r2/assigmnets");

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch assignments data");
    }

    const data = await res.json();
    setAss(data);
  }

  useEffect(() => {
    getAssignments();
  }, []);

  return (
    <Examiner>
      <h1 className="text-center text-3xl font-bold">Assignments List</h1>

      {ass.map((assignment, index) => (
        <Link key={index} to={`/Examiner/Assignments/${assignment._id}`}>
          <div className="p-2 flex gap-3 my-3 rounded-xl bg-white">
            <h1>{assignment?.Subject?.Name}</h1>
            <h1>{assignment?.Subject?.SubjectCode}</h1>
          </div>
        </Link>
      ))}
    </Examiner>
  );
};

export default Assignments;