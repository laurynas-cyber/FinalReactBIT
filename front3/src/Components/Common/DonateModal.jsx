import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Context/Modals";
import { GiCancel } from "react-icons/gi";
import useDonation from "../Validations/useDonation";
import Inputs from "../UserSignAndLogin/Forms/Inputs";
import useServerPost from "../Hooks/useServerPost";
import * as l from "../../Constants/urls";
import { LoaderContext } from "../Context/Loader";
import { useNavigate } from "react-router-dom";

function DonateModal() {
  const { donateModal, setDonateModal } = useContext(ModalContext);
  const { errors, validate } = useDonation();
  const { doAction, serverResponse } = useServerPost(l.POST_DONATE);
  const { setShow } = useContext(LoaderContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [donateForm, setDonateForm] = useState({
    name: "",
    email: "",
    donation: "",
  });
  const navigate = useNavigate();
  const handleForm = (e) => {
    setDonateForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  useEffect(
    (_) => {
      if (null === serverResponse) {
        return;
      }

      setButtonDisabled(false);
      if (serverResponse.type === "success") {
        navigate("/");
      }
    },
    [serverResponse, navigate]
  );

  if (donateModal === null) {
    return null;
  }

  const handleConfirm = (_) => {
    if (!validate(donateForm)) {
      return;
    }
    setShow(true);
    setButtonDisabled(true);

    doAction({
      name: donateForm.name,
      email: donateForm.email,
      donation: donateForm.donation,
      post_id: donateModal.data.id,
    });
    // donateModal.setDonatedBar((prev) => prev + parseInt(donateForm.donation)); // 1var
 donateModal.setDonatedBar((prev) => prev + parseInt(donateForm.donation));
    setDonateModal(null);
  };

  return (
    <div className="delete-modal-container">
      <div className="modal donate-modal">
        <span className="cancel">
          <GiCancel onClick={(_) => setDonateModal(null)} />
        </span>
        <div>
          <strong className="EditName">{donateModal.data.title}</strong>
          <strong> donation form</strong>
        </div>

        <p>Please fill your data</p>
        <form>
          <Inputs
            errors={errors}
            onChange={handleForm}
            value={donateForm.name}
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="username"
          />

          <Inputs
            errors={errors}
            onChange={handleForm}
            value={donateForm.email}
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            autoComplete="email"
          />

          <Inputs
            errors={errors}
            onChange={handleForm}
            value={donateForm.donation}
            name="donation"
            type="number"
            placeholder="Enter donating sum"
            autoComplete="number"
          />
        </form>
        <div className="buttons d-flex gap-2">
          <button
            disabled={buttonDisabled}
            type="button"
            className="btn mainActionBtn"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            onClick={(_) => setDonateModal(null)}
            type="button"
            className="btn SecondActionBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonateModal;
