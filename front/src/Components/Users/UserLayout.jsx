import "react-toastify/dist/ReactToastify.css";
import "../../Styles/main.scss";
import { Outlet } from "react-router-dom";
import Nav from "./Navbar/Nav";
import DeleteModal from "../Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import { LoaderContainer } from "../Common/LoaderContainer";


function UserLayout() {
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

export default UserLayout;
