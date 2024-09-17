import React from "react";

function DonationPostBar({ post, donatedBar }) {
  function DonatedBar(required, donated) {
    let result = (donated * 100) / required;
    return parseInt(result);
  }

  return (
    <div className="SliderDonationContainer">
      <div className="donationLeft">
        {post.amount <= post.donated
          ? null
          : `Left ${post.amount - post.donated - donatedBar}eur to complete`}
      </div>
      <div className="dontaionInfo">
        <span className="Donated"> Donated {post.donated + donatedBar}eur</span>
        <div
          className="donationBarContainer"
          style={{ width: `${post.amount / 10}px` }}
        >
          <div
            className="donatedBar"
            style={{
              width: `${
                DonatedBar(post.amount, post.donated) +
                DonatedBar(post.amount, donatedBar)
              }%`,

              backgroundColor:
                post.amount <= post.donated + donatedBar
                  ? "#f08702"
                  : "#3498db",
            }}
          ></div>
        </div>
        <span className="DonationRequired">
          <strong>Required {post.amount}eur </strong>
        </span>
      </div>
    </div>
  );
}

export default DonationPostBar;
