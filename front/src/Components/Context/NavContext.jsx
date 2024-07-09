import { createContext, useState, useEffect } from "react";

export const NavContext = createContext();

export default function NavResponsive({ children }) {
  const [isClicked, setisClicked] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setisClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  function handleNavIcon() {
    setisClicked(!isClicked);
    console.log(isClicked);
  }
  return (
    <NavContext.Provider value={{ isClicked, handleNavIcon }}>
      {children}
    </NavContext.Provider>
  );
}
