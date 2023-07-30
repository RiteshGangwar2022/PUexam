import React from "react";
import Controller1 from "../Controller1";
const Home = () => {
  return (
    <Controller1>
      <div className=" grid  grid-cols-1   h-[calc(100vh-7rem)] md:grid-cols-3 gap-6  ">
        <div className=" bg-white  shadow-md  rounded-xl">
          <h1 className=" text-3xl font-bold p-2">Examiners</h1>
        </div>
        <div className=" bg-white   shadow-md  rounded-xl">
          <h1 className=" text-3xl font-bold p-2">Payments</h1>
        </div>

        <div className=" bg-white row-span-2   shadow-md  rounded-xl">
          <h1 className=" text-3xl font-bold p-2">Activities</h1>
        </div>

        <div className=" bg-white   shadow-md  rounded-xl">
          <h1 className=" text-3xl font-bold p-2">Sessions</h1>
        </div>
        <div className=" bg-white   shadow-md  rounded-xl">
          <h1 className=" text-3xl font-bold p-2">Subjects</h1>
        </div>
      </div>
    </Controller1>
  );
};

export default Home;
