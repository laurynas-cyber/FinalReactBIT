import { useEffect, useState, useRef, useCallback } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

export const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const intervalRef = useRef(null);

  useCallback((_) => {}, []);

  const startSlider = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setImageIndex((index) => {
        if (index === images.length - 1) {
          return 0;
        } else {
          return index + 1;
        }
      });
    }, 2000); 
  }, [images.length]);

  const stopSlider = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startSlider();
    return () => clearInterval(intervalRef.current);
  }, [startSlider]);

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
          <img
            alt={alt}
            key={url}
            src={url}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ translate: `${-100 * imageIndex}%` }}
          />
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
