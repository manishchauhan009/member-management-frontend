import React, { useState } from "react";
import AdminHeader from './AdminHeader';
import { Dashboard } from './Dashboard';
import { AddNewMember } from './AddNewMember';
import { MemberList } from './MemberList';
import { RenewList } from './RenewList';
import { MemberDetail } from './MemberDetail';
import AdminProfile from './AdminProfile';
import AddContent from './AddContent';
import AddGallery from "./AddGallery";
import AddEvent from "./AddEvent";
import PasswordChange from "./PasswordChange";

export default function AdminMainContent({ menuId, setIsLogin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (menuId) {
      case 0:
        return <Dashboard />;
      case 1:
        return <AddNewMember />;
      case 2:
        return <MemberList />;
      case 3:
        return <RenewList />;
      case 4:
        return <MemberDetail />;
      case 5:
        return <AddContent />;
      case 7:
        return <AddGallery />;
      case 8:
        return <AddEvent/>;
      case 6:
        return <AdminProfile />;
      case 9:
        return <PasswordChange/>
      default:
        return <div>Invalid Section</div>;
    }
  };

  return (
    <div className="flex flex-col w-full h-full mt-12 ml-5 min-h-[55rem]">
      <AdminHeader setIsLogin={setIsLogin} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-grow">

        {/* Main Content Area */}
        <div className="w-full p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>

  );
}
