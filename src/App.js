import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Order from "./components/Order";
import Home from "./components/Home";
import Layout from "./layout/Layout";
import Login from "./components/Login";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    verify();
  },[])

  const verify = async ()=> {
    const token = sessionStorage.getItem('token');
    console.log(token);
    if(token){
      const apiCall = await axios.post('http://localhost:3001/verify',
        {token: token}
      )

      if(apiCall.data.success){
        setIsLoggedIn(true);
      }else{
        console.log('falseeee');
        setIsLoggedIn(false);
      }

    }else{
      setIsLoggedIn(false);
    }
  }

  const notLoggedInRoutes = (
    <Fragment>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="*" element={<Navigate to="/login"></Navigate>}></Route>
    </Fragment>
  );

  const loggedInRoutes = (
    <Fragment>
      <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn}><Home setIsLoggedIn={setIsLoggedIn} verify={verify}/></Layout>}/>
      <Route path="/order" element={<Order />} />
      <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
    </Fragment>
  );

  return (
    <BrowserRouter>
      <Routes>{isLoggedIn ? loggedInRoutes : notLoggedInRoutes}</Routes>
    </BrowserRouter>
  );
}

export default App;

