import axios from "axios";
import * as l from "../../Constants/urls";
import { useCallback, useContext, useState } from "react";
import { MessagesContext } from "../Context/Messages";
import { LoaderContext } from "../Context/Loader";
import { AuthContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const useServerGet = (url) => {
  const [response, setResponse] = useState(null);

  const { ErrorMSg, SuccessMsg, InfoMsg } = useContext(MessagesContext);

  const { setShow } = useContext(LoaderContext);

  const { removeUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const doAction = useCallback(
    (dataString = "") => {
      axios
        .get(`${l.SERVER_URL}${url}${dataString}`, { withCredentials: true })
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
          if (
            error.response &&
            401 === error.response.status &&
            "not-logged-in" === error.response.data.reason
          ) {
            removeUser();
            InfoMsg(error);
            setTimeout((_) => {
              navigate(l.SITE_LOGIN);
            }, 3000);

            return;
          }
          if (
            error.response &&
            401 === error.response.status &&
            "not-authorized" === error.response.data.reason
          ) {
            navigate(-1);
            return;
          }
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
