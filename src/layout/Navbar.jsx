import React from "react";
import "./Navbar.css";
import { Button } from "primereact/button";

const Navbar = (props) => {
  const logoutHandler = () => {
    sessionStorage.setItem("token", "");
    props.setIsLoggedIn(false);
  };

  return (
    <div className="nav-container">
      WebPos
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Navbar;
