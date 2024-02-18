import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";

const Home = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    props.verify();

    apiCall();
  }, []);

  const apiCall = async () => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const apiCall = await axios.post("http://localhost:3001/verify", {
      token: token,
    });
    setItems(apiCall.data.response.items);
  };

  return (
    <Fragment>
      <div className="home-img-container">
        {items.map((item, index) => (
          <div className="home-img-card">
            <img src={item.cardFaceImage} key={index}></img>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
export default Home;
