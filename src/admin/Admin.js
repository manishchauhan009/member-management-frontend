import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminMainContent from './AdminMainContent';
import '../index.css';
import '../App.css';

export const Admin = ({ setIsLogin }) => {
  const [menuPointer, setMenuPointer] = useState(0);

  return (
    <div className="flex flex-row bg-[#B5C2CA] p-6">
      <AdminSidebar setMenuPointer={setMenuPointer} />
      <AdminMainContent menuId={menuPointer} setIsLogin={setIsLogin} />
    </div>
  );
};
