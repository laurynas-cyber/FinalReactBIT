import axios from "axios";
import { SERVER_URL } from "../../Constants/urls";
import { useCallback, useContext, useState } from "react";
import { MessagesContext } from "../Context/Messages";
import { LoaderContext } from "../Context/Loader";

const useServerGet = (url) => {
  const [response, setResponse] = useState(null);

  const { ErrorMSg, SuccessMsg } = useContext(MessagesContext);

  const { setShow } = useContext(LoaderContext);

  const doAction = useCallback(
    (dataString = "") => {
      axios
        .get(`${SERVER_URL}${url}${dataString}`, { withCredentials: true })
        .then((res) => {
          SuccessMsg(res);
          setResponse({
            type: "success",
            serverData: res.data,
          });
        })
        .catch((error) => {
          ErrorMSg(error);
          setResponse({
            type: "error",
            serverData: error,
          });
        })
        .finally((_) => {
          setShow(false);
        });
    },
    [ErrorMSg, SuccessMsg, url, setShow]
  );

  return { doAction, serverResponse: response };
};

export default useServerGet;
