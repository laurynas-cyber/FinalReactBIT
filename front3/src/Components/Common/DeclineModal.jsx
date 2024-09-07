import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Context/Modals";
import { GiCancel } from "react-icons/gi";
import useServerPost from "../Hooks/useServerPost";
import * as l from "../../Constants/urls";
import { LoaderContext } from "../Context/Loader";
import { useNavigate } from "react-router-dom";
import Textarea from "../UserSignAndLogin/Forms/Textarea";

function DeclineModal() {
  const { declineModal, setDeclineModal } = useContext(ModalContext);
  const { doAction, serverResponse } = useServerPost(l.POST_DONATE);
  const { setShow } = useContext(LoaderContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [declineForm, setDeclineForm] = useState({
    comment: "",
  });
  const navigate = useNavigate();
  const handleForm = (e) => {
    setDeclineForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // console.log(declineModal.data.id);

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

  console.log(declineModal);
  if (declineModal === null) {
    return null;
  }

  const handleConfirm = (_) => {
    setShow(true);
    setButtonDisabled(true);
    doAction({
      name: declineForm.name,
      email: declineForm.email,
      donation: declineForm.donation,
      post_id: declineModal.data.id,
    });
    setDeclineModal(null);
  };

  console.log(declineModal);
  return (
    <div className="delete-modal-container">
      <div className="modal decline-modal">
        <span className="cancel">
          <GiCancel onClick={(_) => setDeclineModal(null)} />
        </span>
        <div>
          <strong className="EditName">{declineModal.title}</strong>
          <strong> decline section</strong>
        </div>

        <p>Please leave reason comment</p>
        <form>
          <Textarea
            onChange={handleForm}
            type="text"
            name="comment"
            value={declineForm.comment}
            placeholder="leave your comment"
            maxChar={100}
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
            onClick={(_) => setDeclineModal(null)}
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

export default DeclineModal;
