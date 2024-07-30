import { useContext } from "react";
import { ModalContext } from "../../Context/Modals";

const PostsCard = ({ post, hidePost, doDelete, onClick }) => {
  const { setDeleteModal } = useContext(ModalContext);

  return (
    <div
      className="container p-0 postContainer"
      // style={{ filter: post.confirmed ? "opacity(0.5)" : null }}
    >
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
      </div>
      <div className="postPictureCont">
        <h5>Picture</h5>
        <img src={post.image} alt="img" className="postImage"></img>
      </div>
      <div className="PostAuthorCont">
        <h5>Fund Author</h5>
        <div className="author">
          <span>{post.name} </span> <span>{post.email}</span>
        </div>
      </div>
      <div className="PostButtons">
        <div className="d-flex gap-2">
          <button
            onClick={(_) => onClick(post)}
            // disabled={post.confirmed ? true : null}
            className="btn mainActionBtn"
          >
            Confirm
          </button>
          <button
            onClick={(_) =>
              setDeleteModal({
                data: post,
                name: post.title,
                doDelete,
                hideData: hidePost,
              })
            }
            className="btn SecondActionBtn"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
