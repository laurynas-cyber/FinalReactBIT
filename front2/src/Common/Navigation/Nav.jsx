import logo from "../../assets/images/logo.png";
import * as l from "../../Constants/urls";

function Nav() {
  return (
    <div className="nav container-fluid">
      <div className="navItemsCont container">
        <a className="navbar-brand " href={l.SIDE_URL}>
          <img src={logo} alt="recoveryLogo" width="150" height="auto" />
        </a>
        <div className="RoutesContainer border border-danger"></div>
      </div>
    </div>
  );
}

export default Nav;
