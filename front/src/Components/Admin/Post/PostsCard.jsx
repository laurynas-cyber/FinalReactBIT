import { useContext, useEffect } from "react";
import { ModalContext } from "../../Context/Modals";
import * as l from "../../../Constants/urls";
import { Link } from "react-router-dom";
import DeclineDot from "./DeclineDot";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import useServerPut from "../../Hooks/useServerPut";

const PostsCard = ({
  isAdmin = false,
  setPosts = null,
  post,
  hidePost,
  doDelete,
  onClick,
  mainBtnName = "Edit",
  setPendingPosts = null,
}) => {
  const { setDeleteModal } = useContext(ModalContext);
  const { setDeclineModal } = useContext(ModalContext);
  const { setBannerModal } = useContext(ModalContext);

  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_BANNER
  );

  const handleModal = (post) => {
    setDeclineModal(post);
  };

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      if ("success" === serverPutResponse.type) {
        setPosts((p) =>
          p.map((p) =>
            p.id === post.id ? { ...p, is_top: 1 } : { ...p, is_top: 0 }
          )
        );
      }
    },
    [serverPutResponse]
  );

  return (
    <div className="container p-0 postContainer">
      <div className="postTitle">
        <h5>Title</h5>
        <div className="titlePosts">
          <strong>{post.title}</strong>
        </div>
      </div>
      <div className="descriptCont">
        <h5>Description</h5>
        <div className="descript">{post.description}</div>
      </div>
      <div className="fundAmout">
        <h5>Fund Amount</h5>
        <div className="amount">{post.amount}$</div>
        {!!post.confirmed && (
          <>
            <h5>Donated</h5>
            <div
              className="amount"
              style={{ color: post.donated >= post.amount ? "#f08702" : null }}
            >
              {post.donated}$
            </div>
          </>
        )}
      </div>
      <div className="postPictureCont">
        <h5>Picture</h5>
        {post.image === null ? (
          <img
            alt="post.image"
            src={l.SERVER_IMAGES_URL + "no-image.png"}
            className="img-slider-img"
          />
        ) : (
          <img
            alt={post.image}
            src={l.SERVER_IMAGES_URL + post.image}
            className="img-slider-img"
          />
        )}
      </div>
      <div className="PostAuthorCont">
        <h5>{post.name ? "Fund Author" : "Status"}</h5>
        <div className="author">
          {post.name ? (
            <>
              <span>{post.name} </span> <span>{post.email}</span>
              {!!post.comment && <DeclineDot post={post} />}
            </>
          ) : !!post.confirmed ? (
            <span className="userConfirmed">
              {" "}
              <strong> Confirmed </strong>{" "}
            </span>
          ) : !!post.comment ? (
            <>
              <DeclineDot post={post} />
            </>
          ) : (
            <span>Not Confirmed yet</span>
          )}
        </div>
      </div>
      {!!post.confirmed && isAdmin && (
        <div className="PostAuthorCont">
          <h5 className="BannerPostName">Banner Post</h5>
          <div className="checkboxCont">
            <button className="img-slide-dot-btn PostCardBannerBtn">
              {post.is_top ? (
                <FaRegCircleDot aria-hidden />
              ) : (
                <FaRegCircle
                  aria-hidden
                  onClick={(_) => {
                    setBannerModal({
                      data: post,
                      doPut,
                    });
                  }}
                />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="PostButtons">
        <h5>Actions</h5>
        <div className="d-flex gap-2 PostCardBtnCont">
          {mainBtnName !== "Edit" ? (
            <button
              onClick={(_) => onClick(post)}
              className="btn mainActionBtn"
            >
              {mainBtnName}
            </button>
          ) : (
            <Link to={`${post.id}`} className="btn mainActionBtn">
              {mainBtnName}
            </Link>
          )}

          {isAdmin && (
            <button
              className="btn SecondActionBtn"
              disabled={post.comment ? true : null}
              onClick={(_) => handleModal(post)}
            >
              Decline
            </button>
          )}

          <button
            onClick={(_) => {
              setDeleteModal({
                data: post,
                name: post.title,
                doDelete,
                hideData: hidePost,
              });
            }}
            className="btn SecondActionBtn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
