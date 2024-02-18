import React, { Fragment, useRef, useState } from "react";
import { Button } from "primereact/button";
import "./Login.css";
import loginImage from "../images/login.jpg";
import { Toast } from "primereact/toast";
import axios from "axios";


const Login = ({ setIsLoggedIn }) => {
  const toast = useRef(null);
  const [username, setUserName] = useState("");
  const [pswd, setPswd] = useState("");

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Message Content",
      life: 2000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Login error",
      life: 3000,
    });
  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPswd(event.target.value);
  };

  const clickHandler = async () => {
    try{
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password: pswd,
      });


      // Handle successful login response here
      console.log("Login successful", response.data.data);
      sessionStorage.setItem('token', response.data.data);

      if(!response.data.success){
        throw new Error;
      }
      showSuccess();
      setIsLoggedIn(true);
      setUserName("");
      setPswd("");
    }catch(err){
      console.log(err);
      showError();
    }

  };

  return (
    <Fragment>
      <Toast ref={toast} />
      <div className="login-container">
        <div className="login-left">
          <img src={loginImage} alt="Login" />
        </div>
        <div className="login-right">
          <div className="login-right-head">WebPos</div>
          <div className="login-right-box">
            <input
              className="login-right-box-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              className="login-right-box-input"
              type="password"
              placeholder="Password"
              value={pswd}
              onChange={handlePasswordChange}
            />
            <Button onClick={clickHandler} label="Login" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
