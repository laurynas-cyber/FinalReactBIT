import "react-toastify/dist/ReactToastify.css";
import "./Styles/main.scss";
import React from "react";
import Nav from "./Components/Common/Navbar/Nav";
import NavResponsive from "./Components/Context/NavContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Messages from "./Components/Context/Messages";
import Modals from "./Components/Context/Modals";
import DeleteModal from "./Components/Common/DeleteModal";

function App() {
  return (
    <Messages>
      <Modals>
        <NavResponsive>
          <Nav />
          <DeleteModal />
          <Outlet />
          <ToastContainer />
        </NavResponsive>
      </Modals>
    </Messages>
  );
}

export default App;
