import React ,{useState} from 'react'
import Assigne from "../Assigne";
const Papers = () => {
  const [expandedBars, setExpandedBars] = useState([]);

  const toggleBar = (barIndex) => {
    if (expandedBars.includes(barIndex)) {
      setExpandedBars(expandedBars.filter(index => index !== barIndex));
    } else {
      setExpandedBars([...expandedBars, barIndex]);
    }
  };

  const bars = [
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    },
  
  ];

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
   <>
    <Assigne>
    {bars.map((bar, index) => (
        <div
          key={index}
          className="relative bg-white text-black px-4 py-2 rounded-3xl mb-2 cursor-pointer "
          onClick={() => toggleBar(index)} 
        >
          <div
            className="flex justify-between items-center p-4"
          >
            <div className='text-black '>{index+1}</div>
            <div className="text-black">Paper Name</div>
            <div className="text-black">Department</div>
            <div className="text-black">Subject</div>
            <div className="text-black">Date</div>
            <div className="text-black">Assignd or Not</div>
            
          </div>
          {expandedBars.includes(index) && (
            <div className="bg-white  rounded  mt-2 px-4 py-2 ">
            <div className=" flex gap-14 justify-end items-end">
         
         <div className='font-bold text-3xl text-black flex flex-col justify-center items-center pb-12'>Assign to</div>
      <div className=" w-fit  bg-white  rounded-lg shadow border-2 border-gray-500">
        
        
          <div className="max-h-36 overflow-y-auto  max-w-lg w-80">
            {activities.map((activity,i) => (
            
              <div key={activity.id} className="flex items-start  border-2 border-gray-500 gap-5">
                <div className=''>
                  {i+1}.
                </div>
              <div className="  flex-grow  py-[0.2669rem] rounded-md">
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
      <button className=" uppercase  bg-sky-500 text-white rounded-full px-4 py-2 shadow-md ml-4 font-bold ">
              Save
            </button>
      </div>
    
           
          </div>
            </div>
          )}
        </div>
      ))}

    </Assigne>
   </>
  )
}

export default Papers
