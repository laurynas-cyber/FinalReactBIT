import "react-toastify/dist/ReactToastify.css";
import "./Styles/main.scss";
import React from "react";
import Nav from "./Components/Common/Navbar/Nav";
import NavResponsive from "./Components/Context/NavContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Messages from "./Components/Context/Messages";

function App() {
  return (
    <Messages>
      <NavResponsive>
        <Nav />
        <Outlet />
        <ToastContainer />
      </NavResponsive>
    </Messages>
  );
}

export default App;
