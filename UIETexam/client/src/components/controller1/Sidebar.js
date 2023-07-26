import React, { useState } from 'react';
import { FaHome, FaMoneyBillWave, FaStickyNote ,FaSignOutAlt,FaUsers} from "react-icons/fa";
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
    <div className={`bg-[#181c2c] w-1/6 h-full `}>
     

      <ul className={`flex-1 text-md overflow-y-auto text-white p-4 pr-0`}>
      
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
