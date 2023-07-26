import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavButton = ({ text, to, icon, active, onClick }) => {
  const { darkMode } = useState(false);

  return (
    <NavLink to={to} onClick={onClick} activeClassName="text-white">
      <li
        className={`my-1 p-2 py-4 ${darkMode ? `hover:bg-gray-700 ${active ? "rounded-tl-md rounded-bl-md bg-gradient-to-r from-gray-800 to-gray-900" : ""}` : `hover:bg-[#262a3d] ${active ? "rounded-tl-md rounded-bl-md bg-gradient-to-r from-[#181c2c] to-[#F8F9FF]" : ""}`} hover:rounded-l-md cursor-pointer`}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-4">{text}</span>
        </div>
      </li>
    </NavLink>
  );
};

export default NavButton;

// const NavButton = ({ text, to, onClick, active }) => {
//   return (
//     <li className={`flex items-center py-2 pl-6 ${active ? "bg-blue-600" : ""}`}>
//       <NavLink to={to} onClick={onClick} activeClassName="text-white">
//         {text}
//       </NavLink>
//     </li>
//   );
// };