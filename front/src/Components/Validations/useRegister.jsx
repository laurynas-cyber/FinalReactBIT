import { useState } from "react";

function useRegister() {
  const [errors, setErrors] = useState({});

  const setServerErrors = (err) => {
    setErrors(err);
  };

  const validate = (form) => {
    const errorsBag = {};
    if (form.name.length <= 3) {
      errorsBag.name = "Name is too short must be atlest 3 symbols";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      errorsBag.email = "Email format is invalid";
    }

    if (form.psw.length <= 8) {
      errorsBag.psw = "Password is too short, minimum length is 8 symbols";
    } else if (!/[0-9]/.test(form.psw)) {
      errorsBag.psw = "Password must have at least one number";
    } else if (!/[a-z]/.test(form.psw)) {
      errorsBag.psw = "Password must have at least one lowercase";
    } else if (!/[A-Z]/.test(form.psw)) {
      errorsBag.psw = "Password must have at least one uppercase";
    }

    if (form.psw !== form.psw2 && !errorsBag.psw) {
      errorsBag.psw2 = "Passwords do not match";
    }

    // laikinai

    if (Object.keys(errorsBag).length === 0) {
      console.log(Object.keys(errorsBag));
      setErrors({});
      return true;
    } //tikrinam kokie yra key yra tam objekte. taip galima tikrinti ar jis tuscias ar ne.

    setErrors(errorsBag);
    return false;
  };

  return { errors, validate, setServerErrors };
}

export default useRegister;
