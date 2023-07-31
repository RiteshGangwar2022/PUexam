import React from "react";
import Controller1 from "../Controller1";
import Piechart from "./Piechart";

const Home = () => {
  const data = [
    {  students: 13, fill: 'red' },
    { students: 37, fill: 'blue' },
  ];
  const data1 = [
    {  students: 13, fill: 'orange' },
    { students: 37, fill: 'green' },
  ];

  return (
    <Controller1>
      <div className="grid grid-cols-1 h-[calc(100vh-7rem)] md:grid-cols-3 gap-6 p-2">
      <div className=" bg-white shadow-md rounded-xl  p-3">
        <h1 className="font-bold text-3xl p-2">Examiners</h1>
               <div className="flex gap-4">
                 <div>  <Piechart data={data} ></Piechart></div>
                 <div className=" bg-gray-100 shadow-md rounded-xl w-60 h-50 border-2 border-gray-500 p-5 pt-5  font-bold  ">
                    
                    Total Examiner: {data[0].students +data[1].students}<br></br>
                    Assigned Subjects: {data[0].students}<br></br>
                    Not Assigned Subjects: {data[1].students}
                 </div>
               </div>
</div>
        <div className="bg-white shadow-md rounded-xl   p-3 ">
          <h1 className="text-3xl font-bold p-2">Payments</h1>
          <div className="flex gap-4">
                 <div>  <Piechart data={data1} ></Piechart></div>
                 <div className=" bg-gray-100 shadow-md rounded-xl w-60 h-50 border-2 border-gray-500 p-6 font-bold  ">
                    
                    Total Payments {data1[0].students +data1[1].students}<br></br>
                    Payments Pending: {data1[0].students}<br></br>
                    Payments Completed: {data1[1].students}
                 </div>
               </div>

        </div>
        <div className="bg-white row-span-2 shadow-md rounded-xl ">
          <h1 className="text-3xl font-bold p-2">Activities</h1>
        </div>
        <div className="bg-white shadow-md rounded-xl mb-51 h-[96%] p-3">
  <h1 className="text-3xl font-bold p-2">Sessions</h1>
  <div className="flex flex-col items-center gap-4"> {/* Added the items-center class here */}
    <div className="bg-white shadow-lg rounded-xl p-2 w-23 font-bold text-3xl">2021-2022</div>
    <div className="bg-white shadow-lg rounded-xl p-2 w-23 font-bold text-3xl">2022-2023</div>
    <div className="bg-gray-200 shadow-lg rounded-xl p-2 w-23 font-bold text-3xl">2023-2024</div>
  </div>
</div>

        <div className="bg-white shadow-md rounded-xl mb-51 h-[96%] p-3"> 
          <h1 className="text-3xl font-bold p-2">Subjects</h1>
          <div className="grid grid-cols-2 gap-4">
  <div className="flex items-center justify-center bg-gray-200 h-14 shadow-md rounded-xl border-2 border-gray-500  font-bold text-xl">Subject A</div>
  <div className="flex items-center justify-center bg-gray-200 h-14 shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">Subject B</div>
  <div className="flex items-center justify-center bg-gray-200 h-14 shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl ">Subject C</div>
  <div className="flex items-center justify-center bg-gray-200 h-14 shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">Subject D</div>
  <div className="flex items-center justify-center bg-gray-200 h-14 shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">Subject E</div>
  <div className="flex items-center justify-center bg-gray-200 h-14 shadow-md rounded-xl border-2 border-gray-500 font-bold text-xl">Subject F</div>
</div>

        </div>
      </div>
    </Controller1>
  );
};

export default Home;
