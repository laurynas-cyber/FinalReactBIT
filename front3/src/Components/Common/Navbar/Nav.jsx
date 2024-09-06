import logo from "../../../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { NavLink } from "react-router-dom";
import { LoginNav } from "../../../Constants/navigation";
import { AuthContext } from "../../Context/Auth";
import Logout from "../Logout";
import Gate from "../Gate";


console.log(LoginNav);

function Nav() {
  const { user } = useContext(AuthContext);
  const { isFullSize } = useContext(NavContext);

  return (
    <>
      <nav className="navbar container-fluid">
        <div className="navItemsCont container-fluid">
          <NavLink className="navbarBrand" to="/">
            <img src={logo} alt="recoveryLogo" width="150" height="auto" />
          </NavLink>

          <div className="RoutesContainer">
            <Gate status="role" role={["admin"]}>
              <div className="LoginContainer">
                <NavLink className="RouterLogLinks" to="dashbord">
                  {user?.role + " " + user?.name}
                </NavLink>
              </div>
            </Gate>
            <Gate status="role" role={["user"]}>
              <div className="LoginContainer">
                <NavLink className="RouterLogLinks" to={`user/${user?.id}`}>
                  {user?.role + " " + user?.name}
                </NavLink>
              </div>
            </Gate>
            <Gate status="logged">
              <div className="LoginContainer">
                <Logout />
                <FaUser style={{ color: "#00ba75", fontSize: "25px" }} />
              </div>
            </Gate>
            <Gate status="not-logged">
              {LoginNav.map((link) => (
                <NavLink className={link.active} key={link.tag} to={link.to}>
                  {link.tag}
                </NavLink>
              ))}
       
            </Gate>
      
            <NavLink
              className={({ isActive }) => {
                return isActive ? "ActiveTag" : "RouterLinks";
              }}
              to="donors"
            >
              DONORS
            </NavLink>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Nav;
