import "react-toastify/dist/ReactToastify.css";
import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import { Outlet } from "react-router-dom";
import DeleteModal from "../Common/DeleteModal";
import { ToastContainer } from "react-toastify";

function AdminLayout() {
  return (
    <>
      <Nav />
      <DeleteModal />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default AdminLayout;
