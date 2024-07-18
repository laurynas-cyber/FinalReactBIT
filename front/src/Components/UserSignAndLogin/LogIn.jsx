import React from "react";
import Inputs from "./Forms/Inputs";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import * as l from "../../Constants/urls";
import useServerPost from "../Hooks/useServerPost";
import { LoaderContext } from "../Context/Loader";
import { AuthContext } from "../Context/Auth";

function Login() {
  const { setShow } = useContext(LoaderContext);

  const { addUser } = useContext(AuthContext);
  const defaultValues = { email: "", password: "" };

  const [form, setForm] = useState(defaultValues);

  const { doAction, serverResponse } = useServerPost(l.SERVER_LOGIN);

  useEffect(
    (_) => {
      if (null === serverResponse) {
        return;
      }
      if (serverResponse.type === "success") {
        addUser(serverResponse.serverData.user);
        window.location = l.SITE_HOME;
      }
    },
    [serverResponse, addUser]
  );

  const handleForm = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (_) => {
    setShow(true);

    doAction(form);
  };
  return (
    <div className="container p-0 logIngHeight">
      <div className="col d-flex justify-content-center align-items-center SignInText">
        <p>Log in or Sign in if you are still not our member</p>
      </div>

      <form className="formCenter">
        <div className="container p-0 formContainer">
          <Inputs
            onChange={handleForm}
            value={form.email}
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            autoComplete="email"
          />
          <Inputs
            onChange={handleForm}
            value={form.password}
            type="password"
            name="password"
            id="psw"
            placeholder="Password"
            autoComplete="password"
          />

          <button
            onClick={submit}
            type="button"
            value="Prisijungti"
            className="btn mainActionBtn"
          >
            Log in
          </button>
          <Link
            to="/SignIn"
            type="button"
            value="Registruotis"
            className="btn SecondActionBtn"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
