import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import * as l from "../../../Constants/urls";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ModalContext } from "../../Context/Modals";
import SliderButtonsLeft from "./SliderButtonsLeft";
import SliderButtonsRight from "./SliderButtonsRight";
import NoPhoto from "../../Common/NoPhoto";

export const ImageSlider = ({ postData }) => {
  const { donateModal, setDonateModal } = useContext(ModalContext);
  const [imageIndex, setImageIndex] = useState(0);

  const intervalRef = useRef(null);

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
        className="ImageSliderSection"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <div className="ImageContainer">
          {postData.map((p, index) => (
            <div
              className="slideContainer"
              key={p.id}
              style={{ translate: `${-100 * imageIndex}%` }}
            >
              {p.image === null ? (
                <NoPhoto />
              ) : (
                <img
                  alt={p.image}
                  src={l.SERVER_IMAGES_URL + p.image}
                  className="img-slider-img"
                />
              )}

              <div className="sliderPostText">
                <h5 className="sliderPostTitle">{p.title}</h5>
                <p className="sliderPostDescript">{p.description}</p>
              </div>
              <div className="SliderDonationContainer">
                <div className="donationLeft">
                  {p.amount <= p.donated
                    ? null
                    : `Left ${p.amount - p.donated}eur to complete`}
                </div>
                <div className="dontaionInfo">
                  <span className="Donated"> Donated {p.donated}eur</span>
                  <div
                    className="donationBarContainer"
                    style={{ width: `${p.amount / 10}px` }}
                  >
                    <div
                      className="donatedBar"
                      style={{
                        width: `${DonatedBar(p.amount, p.donated)}%`,
                        backgroundColor:
                          p.amount <= p.donated ? "#f08702" : "#3498db",
                      }}
                    ></div>
                  </div>
                  <span className="DonationRequired">
                    <strong>Required {p.amount}eur </strong>
                  </span>
                </div>
                {p.amount <= p.donated ? null : (
                  <>
                    <div className="ButtonContainerDonate">
                      {donateModal?.data.id === p.id ? (
                        <FaLongArrowAltRight className="DonateArrows" />
                      ) : null}

                      <button
                        id={p.id}
                        className="btn mainActionBtn"
                        style={{
                          backgroundColor:
                            donateModal?.data.id === p.id
                              ? "#f08702"
                              : "#3498db",
                        }}
                        onClick={(_) => setDonateModal({ data: p })}
                      >
                        Donate
                      </button>

                      {donateModal?.data.id === p.id ? (
                        <FaLongArrowAltLeft className="DonateArrows" />
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <SliderButtonsLeft onClick={showPrevImage} />
        <SliderButtonsRight onClick={showNextImage} />
        <div className="IndexSlideBubbles">
          {postData.map((p, index) => (
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
    </>
  );
};
