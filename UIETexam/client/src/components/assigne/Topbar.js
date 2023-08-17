import React, { useState } from 'react';
import { FaSearch, FaUser,FaEnvelope,FaBell} from "react-icons/fa";

const Topbar = () => {


    return ( 
        <div className={`flex w-full justify-between items-center border-b-2 py-4 h-16 bg-white`} >
            <div className="flex items-center px-4 pl-6 h-16">
                <div className="bg-[url('../public/pu-logodark.png')] w-8 h-8 mr-2 bg-contain bg-center px-4"></div>
                <div className={` text-black text-xl font-bold flex items-center whitespace-nowrap`}>
                    Panjab University
                </div>
            </div>
            

            <div className="flex w-1/2 justify-end px-4 h-full items-center">
            <div className={`flex items-center rounded-lg px-2 py-1 bg-gray-100`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={`bg-gray-100 w-60 focus:outline-none`}
                        />
                        <FaSearch className={`text-gray-500" ml-2`} />
                    </div>
                    <div className="relative ml-4">
                        <FaBell className={`text-gray-500 cursor-pointer`}/>
                    </div>
                    <div className="relative ml-4">
                        <FaEnvelope className={`text-gray-500 cursor-pointer`}/>
                    </div>
                    
                    <div className="relative ml-10 flex items-center justify-between ">
                    <FaUser className={`text-gray-500 cursor-pointer w-8 h-8`} />

                  <div class="text-gray-600 text-lg font-bold  ml-4 font-custom-style text-crystal-grey"> 
                            Username
                        <div class="text-gray-400 text-sm font-normal">
                             Assigne
                                    </div>
                                           </div>

                    </div>
                     
                    </div>
        </div>
     );
}
 
export default Topbar;
