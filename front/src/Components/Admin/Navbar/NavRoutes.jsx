import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { Link } from "react-router-dom";

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
      <Link className="Pages" to={`/dashbord`}>
        Home
      </Link>
      <a className="Pages" href="http://localhost:3005/dashbord/userlist">
        UserList
      </a>
      <Link className="Pages" to={`pageThree`}>
        Page Three
      </Link>
    </div>
  );
}

export default NavRoutes;
