import React, { useState } from 'react';
import { FaHome, FaMoneyBillWave, FaStickyNote ,FaSignOutAlt,FaUsers,FaUser} from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';

const Sidebar = () => {
  
  const [activeButton, setActiveButton] = useState("");

  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (text) => {
    setActiveButton(text);
  };
  
  

 

  return (
    <div className={` bg-white w-1/6 h-full `}>
     

      <ul className={`flex-1 text-md overflow-y-auto text-black p-4 pr-0`}>
      <div className="relative ml-1 flex items-center ">
                    <FaUser className={`text-gray-500 cursor-pointer w-8 h-8`} />

                  <div class="text-gray-600 text-lg font-bold  ml-4 font-custom-style text-crystal-grey"> 
                            Username
                        <div class="text-gray-400 text-sm font-normal">
                             Controller
                                    </div>
                                           </div>

                    </div>
                     
      <NavButton
          text="Home"
          to="/controller1/Home"
          icon={<FaHome className="mr-4" />}
          onClick={() => {handleButtonClick("Home")}}
          active={currentPath === "/controller1/Home"}
        />
            <NavButton
          text="Examiners"
          to="/controller1/Examiners"
          icon={<FaUsers className="mr-4" />}
          onClick={() => {handleButtonClick("Examiners")}}
          active={currentPath === "/controller1/Examiners"}
        />
        
        <NavButton
          text="Papers"
          to="/controller1/Papers"
          icon={<FaStickyNote className="mr-4" />}
          onClick={() => handleButtonClick("Papers")}
          active={currentPath === "/controller1/Papers"}
        />
        <NavButton
          text="Payments"
          to="/controller1/Payments"
          icon={<FaMoneyBillWave className="mr-4" />}
          onClick={() => handleButtonClick("Payments")}
          active={currentPath === "/controller1/Payments"}
        />
        <NavButton
          text="Logout"
          to="/controller1/Logout"
          icon={<FaSignOutAlt className="mr-4" />}
          onClick={() => handleButtonClick("Profile")}
          active={currentPath === "/controller1/Logout"}
        />
         
      
      </ul>
    </div>
  );
}

export default Sidebar;
