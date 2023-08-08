import React, { useState } from "react";
import Examiner from "../Examiner";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

const Assignments = () => {
  return (
    <Examiner>
      <h1 className="text-center text-3xl font-bold">Assignments List</h1>

      <Link to={"/Examiner/Assignments/1"}>
        <div className=" p-2 my-3 rounded-xl bg-white">assignment 1</div>
      </Link>
      <Link to={"/Examiner/Assignments/2"}>
        <div className=" p-2 my-3 rounded-xl bg-white">assignment 2</div>
      </Link>
    </Examiner>
  );
};

export default Assignments;
