function DeclineDot({post}) {
  return (
    <>
      <strong className="DeclinedText">Declined</strong>
      <div className="DeclinedDot">
        <div className="DeclinedCommentSection">
          <strong className="adminComment">Admin Comment</strong>
          <p>{post.comment} </p>
        </div>
      </div>
    </>
  );
}

export default DeclineDot;
