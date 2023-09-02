import React, { useState } from "react";
import {
  FaHome,
  FaMoneyBillWave,
  FaStickyNote,
  FaSignOutAlt,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavButton from "./NavButton";
import { useAuth } from '../../Context/AuthContext';
const Sidebar = () => {
  const [activeButton, setActiveButton] = useState("");
  const { globalResponseData } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (text) => {
    setActiveButton(text);
  };
  const pattern = /^\/Assigne\/Subjects\/.*$/;

  return (
    <div className={` bg-white w-1/6 h-full `}>
      <ul className={`flex-1 text-md overflow-y-auto text-black p-4 pr-0`}>
        <div className="relative ml-1 flex items-center ">
          <FaUser className={`text-gray-500 cursor-pointer w-8 h-8`} />

          <div class="text-gray-600 text-lg font-bold  ml-4 font-custom-style text-crystal-grey">
          {globalResponseData ? (
    <>{globalResponseData.name}</>
  ) : (
    <>Unknown User</>
  )}
            <div class="text-gray-400 text-sm font-normal">Assigne</div>
          </div>
        </div>

        <NavButton
          text="Home"
          to="/Assigne/Home"
          icon={<FaHome className="mr-4" />}
          onClick={() => {
            handleButtonClick("Home");
          }}
          active={currentPath === "/Assigne/Home" || currentPath === "/assigne/Home" || pattern.test(currentPath)
          }
        />
   
        <NavButton
          text="Papers"
          to="/Assigne/Papers"
          icon={<FaStickyNote className="mr-4" />}
          onClick={() => handleButtonClick("Papers")}
          active={currentPath === "/Assigne/Papers"}
        />
             <NavButton
          text="Examiners"
          to="/Assigne/Examiners"
          icon={<FaUsers className="mr-4" />}
          onClick={() => {
            handleButtonClick("Examiners");
          }}
          active={currentPath === "/Assigne/Examiners"}
        />

        <NavButton
          text="Logout"
          
          icon={<FaSignOutAlt className="mr-4" />}
          onClick={() => handleButtonClick("Logout")}
          active={false}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
