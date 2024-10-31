import * as l from "../../Constants/urls";

function NoPhoto() {
  return (
    <img
      alt="error"
      src={l.SERVER_IMAGES_URL + "no-image.png"}
      className="img-slider-img"
    />
  );
}

export default NoPhoto;
