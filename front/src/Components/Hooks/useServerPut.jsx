import axios from "axios";
import { SERVER_URL } from "../../Constants/urls";
import { useContext, useState } from "react";
import { MessagesContext } from "../Context/Messages";
import { LoaderContext } from "../Context/Loader";

const useServerPut = (url) => {
  const [response, setResponse] = useState(null);

  const { ErrorMSg, SuccessMsg } = useContext(MessagesContext);

  const { setShow } = useContext(LoaderContext);

  const doAction = (data) => {
    axios
      .put(`${SERVER_URL}${url}/${data.id}`, data, { withCredentials: true })
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

export default useServerPut;
