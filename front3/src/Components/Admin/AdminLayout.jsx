import "react-toastify/dist/ReactToastify.css";
import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import { Outlet } from "react-router-dom";
import DeleteModal from "../Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import { LoaderContainer } from "../Common/LoaderContainer";
import DeclineModal from "../Common/DeclineModal";

function AdminLayout() {
  return (
    <>
      <Nav />
      <DeleteModal />
      <DeclineModal />
      <Outlet />
      <ToastContainer />
      <LoaderContainer />
    </>
  );
}

export default AdminLayout;
