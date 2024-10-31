import { useContext, useEffect } from "react";
import * as l from "../../Constants/urls";
import { AuthContext } from "../Context/Auth";
import useServerPost from "../Hooks/useServerPost";
import { LoaderContext } from "../Context/Loader";
import { Link, useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const { removeUser } = useContext(AuthContext);

  const { doAction, serverResponse } = useServerPost(l.SERVER_LOGOUT);

  const { setShow } = useContext(LoaderContext);

  useEffect(
    (_) => {
      if (null === serverResponse) {
        return;
      }
      if (serverResponse.type === "success") {
        removeUser();
        navigate(l.SITE_LOGIN);
      }
    },
    [serverResponse, removeUser, navigate]
  );

  return (
    <Link onClick={(_) => doAction() || setShow(true)} className="RouterLogLinks">
      LOG OUT
    </Link>
  );
}
