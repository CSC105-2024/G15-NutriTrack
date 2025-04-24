import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import FoodGrid from "./FoodGrid";

const FoodDatabasePage = () => {
  useDocumentTitle("Food Database");

  return (
    <>
      <h1 className="text-2xl font-bold">Food Database</h1>
      <FoodGrid />
    </>
  );
};

export default FoodDatabasePage;
