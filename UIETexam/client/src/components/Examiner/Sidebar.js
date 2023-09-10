import React, { useState } from "react";
import {
  FaHome,
  FaMoneyBillWave,
  FaStickyNote,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavButton from "./NavButton";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { globalResponseData,setGlobalResponseData} = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const pattern = /^\/Examiner\/Assignment\/.*$/;
  const pattern1=/^\/Examiner\/QuestionBanks\/.*$/;
const handleLogout=()=>{
  const tellme=window.confirm("Are You Sure to Logout");
  if(!tellme) return;
  localStorage.removeItem('Professor');
  setGlobalResponseData(null);
  navigate("/");
}
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
            <div class="text-gray-400 text-sm font-normal">Examiner</div>
          </div>
        </div>

        <NavButton
          text="Home"
          to="/Examiner/Home"
          icon={<FaHome className="mr-4" />}
         
          active={currentPath === "/Examiner/Home"}
        />
        <NavButton
          text="Assignments"
          to="/Examiner/Assignments"
          icon={<FaStickyNote className="mr-4" />}
      
          active={currentPath === "/Examiner/Assignments" || pattern.test(currentPath)}
        />

        <NavButton
          text="Question Banks"
          to="/Examiner/QuestionBanks"
          icon={<FaStickyNote className="mr-4" />}
          active={currentPath === "/Examiner/QuestionBanks" ||  pattern1.test(currentPath)}
        />
        <NavButton
          text="Payments"
          to="/Examiner/Payments"
          icon={<FaMoneyBillWave className="mr-4" />}
          active={currentPath === "/Examiner/Payments"}
        />
       
        <div className="my-1 p-2 py-4 rounded-tl-md rounded-bl-md  hover:rounded-l-md cursor-pointer"
        onClick={handleLogout}
        >
        <div className="flex gap-4">
             <div>
             <FaSignOutAlt className="mr-4" />
             </div>
             <div>Logout</div>
        </div>
          
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
