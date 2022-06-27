import "./App.css";
import React from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { RequireAuth } from "./utils/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<RequireAuth />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/account:accountId"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
