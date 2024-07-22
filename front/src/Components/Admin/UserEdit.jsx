import { Link, useParams, useNavigate } from "react-router-dom";
import * as l from "../../Constants/urls";
import roles from "../../Constants/roles";
import { useEffect, useState } from "react";
import useServerGet from "../Hooks/useServerGet";
import Input from "../UserSignAndLogin/Forms/Inputs";
import Select from "../UserSignAndLogin/Forms/Select";
import useServerPut from "../Hooks/useServerPut";
import HashLoader from "react-spinners/HashLoader";

function UserEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_EDIT_USER
  );
  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_USER
  );
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("...");

  useEffect(
    (_) => {
      doGet("/" + params.id);
    },
    [doGet, params.id]
  );

  useEffect(
    (_) => {
      if (null === serverGetResponse) {
        return;
      }

      setUser(serverGetResponse.serverData.user ?? null);
      setUserName(serverGetResponse.serverData.user.name);
    },
    [serverGetResponse]
  );

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      if ("success" === serverPutResponse.type) {
        navigate("/dashbord/userlist");
      }
    },
    [serverPutResponse]
  );

  const handleForm = (e) => {
    setUser((u) => ({ ...u, [e.target.name]: e.target.value }));
  };

  const submit = (_) => {
    //TODO: Validation
    doPut(user);
  };

  return (
    <>
      <div className="container p-0">
        <div className="col d-flex justify-content-center align-items-center SignInText">
          <p>
            User <strong className="EditName">{userName} </strong> edit field
          </p>
        </div>
        {null === user && (
          <div className="row Spinner">
            <div className="col loadingDataContainer">
              <h4>Loading user...</h4>

              <HashLoader color="#358cc8" size={100} />
            </div>
          </div>
        )}
        {null !== user && (
          <form className="formCenter">
            <div className="container formContainer">
              <Input
                onChange={handleForm}
                value={user.name}
                type="text"
                name="name"
              />
              <Input
                onChange={handleForm}
                value={user.email}
                type="text"
                name="email"
                autoComplete="off"
              />
              <Input
                onChange={handleForm}
                value={user.password}
                type="password"
                name="password"
                placeholder="Change password"
                autoComplete="new-password"
              />
              <Select
                onChange={handleForm}
                value={user.role}
                name="role"
                options={roles}
              />
              <button
                onClick={submit}
                className="btn mainActionBtn"
                type="button"
              >
                Save
              </button>
              <Link className="btn SecondActionBtn" to={`/dashbord/userlist/`}>
                Back to list
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default UserEdit;
