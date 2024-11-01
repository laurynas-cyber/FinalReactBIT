import logo from "./logo.png";
import { FaUser } from "react-icons/fa";
import NavIcon from "./NavIcon";
import NavRoutes from "./NavRoutes";
import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import Logout from "../../Common/Logout";
import { AuthContext } from "../../Context/Auth";
import { NavLink } from "react-router-dom";

function Nav() {
  const { user } = useContext(AuthContext);
  const { isFullSize } = useContext(NavContext);
  return (
    <>
      {isFullSize ? null : <NavRoutes />}

      <nav className="navbar bg-body-tertiary pt-2 position-sticky">
        <div className="container-md Navigation ">
          {isFullSize ? <NavRoutes /> : <NavIcon />}
          <div className="col d-flex justify-content-center">
            <a className="navbar-brand " href="/">
              <img
                src={logo}
                alt="recoveryLogo"
                width="150"
                height="auto"
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = "../../../assets/images/logo.png"; // path to a fallback logo
                }}
              />
            </a>
          </div>

          <div className="col d-flex justify-content-end align-items-center gap-3">
            <NavLink
              className={({ isActive }) => {
                return isActive ? "Pages ActiveTag" : "Pages";
              }}
            >
              {user?.role + " " + user?.name}
            </NavLink>
            <Logout />
            <FaUser style={{ color: "#00ba75", fontSize: "25px" }} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
