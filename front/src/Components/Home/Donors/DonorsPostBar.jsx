import React from "react";

function DonorsPostBar({ post }) {
  function DonatedBar(required, donated) {
    let result = (donated * 100) / required;
    return parseInt(result);
  }
  return (
    <div
      className="DonorsPostCardBar"

    >


      <div className="DonorsPostCardBar-dontaionInfo">


        <div className="DonorsPostCardBar-donationBarContainer">
          <div
            className="DonorsPostCardBar-donatedBar"
            style={{
              width: `${DonatedBar(post.amount, post.donated)}%`,

              backgroundColor:
                post.amount <= post.donated ? "#f08702" : "#3498db",
            }}
          ></div>
        </div>

      
      </div>
    </div>
  );
}

export default DonorsPostBar;
