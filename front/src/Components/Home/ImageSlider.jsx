import { useEffect, useState, useRef, useCallback } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import * as l from "../../Constants/urls";

export const ImageSlider = ({ postData, onClick, donateShow }) => {
  const [imageIndex, setImageIndex] = useState(0);

  console.log(postData);
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

  function DonatedBar(required, donated) {
    let result = (donated * 100) / required;
    return parseInt(result);
  }

  return (
    <>
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
              key={p.id}
              style={{ translate: `${-100 * imageIndex}%` }}
            >
              <img
                alt={p.image}
                src={l.SERVER_IMAGES_URL + p.image}
                className="img-slider-img"
              />
              <div className="sliderPostText">
                <h5 className="sliderPostTitle">{p.title}</h5>
                <p className="sliderPostDescript">{p.description}</p>
              </div>
              <div className="SliderDonationContainer">
                <div className="donationLeft">
                  Left {p.amount - p.donated}eur to complete
                </div>
                <div className="dontaionInfo">
                  <span className="Donated"> Donated {p.donated}eur</span>
                  <div
                    className="donationBarContainer"
                    style={{ width: `${p.amount / 10}px` }}
                  >
                    <div
                      className="donatedBar"
                      style={{ width: `${DonatedBar(p.amount, p.donated)}%` }}
                    ></div>
                  </div>
                  <span className="DonationRequired">
                    <strong>Required {p.amount}eur </strong>
                  </span>
                </div>
                <button onClick={onClick} className="btn mainActionBtn">
                  Donate
                </button>
                <input
                  className="DonateInput"
                  type="text"
                  style={{
                    maxHeight: donateShow + "px",
                    // display: donateShow ? "flex" : "none",
                  }}
                />
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
    </>
  );
};
