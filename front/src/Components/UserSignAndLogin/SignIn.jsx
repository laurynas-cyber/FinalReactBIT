import { useEffect, useState } from "react";
import useServerPost from "../Hooks/useServerPost";

function SignIn() {
  const defaultValues = {
    name: "",
    email: "",
    psw: "",
    psw2: "",
  };

  const [form, setForm] = useState(defaultValues);
  const { doAction, response } = useServerPost("register");

  function handleForm(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    doAction({
      name: form.name,
      email: form.email,
      psw: form.psw,
    });
  }

  useEffect(
    (_) => {
      if (null === response) {
        return;
      }

      if (response.type === "success") {
      }
    },
    [response]
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
            <div className="form-floating">
              <input
                onChange={handleForm}
                type="text"
                id="name"
                className="form-control"
                placeholder="whatever"
                name="name"
                autoComplete="name"
                value={form.name}
              ></input>
              <label htmlFor="name" className="form-label">
                Your name
              </label>
            </div>
            <div className="form-floating">
              <input
                onChange={handleForm}
                type="email"
                id="email"
                className="form-control"
                placeholder="whatever"
                name="email"
                autoComplete="email"
                value={form.email}
              ></input>
              <label htmlFor="email" className="form-label">
                Enter email
              </label>
            </div>
            <div className="form-floating">
              <input
                onChange={handleForm}
                id="psw"
                className="form-control"
                placeholder="whatever"
                name="psw"
                autoComplete="psw"
                type="password"
                value={form.psw}
              ></input>
              <label htmlFor="psw" className="form-label">
                Password
              </label>
            </div>
            <div className="form-floating">
              <input
                onChange={handleForm}
                type="password"
                id="psw2"
                className="form-control"
                placeholder="whatever"
                name="psw2"
                autoComplete="psw2"
                value={form.psw2}
              ></input>
              <label htmlFor="psw2" className="form-label">
                Repeat your password
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              value="Registruotis"
              class="btn btn-primary"
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
