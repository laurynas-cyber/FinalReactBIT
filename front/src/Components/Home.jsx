import { ImageSlider } from "./Home/ImageSlider";
import useServerGet from "./Hooks/useServerGet";
import * as l from "../Constants/urls";
import { useContext, useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { LoaderContext } from "./Context/Loader";
import useServerPut from "./Hooks/useServerPut";

function Home() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_HOME_POSTS
  );
  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_POST
  );

  const [activePost, setActivePost] = useState(null);
  const [donatedPost, setDonatedPost] = useState(null);
  const { setShow } = useContext(LoaderContext);
  const [donateShow, setDonateShow] = useState(null);
  const [DonateInput, setDonateInput] = useState("");

  const handleDonate = (e, post) => {
    if (!!donateShow && donateShow === parseInt(e.target.id)) {
      let copyPost = post;
      if (copyPost.amount - DonateInput <= 0) {
        copyPost.donated = copyPost.amount;
        console.log(copyPost.donated, "bigger");
        setShow(true);
        return doPut(copyPost);
      } else {
        console.log(copyPost.donated, "smaller");
        copyPost.donated = DonateInput;
        setShow(true);
        return doPut(copyPost);
      }
    } else setDonateShow((b) => (+e.target.id === b ? null : +e.target.id));
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

      setActivePost(
        serverGetResponse.serverData.posts.filter(
          (p) => p.amount > p.donated
        ) ?? null
      );
      setDonatedPost(
        serverGetResponse.serverData.posts.filter(
          (p) => p.amount <= p.donated
        ) ?? null
      );
    },
    [serverGetResponse, setDonatedPost]
  );

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      if (serverPutResponse.type === "error") {
        console.log(" error");
      }
    },
    [serverPutResponse]
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
      {activePost?.length > 0 && (
        <>
          <div className="col d-flex justify-content-center align-items-center SignInText">
            <h2>Posts waiting for donations</h2>
          </div>
          <div className="SliderCont">
            <ImageSlider
              postData={activePost}
              onClick={handleDonate}
              donateShow={donateShow}
              setDonateInput={setDonateInput}
              DonateInput={DonateInput}
            />
          </div>
        </>
      )}

      {donatedPost !== null && (
        <>
          <div className="col d-flex justify-content-center align-items-center SignInText">
            <p>Donated Posts</p>
          </div>
          <div className="SliderCont">
            <ImageSlider postData={donatedPost} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
