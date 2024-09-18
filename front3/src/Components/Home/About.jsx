import React from "react";

export default function About() {
  return (
    <div className="container p-0 contentDown AboutContainer">
      {/* <div className="AboutItemsContainer">


    </div> */}
      <div className="EmailContacts">Email</div>
      <div className="SocialContainer">
        <div className="GitHubContacts">
          <span> GitHub </span> <span>laurynas-cyber </span>
        </div>
        <div className="LinkedInContacts">
          <span>LinkedIn </span> <span>Laurynas Stančiauskas </span>
        </div>
      </div>
    </div>
  );
}
