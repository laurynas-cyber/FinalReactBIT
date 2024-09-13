import React, { useEffect, useState } from "react";
import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../../Constants/urls";
import HashLoader from "react-spinners/HashLoader";
import { Search } from "../../UserSignAndLogin/Forms/Search";
import DonorsText from "./DonorsText";
import { FaHeart } from "react-icons/fa";

function Donorslist() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_GET_DONORS
  );

  const [users, setUsers] = useState(null);
  const [usersCopyList, setUsersCopyList] = useState(null);

  useEffect(
    (_) => {
      doGet();
    },
    [doGet]
  );

  useEffect(
    (_) => {
      if (null === serverGetResponse) {
        return;
      }

      setUsers(serverGetResponse.serverData.users ?? null);
      setUsersCopyList(serverGetResponse.serverData.users ?? null);
    },
    [serverGetResponse]
  );

  return (
    <div className="container contentDown p-0">
      <div className="BannerDonorsText">
        <DonorsText usersCount={users?.length} isDonorsList={true} />
      </div>

      <div className="col d-flex justify-content-center align-items-center SignInText">
        <h3>
          Special thanks for these donors <FaHeart className="HeartIcon" />
        </h3>
      </div>

      <Search
        usersCopyList={usersCopyList}
        setUsers={setUsers}
        sortType={"sum"}
      />

      <div className="userTable">
        <div>
          <div className="tableNames">
            <div className="col tableReference userNam">
              <strong>Name </strong>
            </div>
            <div className="col tableReference userEmai">
              <strong>Email</strong>
            </div>
            <div className="col tableReference userRol">
              <strong>Donated</strong>
            </div>
            <div className="col tableReference Action">
              <strong>Post</strong>
            </div>
          </div>
          <div className="divideRow"></div>
        </div>

        {users === null ? (
          <div className="row Spinner">
            <div className="col loadingDataContainer">
              <h4>Loading Donors</h4>

              <HashLoader color="#358cc8" size={100} />
            </div>
          </div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="Table">
              <div className="tableNames">
                <div className="col tableReference userName">{u.name}</div>
                <div className="col tableReference userEmail">{u.email}</div>
                <div className="col tableReference userDonation">
                  {u.donation} eur
                </div>
                <div className="col tableReference Actions">
                  <div className="TablePost">
                    {u.title}
                    <div className="postPictureCont">
                      {u.image === null ? (
                        <img
                          alt={u.title}
                          src={l.SERVER_IMAGES_URL + "no-image.png"}
                          className="img-slider-img"
                        />
                      ) : (
                        <img
                          alt={u.image}
                          src={l.SERVER_IMAGES_URL + u.image}
                          className="img-slider-img"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="divideRow"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Donorslist;
