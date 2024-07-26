import img1 from "../assets/slider/nature.jpg";
import img2 from "../assets/slider/Palestine.jpg";
import img3 from "../assets/slider/PalestineKids.jpg";
import img4 from "../assets/slider/StrayDogs.jpg";
import img5 from "../assets/slider/ukraine.jpg";
import { ImageSlider } from "./Home/ImageSlider";

const Images = [
  { url: img1, alt: "Image1" },
  { url: img2, alt: "Image2" },
  { url: img3, alt: "Image3" },
  { url: img4, alt: "Image4" },
  { url: img5, alt: "Image5" },
];

function Home() {
  return (
    <div className="container p-0">
      <div className="SliderCont">
        <ImageSlider images={Images} />
      </div>
    </div>
  );
}

export default Home;
