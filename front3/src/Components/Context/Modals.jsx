import { createContext, useState } from "react";

export const ModalContext = createContext();

function Modals({ children }) {
  const [deleteModal, setDeleteModal] = useState(null);
  const [donateModal, setDonateModal] = useState(null);

  return (
    <ModalContext.Provider
      value={{ deleteModal, setDeleteModal, donateModal, setDonateModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default Modals;
