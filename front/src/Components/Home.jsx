import img1 from "../assets/slider/nature.jpg";
import img2 from "../assets/slider/Palestine.jpg";
import img3 from "../assets/slider/PalestineKids.jpg";
import img4 from "../assets/slider/StrayDogs.jpg";
import img5 from "../assets/slider/ukraine.jpg";
import { ImageSlider } from "./Home/ImageSlider";

const Images = [img1, img2, img3, img4, img5];

function Home() {
  return (
    <div className="container p-0">
      <div className="SliderCont">
        <ImageSlider imageUrls={Images} />
      </div>

    </div>
  );
}

export default Home;
