import "react-toastify/dist/ReactToastify.css";
import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import { Outlet } from "react-router-dom";
import DeleteModal from "../Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import { LoaderContainer } from "../Common/LoaderContainer";
import Gate from "../Common/Gate";
import Redirect from "../Common/Redirect";

function AdminLayout() {
  return (
    <>
      {/* <Gate status="role" role={["admin"]}> */}
      <Nav />
      <DeleteModal />
      <Outlet />
      <ToastContainer />
      <LoaderContainer />
      {/* </Gate> */}
      {/* <Gate status="not-logged">
        <Redirect to="SITE_HOME" />
      </Gate> */}
    </>
  );
}

export default AdminLayout;
