import { ImageSlider } from "./Home/ImageSlider";
import useServerGet from "./Hooks/useServerGet";
import * as l from "../Constants/urls";
import { useContext, useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { LoaderContext } from "./Context/Loader";
import useServerPut from "./Hooks/useServerPut";
import { useNavigate } from "react-router-dom";
import Banner from "./Home/Banner";
import DonateModal from "./Common/DonateModal";
import { ModalContext } from "./Context/Modals";
import DonorsText from "./Home/Donors/DonorsText";

function Home() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_HOME_POSTS
  );

  const [posts, setPosts] = useState(null);
  const [donatedBar, setDonatedBar] = useState(0);
  console.log(posts);
  useEffect(
    (_) => {
      doGet();
    },
    [doGet]
  );
  console.log(posts);
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

  let bannerPost = posts === null ? [] : posts.filter((p) => !!p.is_top);

  return (
    <>
      {!!posts && (
        <Banner
          post={bannerPost}
          donatedBar={donatedBar}
          setDonatedBar={setDonatedBar}
        />
      )}
      <div className="container p-0">
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
            <div className="HomeDonorsTextContainer">
              <DonorsText usersCount={posts[0].donors_count} />
            </div>
            <div className="col d-flex justify-content-center align-items-center SignInText">
              <h2>Posts waiting for donations</h2>
            </div>
            <div className="SliderCont">
              <ImageSlider
                postData={ActivePosts}
                donatedBar={donatedBar}
                setDonatedBar={setDonatedBar}
              />
            </div>
          </>
        )}

        {donatedPosts !== null && donatedPosts.length > 0 && (
          <>
            <div className="col d-flex justify-content-center align-items-center SignInText">
              <h3>Donated Posts</h3>
            </div>
            <div className="SliderCont">
              <ImageSlider
                postData={donatedPosts}
                donatedBar={donatedBar}
                setDonatedBar={setDonatedBar}
              />
            </div>
          </>
        )}

        {/* {donateModal && (
          <DonateModal
            updateDonatedBar={updateDonatedBar} // 2 var
          />
        )} */}
      </div>
    </>
  );
}

export default Home;
