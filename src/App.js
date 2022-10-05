import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BoardReport from "./components/BoardReport";

const App = () => {

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/home"} className="navbar-brand">
          &nbsp;&nbsp;DtFactory&nbsp;
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/report"} className="nav-link">
              Reportes
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<BoardReport />} />              
          <Route path="/report" element={<BoardReport />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
