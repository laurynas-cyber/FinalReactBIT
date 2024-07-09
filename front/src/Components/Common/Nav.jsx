import logo from "../../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import NavIcon from "./NavIcon";
import NavRoutes from "./NavRoutes";
import NavResponsive from "../Context/NavContext";

function Nav() {
  return (
    <>
      {/* <NavResponsive>
        <NavRoutes />
      </NavResponsive> */}
      <nav className="navbar bg-body-tertiary pt-1 position-sticky lol">
        <div className="container-md Navigation ">
          <NavResponsive>
            <NavIcon />
            <NavRoutes />
          </NavResponsive>
          <div className="col d-flex justify-content-center">
            <a className="navbar-brand " href="#">
              <img src={logo} alt="recoveryLogo" width="150" height="auto" />
            </a>
          </div>

          <div className="col d-flex justify-content-end align-items-center gap-3">
            <a className="UserTags" href="">
              Sign in
            </a>
            <a className="UserTags" href="">
              Log in
            </a>
            <FaUser style={{ color: "#00ba75", fontSize: "25px" }} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
