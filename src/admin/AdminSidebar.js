import React, { useEffect, useState } from 'react';
import { MdDashboardCustomize, MdPersonAddAlt1 } from "react-icons/md";
import { FaRegListAlt, FaEdit } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiDetail } from "react-icons/bi";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { CgPassword } from "react-icons/cg";

export default function AdminSidebar({ setMenuPointer }) {
  const [adminName, setAdminName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <MdDashboardCustomize />, label: "Dashboard", pointer: 0 },
    { icon: <MdPersonAddAlt1 />, label: "Add New Members", pointer: 1 },
    { icon: <FaRegListAlt />, label: "Member List", pointer: 2 },
    { icon: <FaEdit />, label: "Renew List", pointer: 3 },
    { icon: <BiDetail />, label: "Member Detail", pointer: 4 },
    { icon: <MdOutlineContentPasteSearch />, label: "Admin Content", pointer: 5},
    { icon: <RiAdminFill />, label: "My Profile", pointer: 6 },
    { icon: <GrGallery />, label: "Gallery Panel", pointer: 7 },
    { icon: <MdEvent />, label: "Event Panel", pointer: 8 },
    { icon: <CgPassword />, label: "Password Change", pointer: 9 },
  ];


  const handleMenuPointer = (pointer) => {
    setMenuPointer(pointer);
    setIsOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('admin');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setAdminName(decodedToken.name || 'Admin');
    }
  }, []);

  return (
    <div className='mt-20 min-h-[55rem]'>
      {/* Hamburger Button */}
      <button
        className="sm:hidden p-2 text-black focus:outline-none fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu size={28} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-[55rem] w-64 bg-[#F0F3F4] shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:relative sm:translate-x-0 sm:w-full sm:max-w-xs sm:mx-4 rounded-lg`}
      >


        {/* Profile Picture Section */}
        <div className="flex justify-center">
          <img src="/log.png" alt="logo" className='rounded-full h-32 mt-16' />
        </div>

        {/* Menu Items */}
        <ul className="list-none pt-4 space-y-2" role="menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              role="menuitem"
              tabIndex="0"
              className="flex items-center gap-3 cursor-pointer hover:bg-black hover:text-white p-3 rounded-lg transition duration-300"
              onClick={() => handleMenuPointer(item.pointer)}
            >
              {item.icon}
              <span className="text-sm sm:text-base">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
