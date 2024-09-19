import kids from "../../../assets/images/banner.jpg";
import { Search } from "../../UserSignAndLogin/Forms/Search";
import * as l from "../../../Constants/urls";

function DonorsPostCard({ post, users }) {
  return (
    <div className="DonorsPostCard p-0 container">
      <div className="DonorsPostCard-InfoSection">
        <div className="DonorsPostCardTitle">{post.title}</div>
        <div className="DonorsPostCardUsers">Donors</div>
      </div>
      <div className="DonorsPostCard-ContentContainer">
        <div className="ContentContainer-ImageBox">
          <img src={l.SERVER_IMAGES_URL + post.image}></img>
        </div>
        <div className="DonorsPostCard-UsersListContainer">
          <div className="UsersListContainer-SearchSection">
            {post.amount <= post.donated ? (
              <strong className="UserListMarkedFinish">
                {" "}
                Required {post.amount} eur
              </strong>
            ) : (
              <div> Required {post.amount} eur</div>
            )}
            {/* <div
              style={{
                color: post.amount <= post.donated ? "#3498db" : null,
                fontWeight: post.amount <= post.donated ? "1500" : null,
              }}
            ></div> */}
            <strong className="UserListMarked">
              Donted {post.donated} eur{" "}
            </strong>
          </div>
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
              {users &&
                users.map((u) =>
                  u.post_id === post.id ? (
                    <div key={u.id} className="DonorsList-user">
                      <div className="DonorsListScrollBar-infoSection-name DonorsList-user-divide ">
                        {u.name}
                      </div>
                      <div className="DonorsListScrollBar-infoSection-email DonorsList-user-divide">
                        {u.email}
                      </div>
                      <div className="DonorsListScrollBar-infoSection-donation DonorsList-user-divide">
                        {u.donation}
                      </div>
                    </div>
                  ) : null
                )}
            </div>
            <div className="DonorsListBorders-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorsPostCard;
