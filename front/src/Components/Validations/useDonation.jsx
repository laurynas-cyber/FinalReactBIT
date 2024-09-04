import { useState } from "react";

function useDonation() {
  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const errorsBag = {};
    if (form.name.length <= 4) {
      errorsBag.name = "Name is too short must be atlest 4 symbols";
    }

    if (form.donation.length < 1) {
      errorsBag.donation = "Please enter sum";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      errorsBag.email = "Email format is invalid";
    }

    if (Object.keys(errorsBag).length === 0) {
      console.log(Object.keys(errorsBag));
      setErrors({});
      return true;
    } //tikrinam kokie yra key yra tam objekte. taip galima tikrinti ar jis tuscias ar ne.

    setErrors(errorsBag);
    return false;
  };

  return { errors, validate };
}

export default useDonation;
