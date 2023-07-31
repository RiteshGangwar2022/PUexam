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
            <div class="text-gray-400 text-sm font-normal">Controller</div>
          </div>
        </div>

        <NavButton
          text="Home"
          to="/Examiner/Home"
          icon={<FaHome className="mr-4" />}
          onClick={() => {
            handleButtonClick("Home");
          }}
          active={currentPath === "/Examiner/Home"}
        />
        <NavButton
          text="Assignments"
          to="/Examiner/Assignments"
          icon={<FaUsers className="mr-4" />}
          onClick={() => {
            handleButtonClick("Assignments");
          }}
          active={currentPath === "/Examiner/Assignments"}
        />

        <NavButton
          text="Question Banks"
          to="/Examiner/QuestionBanks"
          icon={<FaStickyNote className="mr-4" />}
          onClick={() => handleButtonClick("Question Banks")}
          active={currentPath === "/Examiner/QuestionBanks"}
        />
        <NavButton
          text="Payments"
          to="/Examiner/Payments"
          icon={<FaMoneyBillWave className="mr-4" />}
          onClick={() => handleButtonClick("Payments")}
          active={currentPath === "/Examiner/Payments"}
        />
        <NavButton
          text="Logout"
          to="/Examiner/Logout"
          icon={<FaSignOutAlt className="mr-4" />}
          onClick={() => handleButtonClick("Logout")}
          active={currentPath === "/Examiner/Logout"}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
