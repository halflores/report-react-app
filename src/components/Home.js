import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {

    try {
      UserService.getPublicContent().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
  
          setContent(_content);
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }

  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Bienvenido!!!</h1>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
