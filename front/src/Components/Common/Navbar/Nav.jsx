import logo from "../../../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import NavIcon from "./NavIcon";
import NavRoutes from "./NavRoutes";
import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { NavLink } from "react-router-dom";
import { LoginNav } from "../../../Constants/navigation";
import { AuthContext } from "../../Context/Auth";

console.log(LoginNav);

function Nav() {
  const { user } = useContext(AuthContext);
  const { isFullSize } = useContext(NavContext);
  return (
    <>
      {isFullSize ? null : <NavRoutes />}

      <nav className="navbar bg-body-tertiary pt-2">
        <div className="container-md Navigation ">
          {isFullSize ? <NavRoutes /> : <NavIcon />}
          <div className="col d-flex justify-content-center">
            <a className="navbar-brand " href="#">
              <img src={logo} alt="recoveryLogo" width="150" height="auto" />
            </a>
          </div>

          <div className="col d-flex justify-content-end align-items-center gap-3">
            {user ? (
              <>
                <button className="link">
                  <span className="label">Atsijungti, {user.name}</span>
                </button>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "UserTags ActiveTag" : "UserTags";
                  }}
                  to="dashbord"
                >
                  Admin
                </NavLink>
              </>
            ) : (
              LoginNav.map((link) => (
                <NavLink className={link.active} key={link.tag} to={link.to}>
                  {link.tag}
                </NavLink>
              ))
            )}

            <FaUser style={{ color: "#00ba75", fontSize: "25px" }} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
