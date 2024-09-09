import "react-toastify/dist/ReactToastify.css";
import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import { Outlet } from "react-router-dom";
import DeleteModal from "../Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import { LoaderContainer } from "../Common/LoaderContainer";
import DeclineModal from "../Common/DeclineModal";
import BannerModal from "../Common/BannerModal";

function AdminLayout() {
  return (
    <>
      <Nav />
      <DeleteModal />
      <DeclineModal />
      <BannerModal />
      <Outlet />
      <ToastContainer />
      <LoaderContainer />
    </>
  );
}

export default AdminLayout;
