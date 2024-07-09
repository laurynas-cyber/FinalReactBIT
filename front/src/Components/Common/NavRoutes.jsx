import { useContext } from "react";
import { NavContext } from "../Context/NavContext";

function NavRoutes() {
  const { isClicked } = useContext(NavContext);

  return (
    <div
      className="col d-flex gap-3 NavRoutesHidden"
      style={{
        top: isClicked ? "100px" : "0px",
      }}
    >
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
  );
}

export default NavRoutes;
