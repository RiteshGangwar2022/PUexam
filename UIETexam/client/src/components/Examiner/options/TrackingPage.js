import React, { useEffect } from 'react';

const TrackingPage = () => {
  const activities = [
    { id: 1, activity: 'Logged in', timestamp: '2023-08-05 10:00 AM' },
    { id: 2, activity: 'Clicked on dashboard', timestamp: '2023-08-05 10:15 AM' },
    { id: 3, activity: 'Checked', timestamp: '2023-08-05 10:00 AM' },
    { id: 4, activity: 'Clicked on dashboard', timestamp: '2023-08-05 10:15 AM' },
    { id: 5, activity: 'Logged out', timestamp: '2023-08-05 10:00 AM' },
    { id: 6, activity: 'Clicked on dashboard', timestamp: '2023-08-05 10:15 AM' },
    { id: 5, activity: 'Logged out', timestamp: '2023-08-05 10:00 AM' },
    { id: 6, activity: 'Clicked on dashboard', timestamp: '2023-08-05 10:15 AM' },
    
  ];


  
  
  return (
    <div className="min-h-screen p-4 ">
      <div className="w-full  bg-blue-50 p-5 rounded-lg shadow border-2 border-gray-500 h-[520px]">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">User Activity Tracking</h1>
        <div className="relative">
          <div className="max-h-[392px] overflow-y-auto ">
            {activities.map((activity,i) => (
            
              <div key={activity.id} className="flex items-start mb-7">
                
                <div className="relative ml-5 mt-15">
                  <div className="w-1 h-32 bg-red-500 transform absolute bottom-0 left-1/2 -translate-x-1/2"></div>
                  <div className="w-4 h-4 bg-red-500 rounded-full absolute bottom-12 left-1/2 transform -translate-x-1/2"></div>
                </div>
                
                
              <div className="ml-7 pb-15 flex-grow">
              {i===activities.length-1? <div key={activity.id} className="flex items-start mb-7">
                
                <div className=" relative top-24 -left-7  ">
                  <div className="w-1 h-28 bg-red-500 transform absolute bottom-0 left-1/2 -translate-x-1/2"></div>
                  <div className="w-4 h-4 bg-red-500 rounded-full absolute bottom-12 left-1/2 transform -translate-x-1/2"></div>
                </div>
                
                
              </div>
              :""
              }
                  <p className="text-gray-800">{activity.activity}</p>
                  <p className="text-gray-500 text-sm">{activity.timestamp}</p>
                
                </div>
                
               
              </div>
            ))}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
