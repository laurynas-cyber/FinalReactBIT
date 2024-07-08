import { useState } from "react";

function NavIcon() {
  const [isClicked, setisClicked] = useState(false);

  function handleNavIcon() {
    setisClicked(!isClicked);
    console.log(isClicked);
  }

  return (
    <div className="NavIconCont" onClick={handleNavIcon}>
      <div className="sticks" style={{ top: isClicked ? "-20px" : null }}></div>
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
      <div className="sticks" style={{ top: isClicked ? "20px" : null }}></div>
    </div>
  );
}

export default NavIcon;
