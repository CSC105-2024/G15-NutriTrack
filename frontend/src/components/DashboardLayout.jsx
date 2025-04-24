import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { SidebarProvider } from "../providers/SidebarContext";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  );
};

const MainContent = () => (
  <main className="flex-1 gap-6 transition-all duration-300">
    <div className="p-4 overflow-y-auto h-screen">
      <Outlet />
    </div>
  </main>
);

export default DashboardLayout;
