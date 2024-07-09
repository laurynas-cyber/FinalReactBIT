import { createContext, useState, useEffect } from "react";

export const NavContext = createContext();

export default function NavResponsive({ children }) {
  const [isClicked, setisClicked] = useState(false);
  const [isFullSize, setisFullSize] = useState(
    window.innerWidth > 768 ? true : false
  );

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setisClicked(false);
      setisFullSize(true);
    } else setisFullSize(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  function handleNavIcon() {
    setisClicked(!isClicked);
    console.log(isClicked);
  }
  return (
    <NavContext.Provider value={{ isClicked, handleNavIcon, isFullSize }}>
      {children}
    </NavContext.Provider>
  );
}
