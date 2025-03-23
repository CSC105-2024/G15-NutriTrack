import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../pages/Dashboard/components/DashboardSidebar";
import { SidebarProvider } from "../providers/SidebarContext";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 ml-6 transition-all duration-300">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout; 