import { createContext, useState } from "react";

export const LoaderContext = createContext();

function Loader({children}) {
  const [show, setShow] = useState(true);

  return (
    <LoaderContext.Provider value={{ show, setShow }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default Loader;
