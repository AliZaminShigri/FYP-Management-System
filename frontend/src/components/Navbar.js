import React from "react";
import reactLogo from "../imges/logo192.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={reactLogo} alt="React Logo" className="nav--icon" />
      <h3 className="nav--logo_text"> Display Banner </h3>
      <h4 className="nav--title"> React & node - Project</h4>
    </nav>
  );
}
