import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";

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
      <a className="Pages" href={`/`}>
        Home
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
