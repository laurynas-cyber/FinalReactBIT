import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { NavLink, Link } from "react-router-dom";

function NavRoutes() {
  const { isClicked, isFullSize } = useContext(NavContext);

  console.log(isClicked);

  return (
    <div
      className="col d-flex p-2 gap-3 NavRoutesHidden"
      style={{
        top: isClicked ? "100px" : "0px",
        left: isFullSize ? null : "20px",
      }}
    >
      <Link className="Pages" to={`/`}>
        Home
      </Link>
      <NavLink
        className={({ isActive }) => {
          return isActive ? "Pages ActiveTag" : "Pages";
        }}
        to="userlist"
      >
        UserList
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return isActive ? "Pages ActiveTag" : "Pages";
        }}
        to={`pageThree`}
      >
        Page Three
      </NavLink>
    </div>
  );
}

export default NavRoutes;
