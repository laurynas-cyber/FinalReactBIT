

// import "./Styles/main.scss";
import React, { useRef } from "react";

function App() {
  const form = useRef();

  // function handleValid(e) {
  //   if (!form.checkValidity()) {
  //     e.preventDefault();
  //   }

  //   form.classlist.add("was-validated");
  // }

  return (
    <>
      <div className="container">
        <form ref={form} noValidate>
          <div className="form-floating">
            <input
              type="email"
              id="email"
              className="form-control is-invalid"
              placeholder="whatever"
              required
            ></input>
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <div className="invalid-feedback">Invalid email</div>
            <div className="valid-feedback">Correct email</div>
          </div>

          <button>lol</button>
        </form>
      </div>
      <div className="container">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modal"
        >
          Open Modal
        </button>
        <div className="modal" id="modal">
          <div className="modal-dialog">
            <div className="modal-content">Test</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="hstack gap-3">
          <div
            className="box"
            style={{
              width: "100%",
              backgroundColor: "blue",
              height: "50px",
              color: "white",
            }}
          >
            {" "}
            HStacks
          </div>
          <div
            className="box"
            style={{ width: "100%", backgroundColor: "blue", height: "50px" }}
          ></div>
        </div>
        <div className="vstack gap-2">
          <div
            className="box"
            style={{
              width: "100%",
              backgroundColor: "red",
              height: "50px",
              color: "white",
            }}
          >
            Vstacks
          </div>
          <div
            className="box"
            style={{ backgroundColor: "red", height: "50px" }}
          ></div>
        </div>
      </div>
      <div className="container">
        <div className="row gap-2 d-flex flex-column">
          <div className="col-1">
            <div
              className="box"
              style={{ backgroundColor: "yellow", height: "50px" }}
            >
              Row and Col
            </div>
          </div>
          <div className="col">
            <div
              className="box"
              style={{ backgroundColor: "yellow", height: "50px" }}
            >
              Row and Col
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
