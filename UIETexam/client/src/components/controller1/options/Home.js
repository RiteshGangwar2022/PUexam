import React from "react";
import Controller1 from "../Controller1";
import Piechart from "./Piechart";
import { useState,useEffect } from "react";
import TrackingPage from "./TrackingPage";

const Home = () => {
  const data = [
    {  students: 13, fill: 'red' },
    { students: 37, fill: 'blue' },
  ];
  const data1 = [
    {  students: 19, fill: 'orange' },
    { students: 31, fill: 'green' },
  ];

  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      setCurrentYear(year);
    
  }, []);

  return (
    <Controller1>
      <div className="grid grid-cols-1 h-[calc(100vh-7rem)]   xl:grid-rows-2 xl:grid-cols-3 gap-4">
        <div className=" bg-white shadow-md rounded-xl  p-3 ">
          <h1 className="font-bold text-3xl p-2">Examiners</h1>
          <div className="flex gap-4">
            <div>
              <Piechart data={data}></Piechart>
            </div>
            <div className=" bg-gray-100 shadow-md rounded-xl w-60 h-50 border-2 border-gray-500 p-5 pt-5  font-bold  ">
              Total Examiner: {data[0].students + data[1].students}
              <br></br>
              Assigned Subjects: {data[0].students}
              <br></br>
              Not Assigned Subjects: {data[1].students}
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl   p-3   ">
          <h1 className="text-3xl font-bold p-2">Payments</h1>
          <div className="flex gap-4">
            <div>
            
              <Piechart data={data1}></Piechart>
            </div>
            <div className=" bg-gray-100 shadow-md rounded-xl w-60 h-50 border-2 border-gray-500 p-6 font-bold  ">
              Total Payments {data1[0].students + data1[1].students}
              <br></br>
              Payments Pending: {data1[0].students}
              <br></br>
              Payments Completed: {data1[1].students}
            </div>
          </div>
        </div>
        <div className="bg-white row-span-2 p-3 shadow-md rounded-xl ">
          <h1 className="text-3xl font-bold ">Activities</h1>
          <TrackingPage />
        </div>

        <div className="bg-white shadow-md rounded-xl   p-3">
          <h1 className="text-3xl font-bold p-2">Sessions</h1>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white shadow-lg rounded-xl p-2 w-23 font-bold text-xl">
              {currentYear - 2}-{currentYear - 1}
            </div>
            <div className="bg-white shadow-lg rounded-xl p-2 w-23 font-bold text-xl">
              {currentYear - 1}-{currentYear}
            </div>
            <div className="bg-gray-200 shadow-lg rounded-xl p-2 w-23 font-bold text-xl">
              {currentYear}-{currentYear + 1}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl    p-3">
          <h1 className="text-3xl font-bold p-2">Subjects</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center bg-gray-200  shadow-md rounded-xl border-2 border-gray-500  font-bold text-xl">
              Subject A
            </div>
            <div className="flex items-center justify-center bg-gray-200  shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">
              Subject B
            </div>
            <div className="flex items-center justify-center bg-gray-200  shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl ">
              Subject C
            </div>
            <div className="flex items-center justify-center bg-gray-200  shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">
              Subject D
            </div>
            <div className="flex items-center justify-center bg-gray-200  shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">
              Subject E
            </div>
            <div className="flex items-center justify-center bg-gray-200  shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">
              Subject F
            </div>
          </div>
        </div>
      </div>{" "}
    </Controller1>
  );
};

export default Home;
