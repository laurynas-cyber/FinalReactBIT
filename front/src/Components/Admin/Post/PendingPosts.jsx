import React, { useEffect, useState } from "react";
import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../../Constants/urls";
import HashLoader from "react-spinners/HashLoader";
import PostsCard from "./PostsCard";

const PendingPosts = () => {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_PENDING_POSTS
  );

  const [pendingPosts, setPendingPosts] = useState(null);

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

      setPendingPosts(serverGetResponse.serverData.posts ?? null);
    },
    [serverGetResponse]
  );

  return (
    <div className="container p-0 SigninText">
      <div className="col d-flex justify-content-center align-items-center SignInText">
        <p>Posts waiting for your confirmation</p>
      </div>

      {null === pendingPosts && (
        <div className="row Spinner">
          <div className="col loadingDataContainer">
            <h4>Loading posts data...</h4>

            <HashLoader color="#358cc8" size={100} />
          </div>
        </div>
      )}

      {null !== pendingPosts &&
        pendingPosts.map((post) => <PostsCard post={post} />)}
    </div>
  );
};

export default PendingPosts;
