import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="Logo Image" />
        <p className="text-3xl -ml-3 font-extrabold">MyPercell</p>
      </div>
    </Link>
  );
};

export default Logo;
