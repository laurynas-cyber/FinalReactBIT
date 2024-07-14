import { useEffect, useState } from "react";
import useServerPost from "../Hooks/useServerPost";
import useRegister from "../Validations/useRegister";
import Inputs from "./Forms/Inputs";
import * as l from "../../Constants/urls";
import { redirect } from "react-router-dom";

function SignIn() {
  const defaultValues = {
    name: "",
    email: "",
    psw: "",
    psw2: "",
  };

  const [form, setForm] = useState(defaultValues);
  const { doAction, serverResponse } = useServerPost(l.SERVER_REGISTER);
  const { errors, validate, setServerErrors } = useRegister();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleForm(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!validate(form)) {
      return;
    }
    setButtonDisabled(true);
    doAction({
      name: form.name,
      email: form.email,
      password: form.psw,
    });
  }

  useEffect(
    (_) => {
      if (null === serverResponse) {
        return;
      }

      setButtonDisabled(false);
      if (serverResponse.type === "success") {
        setTimeout(() => {
          window.location = l.REDIRECT_AFTER_REGISTER;
        }, "4000");
      } else {
        if (serverResponse.serverData?.response?.data?.errorsBag) {
          setServerErrors(serverResponse.serverData.response.data.errorsBag);
        }
      }
    },
    [serverResponse]
  );

  return (
    <>
      <div className="container">
        <div className="row SignInTextContainer">
          <div className="col d-flex justify-content-center align-items-center SignInText">
            <h2>Become a member of our are team</h2>
            <p>
              Sign in, create your fund, post it, get donations and help someone
              arround the world
            </p>
          </div>
        </div>
        <form>
          <div className="container p-0 SignInFormContainer">
            <Inputs
              errors={errors}
              onChange={handleForm}
              value={form.name}
              type="text"
              name="name"
              placeholder="Your name"
              autoComplete="username"
            />
            <Inputs
              errors={errors}
              onChange={handleForm}
              value={form.email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              autoComplete="email"
            />
            <Inputs
              errors={errors}
              onChange={handleForm}
              value={form.psw}
              type="password"
              name="psw"
              id="psw"
              placeholder="Password"
              autoComplete="psw"
            />
            <Inputs
              errors={errors}
              onChange={handleForm}
              value={form.psw2}
              type="password"
              name="psw2"
              id="psw2"
              placeholder="Repeat your password"
              autoComplete="psw"
            />

            <button
              disabled={buttonDisabled}
              type="button"
              onClick={handleSubmit}
              value="Registruotis"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
