import { useEffect, useState, useRef, useCallback } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

export const ImageSlider2 = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const intervalRef = useRef(null);

  useCallback((_) => {}, []);

  const startSlider = useCallback(() => {
    setImageIndex((index) => {
      if (index === images.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });
  }, [images.length]);

  const stopSlider = () => {};

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  return (
    <section
      onMouseEnter={stopSlider}
      onMouseLeave={startSlider}
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div className="ImageContainer">
        {images.map(({ url, alt }, index) => (
          <div
            className="slideContainer"
            style={{ translate: `${-100 * imageIndex}%` }}
          >
            <img
              alt={alt}
              key={url}
              src={url}
              aria-hidden={imageIndex !== index}
              className="img-slider-img"
              style={{ translate: `${-100 * imageIndex}%` }}
            />
            <div className="sliderPostText">
              <h5 className="sliderPostTitle">Hello</h5>
              <p className="sliderPostDescript">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt amet, quae minima odit esse magnam illum, voluptatibus
                nostrum perferendis assumenda fugiat aspernatur laborum nam.
                Officia, laboriosam nobis? Non, assumenda ab expedita itaque
                cupiditate fuga dicta, tenetur totam quae sit numquam quidem
                quos voluptate, error veniam? Provident saepe autem minima
                maiores.
              </p>
            </div>
            <div className="SliderDonationContainer">
              <div className="donationLeft">Left 5000 eur</div>
              <div className="dontaionInfo">
                <span className="Donated"> Donate</span>
                <div className="donationBarContainer">
                  <div className="donatedBar"></div>
                </div>
                <span className="DonationRequired">
                  <strong>Required 10000 eur </strong>
                </span>
              </div>
              <button className="btn mainActionBtn">Donate</button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Slide"
      >
        <FaArrowCircleLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View NExt Slide"
      >
        <FaArrowCircleRight aria-hidden />
      </button>
      <div className="IndexSlideBubbles">
        {images.map((url, index) => (
          <button
            key={index}
            className="img-slide-dot-btn"
            onClick={() => setImageIndex(index)}
            aria-label={`View Image ${index}`}
          >
            {index === imageIndex ? (
              <FaCircle aria-hidden />
            ) : (
              <FaRegCircle aria-hidden />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
