import React from "react";
import { renderUserRouter, renderAdminRouter, renderAuthRouter } from "./routes/render.jsx";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  if(user)
    {
      return (
        <BrowserRouter>
          {renderUserRouter()}
          {renderAdminRouter()}
          {renderAuthRouter()}
        </BrowserRouter>
      );
    }
  else{
    return (
      <BrowserRouter>
        {renderAuthRouter()}
      </BrowserRouter>
    );
  }
}

export default App