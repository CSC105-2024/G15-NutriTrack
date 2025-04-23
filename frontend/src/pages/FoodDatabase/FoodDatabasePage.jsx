import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import FoodGrid from "./FoodGrid";

const FoodDatabasePage = () => {
  useDocumentTitle("Food Database");

  return (
    <>
      <div>FoodDatabasePage</div>
      <FoodGrid />
    </>
  );
};

export default FoodDatabasePage;
