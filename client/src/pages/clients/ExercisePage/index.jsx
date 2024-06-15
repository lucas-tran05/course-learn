import { memo } from "react";
import Header from "../../../layouts/header/index";

const ExercisePage = memo(() => {
  return (
    <>
      <Header />
      <div className="container-fluid d-flex justify-content-center fix-header w-100" style={{ minHeight: "100vh" }}>
        <div className="child-page-style col shadow rounded-4 p-5 mb-4">
          
        </div>
      </div>
    </>
  );
});

export default ExercisePage;