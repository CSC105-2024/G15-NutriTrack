import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const DashboardPage = () => {
  useDocumentTitle("Dashboard");

  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
};

export default DashboardPage;
