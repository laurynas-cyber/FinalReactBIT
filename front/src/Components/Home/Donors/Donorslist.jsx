import React, { useCallback, useEffect, useState } from "react";
import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../../Constants/urls";
import HashLoader from "react-spinners/HashLoader";
import { Search } from "../../UserSignAndLogin/Forms/Search";
import DonorsText from "./DonorsText";
import { FaHeart } from "react-icons/fa";
import NoPhoto from "../../Common/NoPhoto";
import DonorsPostCard from "./DonorsPostCard";
import DonorsListSearch from "./DonorsListSearch";

function Donorslist() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_GET_DONORS
  );

  const [users, setUsers] = useState(null);
  const [usersCopyList, setUsersCopyList] = useState([]);
  const [newPostData, setNewPostData] = useState([]);
  const [newPostDataCopy, setnewPostDataCopy] = useState(null);

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

  const handleNewPostData = useCallback(
    (_) => {
      const tempData = [];

      for (let i = 0; i < users?.length; i++) {
        let obj = {
          id: users[i].post_id,
          image: users[i].image,
          title: users[i].title,
          donated: users[i].donated,
          amount: users[i].amount,
        };

        let found = tempData.some((element) => element.id === obj.id);

        if (!found) {
          tempData.push(obj);
        }
      }

      setNewPostData(tempData);
      setnewPostDataCopy(tempData);
    },
    [users]
  );

  useEffect(
    (_) => {
      handleNewPostData();
    },
    [handleNewPostData, setnewPostDataCopy]
  );
  console.log(newPostDataCopy);

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

      <DonorsListSearch
        setUsers={setNewPostData}
        usersCopyList={newPostDataCopy}
        sortType={"sum"}
      />

      {users === null ? (
        <div className="row Spinner">
          <div className="col loadingDataContainer">
            <h4>Loading Donors</h4>

            <HashLoader color="#358cc8" size={100} />
          </div>
        </div>
      ) : (
        newPostData.map((p, i) => (
          <div key={i} className="UsersPostCardList p-0 container">
            <DonorsPostCard
              post={p}
              usersCopyList={usersCopyList}
              setUsers={setUsers}
              users={users}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Donorslist;
