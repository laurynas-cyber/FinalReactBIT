import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";

function NavRoutes() {
  const { isClicked } = useContext(NavContext);

  console.log(isClicked);

  return (
    <div
      className="col NavRoutesHidden"
      style={{
        top: isClicked ? "100px" : "0px",
        // display: isClicked ? "flex" : "none", Animation var
      }}
    >
      <a className="Pages" href={`/pageOne`}>
        Page one
      </a>
      <a className="Pages" href={`/pageTwo`}>
        Page Two
      </a>
      <a className="Pages" href={`/pageThree`}>
        Page Three
      </a>
    </div>
  );
}

export default NavRoutes;
