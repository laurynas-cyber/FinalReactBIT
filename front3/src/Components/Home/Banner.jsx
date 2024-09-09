import bannerPic from "../../assets/images/bannerpic.webp";
import * as l from "../../Constants/urls";

function Banner({ post }) {
  // const imgPath = post[0].image?.length > 40 ? "" : l.SERVER_IMAGES_URL;
  // console.log(post[0].image);
  let imgPath = bannerPic;
  if (post.length > 0) {
    imgPath =
      post[0]?.image?.length > 40
        ? bannerPic
        : l.SERVER_IMAGES_URL + post[0]?.image;
  } else return;
  console.log(imgPath);
  return (
    <div className="container-fluid BannerContainer">
      <img className="BannerImg" src={imgPath} alt="" />
      {/* <img className="BannerImg" src={bannerPic} alt="" /> */}
      <div className="BannerText">DONATE TO CHARITY ONLINE</div>
      <div className="PosterText"></div>
    </div>
  );
}

export default Banner;
