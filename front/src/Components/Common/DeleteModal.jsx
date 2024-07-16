import { useContext } from "react";
import { ModalContext } from "../Context/Modals";
import { GiCancel } from "react-icons/gi";

function DeleteModal() {
  const { deleteModal, setDeleteModal } = useContext(ModalContext);

  const submitDelete = () => {
    deleteModal.doDelete(deleteModal.data);
    setDeleteModal(null);
    deleteModal.hideData(deleteModal.data);
  };

  if (deleteModal === null) {
    return null;
  }

  return (
    <div className="delete-modal-container">
      <div className="modal">
        <span className="cancel">
          <GiCancel onClick={(_) => setDeleteModal(null)} />
        </span>
        <p>Are you sure you want to delete {deleteModal.data.name}?</p>
        <div className="buttons d-flex gap-2">
          <button
            onClick={submitDelete}
            type="button"
            className="btn mainActionBtn"
          >
            Yes
          </button>
          <button
            onClick={(_) => setDeleteModal(null)}
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

export default DeleteModal;
