import { createContext, useState } from "react";

export const ModalContext = createContext();

function Modals({ children }) {
  const [deleteModal, setDeleteModal] = useState(null);
  const [donateModal, setDonateModal] = useState(null);
  const [declineModal, setDeclineModal] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        deleteModal,
        setDeleteModal,
        donateModal,
        setDonateModal,
        declineModal,
        setDeclineModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default Modals;
