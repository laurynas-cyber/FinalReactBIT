import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import NavResponsive from "../Context/NavContext";
import Dashbord from "./Dashbord";
import { Outlet } from "react-router-dom";
import Messages from "../Context/Messages";

function AdminLayout() {
  return (
    <Messages>
      <NavResponsive>
        <Nav />
        <Outlet />
      </NavResponsive>
    </Messages>
  );
}

export default AdminLayout;
