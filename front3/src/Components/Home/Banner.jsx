import { useContext, useState } from "react";
import bannerPic from "../../assets/images/bannerpic.webp";
import * as l from "../../Constants/urls";
import { ModalContext } from "../Context/Modals";
import { FaHeart } from "react-icons/fa";
import DonationBannerBar from "./DonationBannerBar";

function Banner({ post, setDonatedBar, donatedBar }) {
  const { setDonateModal } = useContext(ModalContext);

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
          {post[0].amount > post[0].donated + donatedBar ? (
            <>
              <div className="sliderPostText">
                <p className="sliderPostDescript">{post[0].description}</p>
              </div>
              <DonationBannerBar post={post} donatedBar={donatedBar} />
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
