import axios from "axios";
import { SERVER_URL } from "../../Constants/urls";
import { useCallback, useContext, useState } from "react";
import { MessagesContext } from "../Context/Messages";

const useServerGet = (url) => {
  const [response, setResponse] = useState(null);

  const { ErrorMSg, SuccessMsg } = useContext(MessagesContext);

  const doAction = useCallback(
    (_) => {
      axios
        .get(`${SERVER_URL}${url}`)
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
        });
    },
    [ErrorMSg, SuccessMsg, url]
  );

  return { doAction, serverResponse: response };
};

export default useServerGet;
