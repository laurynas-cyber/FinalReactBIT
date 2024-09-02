import React, { useContext } from "react";
import { ModalContext } from "../Context/Modals";
import { GiCancel } from "react-icons/gi";

function DonateModal() {
  const { donateModal, setDonateModal } = useContext(ModalContext);

  if (donateModal === null) {
    return null;
  }

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
          <div>
            <div>Name</div>
            <input className="form-control"></input>
          </div>
          <div>
            <div>Email</div>
            <input className="form-control"></input>
          </div>
          <div>
            <div>Donation sum</div>
            <input className="form-control"></input>
          </div>
        </form>
        <div className="buttons d-flex gap-2">
          <button type="button" className="btn mainActionBtn">
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
