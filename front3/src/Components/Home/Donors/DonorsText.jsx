import React, { useState } from "react";

function DonorsText({ usersCount, isDonorsList = false }) {
  const [text, setText] = useState(`JOIN OVER ${usersCount} SUPPORTERS `);

  const [text2, setText2] = useState(`HELPING CHILDREN`);

  const [text3, setText3] = useState(`GET THE FUTURE THEY DESERVE`);

  if (!!isDonorsList) {
    return (
      <>
        <div className="banner-container">
          <span>JOIN OVER</span>
          <div className="space">
            {usersCount
              ? usersCount
                  .toString()
                  .split("")
                  .map((letter, index) => (
                    <span
                      key={index}
                      className="letter"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {letter === " " ? "\u00A0" : letter}{" "}
                      {/* Preserves space */}
                    </span>
                  ))
              : "   "}{" "}
          </div>
          <span>SUPPORTERS</span>
        </div>
        <div className="banner-container">
          <span>{text2} </span>
        </div>
        <div className="banner-container">
          <span>{text3} </span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="banner-container">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter === " " ? "\u00A0" : letter} {/* Preserves space */}
          </span>
        ))}
      </div>
      <div className="banner-container">
        {text2.split("").map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter === " " ? "\u00A0" : letter} {/* Preserves space */}
          </span>
        ))}
      </div>
      <div className="banner-container">
        {text3.split("").map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter === " " ? "\u00A0" : letter} {/* Preserves space */}
          </span>
        ))}
      </div>
    </>
  );
}

export default DonorsText;
