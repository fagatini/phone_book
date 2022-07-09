import "./App.css";
import React from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { RequireIdAuth } from "./utils/RequireIdAuth";
import { AdminLogin } from "./pages/AdminLogin";
import { AllAccountsPage } from "./pages/AllAccountsPage";
import { RequireAuth } from "./utils/RequireAuth";
import { NotMyProfile } from "./pages/NotMyProfile";
import EditAccount from "./pages/EditAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<RequireIdAuth />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/accounts"
          element={
            <RequireAuth>
              <AllAccountsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/accounts/:accountId"
          element={
            <RequireAuth>
              <NotMyProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/account:accountId"
          element={
            <RequireIdAuth>
              <Profile />
            </RequireIdAuth>
          }
        />
        <Route
          path="/account/edit/:accountId"
          element={
            <RequireIdAuth>
              <EditAccount />
            </RequireIdAuth>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
