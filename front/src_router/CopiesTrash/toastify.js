import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: "top-center",
    });

    toast.error("Error Notification !", {
      position: "top-left",
    });

    toast.warn("Warning Notification !", {
      position: "bottom-left",
    });

    toast.info("Info Notification !", {
      position: "bottom-center",
    });

    toast("Custom Style Notification with css class!", {
      position: "bottom-right",
      className: "foo-bar",
    });
  };

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}

export default App;
