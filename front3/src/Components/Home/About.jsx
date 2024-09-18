import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import linkedin from "../../assets/images/linkedin.png";
import github from "../../assets/images/github.png";
import { useState } from "react";

export default function About() {
  const [moveGithub, setMoveGithub] = useState(null);
  const [moveLinkedIn, setLinkedIn] = useState(null);

  console.log(moveGithub);
  return (
    <div className="container p-0 contentDown AboutContainer">
      <div className="EmailContacts">Email</div>
      <div className="SocialContainer">
        <div
          className="GitHubContacts "
          onClick={(_) => setMoveGithub((prev) => !prev)}
          style={{ left: moveGithub ? "-300px" : null }}
        >
          <span> GitHub </span> <span>laurynas-cyber </span>
          <span>
            {moveGithub ? (
              <IoIosArrowForward className="AboutArrows" />
            ) : (
              <IoIosArrowBack className="AboutArrows" />
            )}
          </span>
        </div>
        <div
          className="SocialImgContainer GitHubQR"
          style={{ borderRadius: moveGithub ? "0 0 0 0" : "100px 0 0 100px" }}
        >
          <img src={github} alt="github" />
        </div>
        <div
          className="SocialImgContainer LinkedInQR"
          style={{
            borderRadius: moveLinkedIn ? "0 0 0 0" : " 0 100px 100px 0 ",
          }}
        >
          <img src={linkedin} alt="linkedin" />
        </div>
        <div
          className="LinkedInContacts"
          onClick={(_) => setLinkedIn((prev) => !prev)}
          style={{ right: moveLinkedIn ? "-300px" : null }}
        >
          <span>LinkedIn </span> <span>Laurynas Stančiauskas </span>
          <span>
            {moveLinkedIn ? (
              <IoIosArrowBack className="AboutArrows" />
            ) : (
              <IoIosArrowForward className="AboutArrows" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
