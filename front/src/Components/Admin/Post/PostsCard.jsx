import imgUA from "../../../assets/slider/ukraine.jpg";

const PostsCard = ({ post }) => {
  return (
    <div
      className="container p-0 postContainer"
      style={{ filter: post.confirmed ? null : "opacity(0.5)" }}
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
        <div className="amount">{post.amount}</div>
      </div>
      <div className="postPictureCont">
        <h5>Picture</h5>
        <img src={imgUA} alt="img" className="postImage"></img>
      </div>
      <div className="PostAuthorCont">
        <h5>Fund Author</h5>
        <div className="author">{post.userID}</div>
      </div>
      <div className="PostButtons">
        <div className="d-flex gap-2">
          <button
            disabled={post.confirmed ? null : true}
            className="btn mainActionBtn"
          >
            Confirm
          </button>
          <button className="btn SecondActionBtn">Decline</button>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
