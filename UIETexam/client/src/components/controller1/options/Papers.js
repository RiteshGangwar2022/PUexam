import React from 'react'
import Controller1 from '../Controller1'



const Papers = () => {

  const activities = [
    { activity: 'Examiner Name' },
    {  activity: 'Examiner Name' },
    {  activity: 'Examiner Name' },
    {  activity: 'Examiner Name' },
    { activity: 'Examiner Name' },
    {  activity: 'Examiner Name' },
    {  activity: 'Examiner Name' },
    
  ];

  return (
    <Controller1>
     <div className=" rounded-xl flex flex-col items-center bg-white">
        <h1 className="  relative text-3xl font-bold p-2">Add Paper</h1>
        <div className=" w-full  p-6 gap-11 grid grid-cols-2 ">
        <div className='flex gap-4 flex-col'>
        <div className=" items-center flex gap-1">
            <label className=" text-xl font-bold">Name/Id</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" items-center flex gap-3 font-bold">
            <label className=" text-xl">Subject</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
          <div className=" items-center flex gap-9 font-bold">
            <label className=" text-xl">Date</label>
            <input className=" shadow-md bg-neutral-200 px-2 py-1 w-full border-2  rounded-sm " />
          </div>
        </div>
        <div className=" flex gap-4">
         
         <div className='font-bold text-3xl flex flex-col justify-center items-center'>Assign to</div>
      <div className=" w-fit  bg-white  rounded-lg shadow border-2 border-gray-500">
        
        
          <div className="max-h-36 overflow-y-auto  max-w-lg w-80">
            {activities.map((activity,i) => (
            
              <div key={activity.id} className="flex items-start  border-2 border-gray-500 gap-5">
                <div className=''>
                  {i+1}.
                </div>
              <div className="  flex-grow  p-1">
                  <p className="text-gray-800">{activity.activity}</p>
                 
                </div>
                <div  className='ml-10 mr-4'>
                <input type="checkbox" />
                 </div>
               
              </div>
            ))}
           
          </div>
        
      </div>
      <div className='flex flex-col justify-end items-end '>
      <button className=" uppercase  bg-sky-500 text-white rounded-full p-3 ml-4 font-bold ">
              Add
            </button>
      </div>
    
           
          </div>
          
        </div>
      </div>
      <h1 className=" text-center text-3xl font-bold p-2">Papers List</h1>
      <div className=" p-2 my-3 rounded-xl bg-white">Demo</div>
      <div className=" p-2 my-3 rounded-xl bg-white">Demo</div>
    </Controller1>
  )
}

export default Papers
