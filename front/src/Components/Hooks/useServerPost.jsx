import axios from "axios";
import { SERVER_URL } from "../../Constants/urls";
import { useContext, useState } from "react";
import { MessagesContext } from "../Context/Messages";
import { LoaderContext } from "../Context/Loader";

const useServerPost = (url) => {
  const [response, setResponse] = useState(null);

  const { ErrorMSg, SuccessMsg } = useContext(MessagesContext);

  const { setShow } = useContext(LoaderContext);

  const doAction = (data) => {
    axios
      .post(`${SERVER_URL}${url}`, data, { withCredentials: true })
      .then((res) => {
        SuccessMsg(res);
        setResponse({
          type: "success",
          serverData: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        ErrorMSg(error);
        setResponse({
          type: "error",
          serverData: error,
        });
      })
      .finally((_) => {
        setShow(false);
      });
  };

  return { doAction, serverResponse: response };
};

export default useServerPost;
