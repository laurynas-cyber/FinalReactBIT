import { createContext, useState } from "react";

export const ModalContext = createContext();

function Modals({ children }) {
  const [deleteModal, setDeleteModal] = useState(null);

  return (
    <ModalContext.Provider value={{ deleteModal, setDeleteModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export default Modals;
