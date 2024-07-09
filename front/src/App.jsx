import "./Styles/main.scss";
import React from "react";
import Nav from "./Components/Common/Navbar/Nav";
import NavResponsive from "./Components/Context/NavContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <NavResponsive>
      <Nav />
      <Outlet />
    </NavResponsive>
  );
}

export default App;
