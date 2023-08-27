import React from "react";
import Assigne from "./Assigne";
import { useLocation } from 'react-router-dom';

const Subjects = () => {
    
    const location = useLocation();
  const { items,Subject} = location.state;
console.log(items);
console.log(Subject);

    return (
        <Assigne>
            
            <div className="bg-white  rounded  mt-2 px-4 py-2 flex flex-col">
            <div className="text-4xl font-bold items-center justify-center">{Subject}</div>
            <div className=" flex gap-14 justify-center items-center">
         
         <div className='font-bold text-3xl text-black flex flex-col justify-center items-center pb-12'>Assign to</div>
      <div className=" w-fit  bg-white  rounded-lg shadow border-2 border-gray-500">
        
        
          <div className="max-h-36 overflow-y-auto  max-w-lg w-80">
            {items.map((items,i) => (
            
              <div  className="flex items-start  border-2 border-gray-500 gap-5">
                <div className=''>
                  {i+1}.
                </div>
              <div className="  flex-grow  py-[0.2669rem] rounded-md">
                  <p className="text-gray-800">{items}</p>
                 
                </div>
                <div  className='ml-10 mr-4'>
                <input type="checkbox" />
                 </div>
               
              </div>
            ))}
           
          </div>
        
      </div>
      <div className='flex flex-col justify-end items-end '>
      <button className=" uppercase  bg-sky-500 text-white rounded-full px-4 py-2 shadow-md ml-4 font-bold ">
              Add Examiners
            </button>
      </div>
    
           
          </div>
            </div>
               
    
        </Assigne>
    );
};

export default Subjects;
