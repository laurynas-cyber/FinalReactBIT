import axios from "axios";
import * as l from "../../Constants/urls";
import { useContext, useState } from "react";
import { MessagesContext } from "../Context/Messages";
import { LoaderContext } from "../Context/Loader";
import { AuthContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const useServerPut = (url) => {
  const [response, setResponse] = useState(null);

  const { ErrorMSg, SuccessMsg } = useContext(MessagesContext);

  const { setShow } = useContext(LoaderContext);

  const { removeUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const doAction = (data) => {
    const param = data.id ? `/${data.id}` : "";

    axios
      .put(`${l.SERVER_URL}${url}${param}`, data, { withCredentials: true })
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
  };

  return { doAction, serverResponse: response };
};

export default useServerPut;