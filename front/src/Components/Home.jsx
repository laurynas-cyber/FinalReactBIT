import img1 from "../assets/slider/nature.jpg";
import img2 from "../assets/slider/Palestine.jpg";
import img3 from "../assets/slider/PalestineKids.jpg";
import img4 from "../assets/slider/StrayDogs.jpg";
import img5 from "../assets/slider/ukraine.jpg";

import { ImageSlider } from "./Home/ImageSlider";
import { ImageSlider2 } from "./Home/ImageSlider2";
import useServerGet from "./Hooks/useServerGet";
import * as l from "../Constants/urls";
import { useEffect, useState } from "react";

const Images = [{ url: img1, alt: "Image1" }];

function Home() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_HOME_POSTS
  );

  const [activePost, setActivePost] = useState(null);

  useEffect(
    (_) => {
      doGet();
    },
    [doGet]
  );

  useEffect(
    (_) => {
      if (null === serverGetResponse) {
        return;
      }

      setActivePost(serverGetResponse.serverData.posts ?? null);
    },
    [serverGetResponse]
  );
  return (
    <div className="container p-0">
      <div className="SliderCont">
        <ImageSlider postData={activePost} images={Images} />
        {/* <ImageSlider2 images={Images} /> */}
      </div>
    </div>
  );
}

export default Home;
