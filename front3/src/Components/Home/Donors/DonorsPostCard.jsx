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
          <div className="DonorsListContainer">
            <div className="DonorsListBorders-left"></div>
            <div className="DonorsListScrollBar">
              <div className="DonorsListScrollBar-infoSection">
                <div className="DonorsListScrollBar-infoSection-name">Name</div>
                <div className="DonorsListScrollBar-infoSection-email">
                  Email
                </div>
                <div className="DonorsListScrollBar-infoSection-donation">
                  Donation Eur
                </div>
              </div>
              <div className="DonorsList-user">
                <div className="DonorsListScrollBar-infoSection-name DonorsList-user-divide ">
                  NAME
                </div>
                <div className="DonorsListScrollBar-infoSection-email DonorsList-user-divide">
                  EMAIL
                </div>
                <div className="DonorsListScrollBar-infoSection-donation DonorsList-user-divide">
                  DONATION
                </div>
              </div>
            </div>
            <div className="DonorsListBorders-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorsPostCard;
