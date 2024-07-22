import { useContext } from "react";
import { NavContext } from "../../Context/NavContext";
import { NavLink } from "react-router-dom";
import { RoutesNav } from "../../../Constants/navigation";

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
      {RoutesNav.map((link) => (
        <NavLink className={link.active} key={link.tag} to={link.to}>
          {link.tag}
        </NavLink>
      ))}
    </div>
  );
}

export default NavRoutes;
