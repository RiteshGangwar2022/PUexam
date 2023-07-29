import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavButton = ({ text, to, icon, active, onClick }) => {
  const { darkMode } = useState(false);

  return (
    <NavLink to={to} onClick={onClick} activeClassName="text-white">
      <li
        className={`my-1 p-2 py-4  ${active ? "rounded-tl-md rounded-bl-md text-white bg-gradient-to-r from-[#0d99ff] to-[#0d99ff]" : ""} hover:rounded-l-md cursor-pointer`}
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
