import kids from "../../../assets/images/banner.jpg";
import { Search } from "../../UserSignAndLogin/Forms/Search";

function DonorsPostCard() {
  return (
    <div className="DonorsPostCard p-0 container">
      <div className="DonorsPostCard-InfoSection">
        <div className="DonorsPostCardTitle">Ukraine</div>
        <div className="DonorsPostCardUsers">Donors</div>
      </div>
      <div className="DonorsPostCard-ContentContainer">
        <div className="ContentContainer-ImageBox">
          <img src={kids}></img>
        </div>
        <div className="DonorsPostCard-UsersListContainer">
          <div className="UsersListContainer-SearchSection">Search</div>
        </div>
      </div>
    </div>
  );
}

export default DonorsPostCard;
