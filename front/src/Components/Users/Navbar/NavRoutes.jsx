import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";

function NavRoutes() {
  const { isClicked, isFullSize } = useContext(NavContext);

  const { user } = useContext(AuthContext);

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
        to="posts"
      >
        Your Posts
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return isActive ? "Pages ActiveTag" : "Pages";
        }}
        to={`edit/${user.id}`}
      >
        Edit Profile
      </NavLink>
    </div>
  );
}

export default NavRoutes;
