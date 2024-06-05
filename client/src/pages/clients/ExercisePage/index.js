import { memo } from "react";
import Header from "../../../layouts/header/index";

const ExercisePage = memo(() => {
  return (
    <>
      <Header />
      <div className="container-fluid d-flex justify-content-center mb-4 fix-header w-100" style={{ minHeight: "calc(100vh - 20px)" }}>
        <div className="col shadow rounded-4 p-5">
          
        </div>
      </div>
    </>
  );
});

export default ExercisePage;