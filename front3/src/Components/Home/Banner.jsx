import { useContext, useState } from "react";
import bannerPic from "../../assets/images/bannerpic.webp";
import * as l from "../../Constants/urls";
import { ModalContext } from "../Context/Modals";
import { FaHeart } from "react-icons/fa";

function Banner({ post, setDonatedBar, donatedBar }) {
  const { setDonateModal } = useContext(ModalContext);

  console.log(post.length);

  function DonatedBar(required, donated) {
    let result = (donated * 100) / required;
    return parseInt(result);
  }

  let imgPath;
  if (post.length === 0) {
    imgPath = bannerPic;
  } else if (post.length > 0) {
    imgPath =
      post[0]?.image?.length > 40
        ? bannerPic
        : l.SERVER_IMAGES_URL + post[0]?.image;
  }
  return (
    <div className="container-fluid BannerContainer">
      <img className="BannerImg" src={imgPath} alt="" />
      <div className="BannerText">DONATE TO CHARITY ONLINE</div>
      {post.length > 0 ? (
        <div className="PostInfoCont">
          <div className="PosterText">{post[0].title}</div>
          {post[0].amount > post[0].donated ? (
            <>
              <div className="sliderPostText">
                <p className="sliderPostDescript">{post[0].description}</p>
              </div>
              <div className="SliderDonationContainer">
                <div className="donationLeft">
                  {post[0].amount <= post[0].donated
                    ? null
                    : `Left ${
                        post[0].amount - post[0].donated - donatedBar
                      }eur to complete`}
                </div>
                <div className="dontaionInfo">
                  <span className="Donated">
                    {" "}
                    Donated {post[0].donated + donatedBar}eur
                  </span>
                  <div
                    className="donationBarContainer"
                    style={{ width: `${post[0].amount / 10}px` }}
                  >
                    <div
                      className="donatedBar"
                      style={{
                        transition: "width ease 0.5s",
                        width: `${
                          DonatedBar(post[0].amount, post[0].donated) +
                          DonatedBar(post[0].amount, donatedBar)
                        }%`,

                        backgroundColor:
                          post[0].amount <= post[0].donated + donatedBar
                            ? "#f08702"
                            : "#3498db",
                      }}
                    ></div>
                  </div>
                  <span className="DonationRequired">
                    <strong>Required {post[0].amount}eur </strong>
                  </span>
                </div>
              </div>
              <button
                className="btn mainDonateBtn"
                onClick={(_) =>
                  setDonateModal({
                    data: post[0],

                    setDonatedBar,
                  })
                }
              >
                DONATE NOW
              </button>
            </>
          ) : (
            <div className="ThankYouPoster">
              <h3>
                THANK YOU FOR YOUR KINDNESS <FaHeart className="HeartIcon" />
              </h3>
              <p>This charity has collected whole sum</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Banner;
