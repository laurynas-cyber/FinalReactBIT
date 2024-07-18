import "react-toastify/dist/ReactToastify.css";
import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import { Outlet } from "react-router-dom";
import DeleteModal from "../Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import { LoaderContainer } from "../Common/LoaderContainer";

function AdminLayout() {
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

export default AdminLayout;
