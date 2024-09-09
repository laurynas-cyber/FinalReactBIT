import { useContext } from "react";
import { ModalContext } from "../Context/Modals";
import { GiCancel } from "react-icons/gi";
import { LoaderContext } from "../Context/Loader";

function BannerModal() {
  const { bannerModal, setBannerModal } = useContext(ModalContext);
  const { setShow } = useContext(LoaderContext);
  const submitTopBanner = () => {
    bannerModal.doPut(bannerModal.data);
    setBannerModal(null);
    setShow(true);
  };

  if (bannerModal === null) {
    return null;
  }

  return (
    <div className="delete-modal-container">
      <div className="modal">
        <span className="cancel">
          <GiCancel onClick={(_) => setBannerModal(null)} />
        </span>
        <p>Are you sure you want to make {bannerModal.title} banner post?</p>
        <div className="buttons d-flex gap-2">
          <button
            onClick={submitTopBanner}
            type="button"
            className="btn mainActionBtn"
          >
            Yes
          </button>
          <button
            onClick={(_) => setBannerModal(null)}
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

export default BannerModal;
