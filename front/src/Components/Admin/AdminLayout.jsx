import "react-toastify/dist/ReactToastify.css";
import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import NavResponsive from "../Context/NavContext";
import { Outlet } from "react-router-dom";
import Messages from "../Context/Messages";
import Modals from "../Context/Modals";
import DeleteModal from "../Common/DeleteModal";
import { ToastContainer } from "react-toastify";

function AdminLayout() {
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

export default AdminLayout;
