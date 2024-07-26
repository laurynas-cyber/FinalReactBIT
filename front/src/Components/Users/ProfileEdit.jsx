import { Link, useNavigate } from "react-router-dom";
import * as l from "../../Constants/urls";
import { useContext, useEffect, useState } from "react";
import Input from "../UserSignAndLogin/Forms/Inputs";
import useServerPut from "../Hooks/useServerPut";
import HashLoader from "react-spinners/HashLoader";
import { AuthContext } from "../Context/Auth";
import { LoaderContext } from "../Context/Loader";

function ProfileEdit() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_USER
  );
  const [GetuserInfo, setGetuserInfo] = useState(user);
  const { setShow } = useContext(LoaderContext);

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      console.log(serverPutResponse);
      if ("success" === serverPutResponse.type) {
        setUser(GetuserInfo);
        navigate(`/user/${user.id}`);
      }
    },
    [serverPutResponse, navigate]
  );

  const handleForm = (e) => {
    setGetuserInfo((u) => ({ ...u, [e.target.name]: e.target.value }));
  };

  const submit = (_) => {
    //TODO: Validation
    doPut(GetuserInfo);
    setShow(true);
  };

  return (
    <>
      <div className="container p-0">
        <div className="col d-flex justify-content-center align-items-center SignInText">
          <p>
            User{" "}
            <strong className="EditName">
              {user.name ? user.name : "..."}
            </strong>{" "}
            edit field
          </p>
        </div>
        {null === user && (
          <div className="row Spinner">
            <div className="col loadingDataContainer">
              <h4>Loading user data...</h4>

              <HashLoader color="#358cc8" size={100} />
            </div>
          </div>
        )}
        {null !== user && (
          <form className="formCenter">
            <div className="container formContainer">
              <Input
                onChange={handleForm}
                value={GetuserInfo.name}
                type="text"
                name="name"
              />
              <Input
                onChange={handleForm}
                value={GetuserInfo.email}
                type="text"
                name="email"
                autoComplete="off"
              />
              <Input
                onChange={handleForm}
                value={GetuserInfo.password}
                type="password"
                name="password"
                placeholder="Change password"
                autoComplete="new-password"
              />

              <button
                onClick={submit}
                className="btn mainActionBtn"
                type="button"
              >
                Save
              </button>
              <Link className="btn SecondActionBtn" to={`/user/${user.id}`}>
                Back to menu
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default ProfileEdit;
