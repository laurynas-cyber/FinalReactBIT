import "react-toastify/dist/ReactToastify.css";
import "./Styles/main.scss";
import React from "react";
import Nav from "./Components/Common/Navbar/Nav";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DeleteModal from "./Components/Common/DeleteModal";
import { LoaderContainer } from "./Components/Common/LoaderContainer";
import DonateModal from "./Components/Common/DonateModal";

function App() {
  return (
    <>
      <Nav />
      <DeleteModal />
      <DonateModal />
      <Outlet />
      <ToastContainer />
      <LoaderContainer />
    </>
  );
}

export default App;
