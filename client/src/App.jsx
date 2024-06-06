import React from "react";
import { renderUserRouter, renderAdminRouter, renderAuthRouter } from "./routes/render.jsx";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  if (user) {
    if (user.admin === true) {
      return (
        <BrowserRouter>
          {renderUserRouter()}
          {renderAdminRouter()}
          {renderAuthRouter()}
        </BrowserRouter>
      )
    }
    return (
      <BrowserRouter>
        {renderUserRouter()}
        {renderAuthRouter()}
      </BrowserRouter>
    );
  }
  else {
    return (
      <BrowserRouter>
        {renderAuthRouter()}
      </BrowserRouter>
    );
  }
}

export default App