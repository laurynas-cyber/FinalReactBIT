import "./Styles/main.scss";
import React from "react";
import logo from "./assets/images/logo.png";
import logo2 from "./assets/images/logo2.png";
import Nav from "./Common/Navigation/Nav";

function App() {
  return (
    <div>
      <Nav />
      <div className="home">
        <img src={logo} alt="" />
        <img src={logo2} alt="" />
      </div>
    </div>
  );
}

export default App;
