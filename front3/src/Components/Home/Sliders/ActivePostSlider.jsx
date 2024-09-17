import { useContext, useState } from "react";
import * as l from "../../../Constants/urls";
import { IoIosArrowForward } from "react-icons/io";
import { ModalContext } from "../../Context/Modals";
import SliderButtonsLeft from "./SliderButtonsLeft";
import SliderButtonsRight from "./SliderButtonsRight";
import DonationPostBar from "../Donors/DonationPostBar";

export default function ActivePostSlider({ postData, setPosts,setLastDonatedId, lastDonatedId }) {
  const [imageIndex, setImageIndex] = useState(0);

  const { setDonateModal } = useContext(ModalContext);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === NewPostData?.length - 1) return NewPostData?.length - 1;
      else {
        console.log(imageIndex);
        return index + 1;
      }
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return 0;
      else {
        console.log(imageIndex);
        return index - 1;
      }
    });
  }

  const NewPostData = [];
  console.log(postData);
  for (let i = 0; i < postData.length; i += 3) {
    NewPostData.push(postData.slice(i, i + 3));
  }

  return (
    <section className="ActivePostSliderSection">
      <div className="ActivePostSliderContainer">
        {NewPostData.map((arr, i) => (
          <div
            className="PostSlider"
            style={{ translate: `${-100 * imageIndex}%` }}
          >
            {arr.map((p, i) => (
              <div
                className="ActivePostImageBox"
                onClick={(_) =>
                  setDonateModal({
                    data: p,
                    setLastDonatedId,
                    setPosts,
                  })
                }
              >
                <div
                  className="ActiveSliderPostText"
                  style={{ maxWidth: i % 3 === 0 ? "25rem" : null }}
                >
                  <p
                    className="sliderPostDescript"
                    style={{ fontSize: i % 3 === 0 ? "20px" : null }}
                  >
                    {p.description}
                  </p>
                </div>
                <img alt={arr.title} src={l.SERVER_IMAGES_URL + p?.image}></img>
                <div className="ActivePostImageBox-PostTitle">
                  {p.title}
                  <IoIosArrowForward />
                </div>

                <DonationPostBar post={p} index={i} lastDonatedId={lastDonatedId} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {imageIndex !== 0 && <SliderButtonsLeft onClick={showPrevImage} />}
      {imageIndex !== NewPostData?.length - 1 && (
        <SliderButtonsRight onClick={showNextImage} />
      )}
    </section>
  );
}
