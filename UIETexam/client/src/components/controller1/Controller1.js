import React, { useState } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar';


const Controller1 = ({children}) => {
    
 
  return (
   <>
   
       <div className="flex-1 flex flex-col ">
       <Topbar/>
       <div className={`flex font-["IBM_Plex_Sans"] h-screen "bg-[#F8F9FF]"`}>
       <Sidebar/>
       <div className="flex-1 overflow-y-scroll p-4 bg-gray-200">
       {children}
       </div>
       </div>
       </div>
    
      
   </>
  )
}

export default Controller1;
