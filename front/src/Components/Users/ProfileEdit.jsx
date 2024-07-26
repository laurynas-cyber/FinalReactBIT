import { Link, useParams, useNavigate } from "react-router-dom";
import * as l from "../../Constants/urls";
import roles from "../../Constants/roles";
import { useContext, useEffect, useState } from "react";
import useServerGet from "../Hooks/useServerGet";
import Input from "../UserSignAndLogin/Forms/Inputs";
import Select from "../UserSignAndLogin/Forms/Select";
import useServerPut from "../Hooks/useServerPut";
import HashLoader from "react-spinners/HashLoader";
import { AuthContext } from "../Context/Auth";

function ProfileEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useContext(AuthContext);

  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_USER
  );
  const [GetuserInfo, setUser] = useState(user);
  const [userName, setUserName] = useState("...");

  console.log(user);

 

 

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      if ("success" === serverPutResponse.type) {
        navigate("/");
      }
    },
    [serverPutResponse, navigate]
  );

  const handleForm = (e) => {
    setUser((u) => ({ ...u, [e.target.name]: e.target.value }));
  };

  const submit = (_) => {
    //TODO: Validation
    doPut(GetuserInfo);
  };

  return (
    <>
      <div className="container p-0">
        <div className="col d-flex justify-content-center align-items-center SignInText">
          <p>
            User{" "}
            <strong className="EditName">{userName ? userName : "..."} </strong>{" "}
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

export default ProfileEdit;
