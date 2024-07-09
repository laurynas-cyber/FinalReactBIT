import { useContext } from "react";
import { NavContext } from "../Context/NavContext";

function NavIcon() {
  const { isClicked, handleNavIcon } = useContext(NavContext);



  return (
    <div className="col NavIconHide">
      <div className="NavIconCont" onClick={handleNavIcon}>
        <div
          className="sticks"
          style={{ top: isClicked ? "-20px" : null }}
        ></div>
        <div
          className="sticks"
          style={{
            transform: isClicked ? "rotate(45deg)" : null,
            top: isClicked ? "5px" : null,
          }}
        ></div>
        <div
          className="sticks"
          style={{
            transform: isClicked ? "rotate(-45deg)" : null,
            top: isClicked ? "-3px" : null,
          }}
        ></div>
        <div
          className="sticks"
          style={{ top: isClicked ? "20px" : null }}
        ></div>
      </div>
    </div>
  );
}

export default NavIcon;
