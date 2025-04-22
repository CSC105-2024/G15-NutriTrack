import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import CalendarPopup from "@/components/CalendarPopup";

const DashboardPage = () => {
  useDocumentTitle("Dashboard");

  return (
    <main>
      <h1>Dashboard</h1>
      <CalendarPopup />
    </main>
  );
};

export default DashboardPage;
