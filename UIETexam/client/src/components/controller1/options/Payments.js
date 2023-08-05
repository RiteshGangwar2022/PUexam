import React from "react";
import Controller1 from "../Controller1";
const Payments = () => {
  return (
    <Controller1>
      <div className="  relative py-2   ">
        <h1 className=" text-center text-3xl font-bold ">Payments List</h1>
        <button className=" absolute top-0 right-0 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl ">
          Add new
        </button>
      </div>
      <div className=" p-2 my-3 rounded-xl bg-white">Demo</div>
      <div className=" p-2 my-3 rounded-xl bg-white">Demo</div>
    </Controller1>
  );
};

export default Payments;
