
import { FaArrowCircleRight } from 'react-icons/fa'

export default function SliderButtonsRight({onClick}) {
  return (
    <button
    onClick={onClick}
    className="img-slider-btn"
    style={{ right: 0 }}
    aria-label="View NExt Slide"
  >
    <FaArrowCircleRight aria-hidden />
  </button>
  )
}
