import { createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MessagesContext = createContext();

function Messages({ children }) {
  const ErrorMSg = (msg) => {
    toast.error(`${msg}`, {
      position: "bottom-right",
      color: "red",
    });
  };

  const SuccessMsg = (msg) => {
    toast.success(`${msg}`, {
      position: "bottom-right",
      color: "red",
    });
  };

  const InfoMsg = (msg) => {
    toast.info(`${msg}`, {
      position: "bottom-right",
      color: "red",
    });
  };

  return (
    <MessagesContext.Provider value={{ InfoMsg, SuccessMsg, ErrorMSg }}>
      {children}
    </MessagesContext.Provider>
  );
}

export default Messages;
