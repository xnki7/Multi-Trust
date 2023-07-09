import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <img src={require("./MultiTrust-transparent-cropped.png")} />
      <button>Connect Wallet</button>
    </div>
  );
}

export default Navbar;
