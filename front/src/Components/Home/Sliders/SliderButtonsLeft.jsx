import { FaArrowCircleLeft } from "react-icons/fa";


export default function SliderButtonsLeft({onClick}) {
  return (
    <button
    onClick={onClick}
    className="img-slider-btn"
    style={{ left: 0 }}
    aria-label="View Previous Slide"
  >
    <FaArrowCircleLeft aria-hidden />
  </button>
  )
}
