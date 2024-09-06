import { ImageSlider } from "./Home/ImageSlider";
import useServerGet from "./Hooks/useServerGet";
import * as l from "../Constants/urls";
import { useContext, useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { LoaderContext } from "./Context/Loader";
import useServerPut from "./Hooks/useServerPut";
import { useNavigate } from "react-router-dom";
import Banner from "./Home/Banner";

function Home() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_HOME_POSTS
  );

  const [posts, setPosts] = useState(null);

  const [donateShow, setDonateShow] = useState(null);
  const [DonateInput, setDonateInput] = useState("");

  // const handleDonate = (e, post) => {
  //   navigate("/");
  //   if (!!donateShow && donateShow === parseInt(e.target.id)) {
  //     let copyPost = post;
  //     if (parseInt(DonateInput) === 0 || isNaN(parseInt(DonateInput))) {
  //       return;
  //     } else {
  //       copyPost.donated = parseInt(DonateInput) + parseInt(copyPost.donated);
  //       setShow(true);
  //       return doPut(copyPost);
  //     }
  //   } else setDonateShow((b) => (+e.target.id === b ? null : +e.target.id));
  // };

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
      if (serverGetResponse.type === "success") {
        setPosts(serverGetResponse.serverData.posts);
      }
    },
    [serverGetResponse]
  );

  const donatedPosts =
    posts === null ? null : posts.filter((p) => p.amount <= p.donated);

  const ActivePosts =
    posts === null ? [] : posts.filter((p) => p.amount > p.donated);

  return (
    <>
      <Banner />
      <div className="contentDown container p-0">
        {ActivePosts?.length === 0 && (
          <div className="row Spinner">
            <div className="col loadingDataContainer">
              <h4>Loading Posts</h4>

              <HashLoader color="#358cc8" size={100} />
            </div>
          </div>
        )}
        {ActivePosts?.length === null ? <div>no posts created</div> : null}
        {ActivePosts?.length > 0 && (
          <>
            <div className="col d-flex justify-content-center align-items-center SignInText">
              <h2>Posts waiting for donations</h2>
            </div>
            <div className="SliderCont">
              <ImageSlider postData={ActivePosts} />
            </div>
          </>
        )}

        {donatedPosts !== null && donatedPosts.length > 0 && (
          <>
            <div className="col d-flex justify-content-center align-items-center SignInText">
              <h3>Donated Posts</h3>
            </div>
            <div className="SliderCont">
              <ImageSlider postData={donatedPosts} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
