import { ImageSlider } from "./Home/ImageSlider";
import useServerGet from "./Hooks/useServerGet";
import * as l from "../Constants/urls";
import { useContext, useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { LoaderContext } from "./Context/Loader";

function Home() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_HOME_POSTS
  );

  const [activePost, setActivePost] = useState(null);
  const { setShow } = useContext(LoaderContext);
  const [donateShow, setDonateShow] = useState(0);

  const handleDonate = (_) => {
    setDonateShow(100);
  };

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
      {activePost === null && (
        <div className="row Spinner">
          <div className="col loadingDataContainer">
            <h4>Loading Slider</h4>

            <HashLoader color="#358cc8" size={150} />
          </div>
        </div>
      )}
      {activePost !== null && (
        <div className="SliderCont">
          <ImageSlider
            postData={activePost}
            onClick={handleDonate}
            donateShow={donateShow}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
