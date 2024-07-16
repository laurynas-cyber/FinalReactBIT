import logo from "../../../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import NavIcon from "./NavIcon";
import NavRoutes from "./NavRoutes";
import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { Link } from "react-router-dom";

function Nav() {
  const { isFullSize } = useContext(NavContext);
  return (
    <>
      {isFullSize ? null : <NavRoutes />}

      <nav className="navbar bg-body-tertiary pt-2 position-sticky">
        <div className="container-md Navigation ">
          {isFullSize ? <NavRoutes /> : <NavIcon />}
          <div className="col d-flex justify-content-center">
            <a className="navbar-brand " href="#">
              <img src={logo} alt="recoveryLogo" width="150" height="auto" />
            </a>
          </div>

          <div className="col d-flex justify-content-end align-items-center gap-3">
            <Link className="UserTags" to={`/dashbord`}>
              ADMIN
            </Link>
            <Link className="UserTags" to={`/SignIn`}>
              Sign in
            </Link>
            <Link className="UserTags" to={`/LogIn`}>
              Log in
            </Link>
            <FaUser style={{ color: "#00ba75", fontSize: "25px" }} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
