import React, { useCallback, useContext, useEffect, useState } from "react";
import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../../Constants/urls";
import HashLoader from "react-spinners/HashLoader";
import PostsCard from "./PostsCard";
import useServerDelete from "../../Hooks/useServerDelete";
import useServerPut from "../../Hooks/useServerPut";
import { LoaderContext } from "../../Context/Loader";

const PendingPosts = () => {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_PENDING_POSTS
  );

  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_POST
  );

  const { doAction: doDelete, serverResponse: serverDeleteResponse } =
    useServerDelete(l.SERVER_DELETE_POST);

  const [pendingPosts, setPendingPosts] = useState(null);

  const { setShow } = useContext(LoaderContext);

  const hidePost = (post) => {
    setPendingPosts((p) =>
      p.map((p) => (p.id === post.id ? { ...p, hidden: true } : p))
    );
  };

  const showPost = useCallback((_) => {
    setPendingPosts((p) =>
      p.map((p) => {
        delete p.hidden;
        return p;
      })
    );
  }, []);

  const removeHidden = useCallback((_) => {
    setPendingPosts((p) => p.filter((p) => !p.hidden));
  }, []);

  const submit = (post) => {
    //TODO: Validation
    setShow(true);
    hidePost(post);
    let copyPost = post;
    copyPost.confirmed = true;
    doPut(copyPost);
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

      setPendingPosts(serverGetResponse.serverData.posts ?? null);
    },
    [serverGetResponse]
  );

  useEffect(
    (_) => {
      if (null === serverDeleteResponse) {
        return;
      }
      if (serverDeleteResponse.type === "error") {
        showPost();
      } else {
        removeHidden();
      }
    },
    [serverDeleteResponse, showPost, removeHidden]
  );

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      if (serverPutResponse.type === "error") {
        showPost();
        console.log(" error");
      } else {
        removeHidden();
      }
    },
    [serverPutResponse, showPost, removeHidden]
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
        pendingPosts.map((post, index) =>
          post.hidden || post.confirmed ? null : (
            <PostsCard
              isAdmin={true}
              key={index}
              post={post}
              hidePost={hidePost}
              doDelete={doDelete}
              onClick={submit}
              mainBtnName={"Confirm"}
            />
          )
        )}
    </div>
  );
};

export default PendingPosts;
