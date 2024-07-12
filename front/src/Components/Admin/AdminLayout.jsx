import "../../Styles/main.scss";
import Nav from "./Navbar/Nav";
import NavResponsive from "../Context/NavContext";
import Dashbord from "./Dashbord";

function AdminLayout() {
  return (
    <div className="container p-0">
      <NavResponsive>
        <Nav />
        <Dashbord />
      </NavResponsive>
    </div>
  );
}

export default AdminLayout;
