import React from "react";
import Examiner from "../Examiner";
const Assignments = () => {
  return (
    <Examiner>
      <div className=" rounded-xl flex flex-col items-center bg-white">
        <h1 className="  relative text-3xl font-bold p-2">Add Examiner</h1>
        <div className=" w-full  p-6 gap-6 grid grid-cols-2">
          <div className=" items-center flex gap-3">
            <label className=" text-xl">field</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" items-center flex gap-3">
            <label className=" text-xl">field</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" items-center flex gap-3">
            <label className=" text-xl">field</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" items-center flex gap-3">
            <label className=" text-xl">field</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" items-center flex gap-3">
            <label className=" text-xl">field</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" items-center flex gap-3">
            <label className=" text-xl">field</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" col-span-full flex justify-center ">
            <button className=" uppercase px-6 py-2 bg-sky-500 text-white rounded-xl">
              Add
            </button>
          </div>
        </div>
      </div>
      <h1 className=" text-center text-3xl font-bold p-2">Examiners List</h1>
      <div className=" p-2 my-3 rounded-xl bg-white">Demo</div>
      <div className=" p-2 my-3 rounded-xl bg-white">Demo</div>
    </Examiner>
  );
};

export default Assignments;
