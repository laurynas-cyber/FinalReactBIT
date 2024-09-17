import React, { useContext } from "react";
import { ModalContext } from "../../Context/Modals";

function DonationPostBar({ post, index = 3, lastDonatedId }) {
  function DonatedBar(required, donated) {
    let result = (donated * 100) / required;
    return parseInt(result);
  }

  const { donateModal } = useContext(ModalContext);
  return (
    <div
      className="SliderPostDonationContainer"
      style={{ opacity: donateModal?.data.id === post.id || lastDonatedId === post.id ? 1 : null }}
    >
      {index % 3 === 0 && (
        <div className="donationLeft">
          {post.amount <= post.donated
            ? null
            : `Left ${post.amount - post.donated} eur to complete`}
        </div>
      )}

      <div className="dontaionInfo">
        <span
          className="Donated"
          style={{ fontSize: index % 3 !== 0 ? "15px" : null }}
        >
          Donated {post.donated} eur
        </span>

        <div className="donationBarContainer">
          <div
            className="donatedBar"
            style={{
              width: `${DonatedBar(post.amount, post.donated)}%`,

              backgroundColor:
                post.amount <= post.donated ? "#f08702" : "#3498db",
            }}
          ></div>
        </div>

        <span
          className="DonationRequired"
          style={{ fontSize: index % 3 !== 0 ? "15px" : null }}
        >
          <strong>Required {post.amount} eur </strong>
        </span>
      </div>
    </div>
  );
}

export default DonationPostBar;
