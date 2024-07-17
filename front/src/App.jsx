import "react-toastify/dist/ReactToastify.css";
import "./Styles/main.scss";
import React from "react";
import Nav from "./Components/Common/Navbar/Nav";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DeleteModal from "./Components/Common/DeleteModal";

function App() {
  return (
    <>
      <Nav />
      <DeleteModal />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
