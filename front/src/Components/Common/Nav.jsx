import logo from "../../assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import NavIcon from "./NavIcon";

function Nav() {
  return (
    <nav className="navbar bg-body-tertiary pt-1">
      <div className="container-md Navigation">
        <NavIcon />
        <div className="col d-flex gap-3">
          <a className="Pages" href="">
            Page one
          </a>
          <a className="Pages" href="">
            Page Two
          </a>
          <a className="Pages" href="">
            Page Three
          </a>
        </div>
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
  );
}

export default Nav;
