import React from "react";
import Inputs from "./Forms/Inputs";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container p-0 logIngHeight">
      <div className="col d-flex justify-content-center align-items-center SignInText">
        <p>Log in or Sign in if you are still not our member</p>
      </div>

      <form className="formCenter">
        <div className="container p-0 formContainer">
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
