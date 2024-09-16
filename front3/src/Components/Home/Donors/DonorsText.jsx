import React, { useRef } from "react";

function DonorsText({ usersCount, isDonorsList = false }) {
  const Text = useRef(`JOIN OVER ${usersCount} SUPPORTERS `);

  const Text2 = useRef(`HELPING CHILDREN`);

  const Text3 = useRef(`GET THE FUTURE THEY DESERVE`);

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
          <span>{Text2.current} </span>
        </div>
        <div className="banner-container">
          <span>{Text3.current} </span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="banner-container">
        {Text.current.split("").map((letter, index) => (
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
        {Text2.current.split("").map((letter, index) => (
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
        {Text3.current.split("").map((letter, index) => (
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
