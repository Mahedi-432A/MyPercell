import React from "react";
import AuthImg from "../assets/authImage.png";
import { Outlet } from "react-router";
import Logo from "../pages/Shared/Logo/Logo";
const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200">
      <div>
        <Logo></Logo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={AuthImg} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
