import useServerGet from "../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Banner from "./Banner";
import DonorsText from "./Donors/DonorsText";
import Impact from "./Impact";
import ActivePostSlider from "./Sliders/ActivePostSlider";
import { ImageSlider } from "./Sliders/ImageSlider";

function Home() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_HOME_POSTS
  );

  const [posts, setPosts] = useState(null);
  const [donatedBar, setDonatedBar] = useState(0);
  const [scroll, setScroll] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", scrollBar);
  }, []);

  const scrollBar = () => {
    if (window.scrollY > 600) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

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
        {!!ActivePosts && ActivePosts?.length > 0 && (
          <>
            <Impact />

            <ActivePostSlider
              postData={ActivePosts.filter((p) => !p.is_top)}
              setDonatedBar={setDonatedBar}
            />
          </>
        )}

        {donatedPosts !== null && donatedPosts.length > 0 && (
          <>
            <div className="HomeDonorsTextContainer">
              {scroll ? (
                <DonorsText usersCount={posts[0].donors_count} />
              ) : null}
            </div>
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
      </div>
    </>
  );
}

export default Home;
