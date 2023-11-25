import "../styles/app.scss";
import React from "react";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
