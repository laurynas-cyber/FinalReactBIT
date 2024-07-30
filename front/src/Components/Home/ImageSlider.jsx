import { useEffect, useState, useRef, useCallback } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import * as l from "../../Constants/urls";
import HashLoader from "react-spinners/HashLoader";

export const ImageSlider = ({ postData, images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const intervalRef = useRef(null);

  useCallback((_) => {}, []);

  const startSlider = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setImageIndex((index) => {
        if (index === postData?.length - 1) {
          return 0;
        } else {
          return index + 1;
        }
      });
    }, 2000);
  }, [postData?.length]);

  const stopSlider = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startSlider();
    return () => clearInterval(intervalRef.current);
  }, [startSlider]);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === postData?.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return postData?.length - 1;
      return index - 1;
    });
  }

  return (
    <>
      {postData === null && (
        <div className="row Spinner">
          <div className="col loadingDataContainer">
            <h4>Loading Slider</h4>

            <HashLoader color="#358cc8" size={100} />
          </div>
        </div>
      )}
      {postData !== null && (
        <section
          onMouseEnter={stopSlider}
          onMouseLeave={startSlider}
          aria-label="Image Slider"
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <div className="ImageContainer">
            {postData.map((p) => (
              <div
                className="slideContainer"
                style={{ translate: `${-100 * imageIndex}%` }}
              >
                <img
                  alt={p.image}
                  key={p.id}
                  src={l.SERVER_IMAGES_URL + p.image}
                  className="img-slider-img"
                />
                <div className="sliderPostText">
                  <h5 className="sliderPostTitle">{p.title}</h5>
                  <p className="sliderPostDescript">{p.description}</p>
                </div>
                <div className="SliderDonationContainer">
                  <div className="donationLeft">Left 5000 eur</div>
                  <div className="dontaionInfo">
                    <span className="Donated"> Donated 5000eur</span>
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
            {postData.map((p, index) => (
              <button
                key={p.title}
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
      )}
    </>
  );
};
