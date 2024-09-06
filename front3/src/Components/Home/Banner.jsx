import bannerPic from "../../assets/images/bannerpic.webp";

function Banner() {
  return (
    <div className="container-fluid BannerContainer">
      <img className="BannerImg" src={bannerPic} alt="" />
      <div className="BannerText">DONATE TO CHARITY ONLINE</div>
      <div className="PosterText">
        
      </div>
    </div>
  );
}

export default Banner;
