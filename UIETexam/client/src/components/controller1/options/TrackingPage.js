// src/TrackingPage.js
import React from 'react';

const TrackingPage = () => {
  // Replace this with actual tracking data
  const activities = [
    { id: 1, activity: 'Logged in', timestamp: '2023-08-05 10:00 AM' },
    { id: 2, activity: 'Clicked on dashboard', timestamp: '2023-08-05 10:15 AM' },
    { id: 3, activity: 'checked', timestamp: '2023-08-05 10:00 AM' },
    { id: 4, activity: 'Clicked on dashboard', timestamp: '2023-08-05 10:15 AM' },
    { id: 5, activity: 'Logged out', timestamp: '2023-08-05 10:00 AM' },
    { id: 6, activity: 'Clicked on dashboard', timestamp: '2023-08-05 10:15 AM' },
    

  ];

  return (
    <div className=" min-h-screen p-4 ">
      <div className="w-full max-w-md bg-blue-50 p-5 rounded-lg shadow border-2 border-gray-500">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">User Activity Tracking</h1>
        <div className="relative">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start mb-8">
              <div className="w-2 bg-red-500 absolute h-full left-0 top-0"></div>
           
              <div className="ml-8">
             
                <p className="text-gray-800">{activity.activity}</p>
                <p className="text-gray-500 text-sm">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
