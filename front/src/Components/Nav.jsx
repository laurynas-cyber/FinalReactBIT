import React from "react";
import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo2.png";

function Nav() {
  return (
    <nav className="container border-primary border">
      <div className="row">
        <div className="col border border-danger" href="#">
          Navbar
        </div>
        <img className="col logoImg" src={logo} alt="" />
        <div className="col border-danger border d-flex UserContainer">
          <a className="col border boder-info Sign-in" href="">
            Sign in
          </a>
          <a className="col Log-in" href="">
            Log in
          </a>
        </div>
      </div>
    </nav>

    // <div className="container border border-primary Navigation">
    //   <nav className="navbar bg-body-tertiary">
    //     <div className="container-fluid">
    //       <div className="navbar-brand border border-danger" href="#">
    //         Navbar
    //       </div>
    //       <img className="logoImg" src={logo} alt="" />
    //       <div className="row border-danger border d-flex UserContainer">
    //         <a className="col border boder-info Sign-in" href="">
    //           Sign in
    //         </a>
    //         <a className="col Log-in" href="">
    //           Log in
    //         </a>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
}

export default Nav;
