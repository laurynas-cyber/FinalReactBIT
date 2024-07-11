import React from "react";
import Inputs from "./Forms/Inputs";

function Login() {
  return (
    <div className="container p-0 logIngHeight">
      <form className="logInformCenter">
        <div className="container p-0 SignInFormContainer">
          <Inputs
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="username"
          />
          <Inputs
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            autoComplete="email"
          />
          <Inputs
            type="password"
            name="psw"
            id="psw"
            placeholder="Password"
            autoComplete="psw"
          />

          <button
            type="button"
            value="Registruotis"
            className="btn btn-primary"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
