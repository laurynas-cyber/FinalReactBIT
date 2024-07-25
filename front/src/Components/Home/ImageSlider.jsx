import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export const ImageSlider = ({ imageUrls }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative" }}
      className="border border-danger"
    >
      <img src={imageUrls[imageIndex]} className="img-slider-img" />
      <button className="img-slider-btn" style={{ left: 0 }}>
        <FaArrowCircleLeft />
      </button>
      <button className="img-slider-btn" style={{ right: 0 }}>
        <FaArrowCircleRight />
      </button>
    </div>
  );
};
