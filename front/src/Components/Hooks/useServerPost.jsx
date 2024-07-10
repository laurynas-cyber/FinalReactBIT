import axios from "axios";
import { SERVER_URL } from "../../Constants/urls";
import { useContext, useState } from "react";
import { MessagesContext } from "../Context/Messages";

const useServerPost = (url) => {
  const [response, setResponse] = useState(null);

  // const { messageError } = useContext(MessagesContext);
  const { ErrorMSg, SuccessMsg, InfoMsg } = useContext(MessagesContext);

  const doAction = (data) => {
    axios
      .post(`${SERVER_URL}${url}`, data)
      .then((res) => {
        setResponse({
          type: "success",
          data: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        ErrorMSg(error);
        // SuccessMsg();
        // InfoMsg();
        setResponse({
          type: "error",
          data: error,
        });
      });
  };

  return { doAction, response };
};

export default useServerPost;
