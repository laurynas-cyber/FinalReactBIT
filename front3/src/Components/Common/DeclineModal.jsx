import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Context/Modals";
import { GiCancel } from "react-icons/gi";

import * as l from "../../Constants/urls";
import { LoaderContext } from "../Context/Loader";
import { useNavigate } from "react-router-dom";
import Textarea from "../UserSignAndLogin/Forms/Textarea";
import Select from "../UserSignAndLogin/Forms/Select";
import comments from "../../Constants/comments";
import useServerPut from "../Hooks/useServerPut";

function DeclineModal() {
  const { declineModal, setDeclineModal } = useContext(ModalContext);
  const [data, setData] = useState(null);
  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_COMMENTPOST
  );
  const { setShow } = useContext(LoaderContext);
  const [declineForm, setDeclineForm] = useState({
    comment: "",
    selectComment: "No picture",
  });
  const navigate = useNavigate();
  const handleForm = (e) => {
    setDeclineForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleConfirm = (_) => {
    setShow(true);
    doPut(data);
    setDeclineModal(null);
    setDeclineForm({
      comment: "",
      selectComment: "No picture",
    });
  };

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      if ("success" === serverPutResponse.type) {
        navigate("/dashbord/pendingposts");
      }
    },
    [serverPutResponse, navigate]
  );

  useEffect(
    (_) => {
      if (declineModal !== null) {
        if (declineForm.selectComment === "Other") {
          setData({ id: declineModal.id, comment: declineForm.comment });
        } else {
          setData({ id: declineModal.id, comment: declineForm.selectComment });
        }
      }
    },
    [declineModal, declineForm]
  );

  if (declineModal === null) {
    return null;
  }

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

        <p>Please choose decline reason comment</p>
        <form>
          <Select
            onChange={handleForm}
            value={declineForm.selectComment}
            name="selectComment"
            options={comments}
          />

          {declineForm.selectComment === "Other" ? (
            <Textarea
              onChange={handleForm}
              type="text"
              name="comment"
              value={declineForm.comment}
              title="Comment"
              placeholder="Leave your here comment"
              maxChar={50}
            />
          ) : null}
        </form>
        <div className="buttons d-flex gap-2">
          <button
            type="button"
            className="btn mainActionBtn"
            onClick={handleConfirm}
          >
            Decline
          </button>
          <button
            onClick={(_) => {
              setDeclineModal(null);
              setDeclineForm({
                comment: "",
                selectComment: "No picture",
              });
            }}
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
