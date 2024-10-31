import React from "react";

const DonationBannerBar = ({ post }) => {
  function DonatedBar(required, donated) {
    let result = (donated * 100) / required;
    return parseInt(result);
  }
  return (
    <div className="SliderDonationContainer">
      <div className="donationLeft">
        {post[0].amount <= post[0].donated
          ? null
          : `Left ${
              post[0].amount - post[0].donated 
            }eur to complete`}
      </div>
      <div className="dontaionInfo">
        <span className="Donated">
          {" "}
          Donated {post[0].donated}eur
        </span>
        <div
          className="donationBarContainer"
          style={{ width: `${post[0].amount / 10}px` }}
        >
          <div
            className="donatedBar"
            style={{
              width: `${
                DonatedBar(post[0].amount, post[0].donated) 
              }%`,

              backgroundColor:
                post[0].amount <= post[0].donated 
                  ? "#f08702"
                  : "#3498db",
            }}
          ></div>
        </div>
        <span className="DonationRequired">
          <strong>Required {post[0].amount}eur </strong>
        </span>
      </div>
    </div>
  );
};

export default DonationBannerBar;
