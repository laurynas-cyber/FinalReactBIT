import { createContext, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MessagesContext = createContext();

function Messages({ children }) {
  const ErrorMSg = useCallback((error) => {
    if (!error.response) {
      toast.error("Server is not responding", {
        position: "bottom-right",
      });
    } else if (!error.response.data.message?.title) {
      toast.error("Wrong email " + error.response.status, {
        position: "bottom-right",
      });
    } else {
      toast.error(error.response.data.message.text, {
        position: "bottom-right",
      });
    }
  }, []);

  const SuccessMsg = useCallback((res) => {
    if (!res.data.message) {
      return;
    }
    toast.success(`${res.data.message.text}`, {
      position: "bottom-right",
    });
  }, []);

  const InfoMsg = (error) => {
    toast.info(error.response.data.message.text, {
      position: "bottom-right",
    });
  };

  return (
    <MessagesContext.Provider value={{ InfoMsg, SuccessMsg, ErrorMSg }}>
      {children}
    </MessagesContext.Provider>
  );
}

export default Messages;
