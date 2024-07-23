import "react-toastify/dist/ReactToastify.css";
import "./Styles/main.scss";
import React from "react";
import Nav from "./Components/Common/Navbar/Nav";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DeleteModal from "./Components/Common/DeleteModal";
import { LoaderContainer } from "./Components/Common/LoaderContainer";

function App() {
  return (
    <>
      <Nav />
      <DeleteModal />
      <Outlet />
      <ToastContainer />
      <LoaderContainer />
    </>
  );
}

export default App;
