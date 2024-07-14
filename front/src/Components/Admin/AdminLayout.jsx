import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import NavResponsive from "../Context/NavContext";
import Dashbord from "./Dashbord";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
   
      <NavResponsive>
        <Nav />
        <Outlet />
      </NavResponsive>
    
  );
}

export default AdminLayout;
