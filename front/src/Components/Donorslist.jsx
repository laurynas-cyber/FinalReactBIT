import React, { useEffect, useState } from "react";
import useServerGet from "./Hooks/useServerGet";
import * as l from "../Constants/urls";
import HashLoader from "react-spinners/HashLoader";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

function Donorslist() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_GET_DONORS
  );

  const [users, setUsers] = useState(null);
  const [sortedUp, setSortedUp] = useState(null);
  const [sortedNameUp, setSortedNameUp] = useState(null);

  useEffect(
    (_) => {
      doGet();
      console.log(!null);
    },
    [doGet]
  );

  useEffect(
    (_) => {
      if (null === serverGetResponse) {
        return;
      }

      setUsers(serverGetResponse.serverData.users ?? null);
    },
    [serverGetResponse]
  );

  const NameSort = (e) => {
    setUsers((u) => {
      if (sortedNameUp) {
        return u.toSorted((a, b) => b.name.localeCompare(a.name));
      } else {
        return u.toSorted((a, b) => a.name.localeCompare(b.name));
      }
    });

    setSortedNameUp((prev) => !prev);
  };

  const DonateSort = () => {
    setUsers((u) => {
      if (sortedUp) {
        return u.toSorted((a, b) => a.donation - b.donation);
      } else {
        return u.toSorted((a, b) => b.donation - a.donation);
      }
    });

    setSortedUp((prev) => !prev);
  };

  return (
    <div className="container p-0">
      <div className="col d-flex justify-content-center align-items-center SignInText">
        <h3>Special thanks for these donors</h3>
      </div>
      <div className="FilterBlock">
        <div>Filter</div>
        <div className="sortblock">
          <span>Sort</span>
          <button className="btn mainActionBtn" onClick={NameSort}>
            by name{" "}
            {sortedNameUp === null ? null : sortedNameUp ? (
              <FaLongArrowAltUp className="DonateArrows" />
            ) : (
              <FaLongArrowAltDown className="DonateArrows" />
            )}
          </button>
          <button className="btn mainActionBtn" onClick={DonateSort}>
            by Donated sum{" "}
            {sortedUp === null ? null : sortedUp ? (
              <FaLongArrowAltUp className="DonateArrows" />
            ) : (
              <FaLongArrowAltDown className="DonateArrows" />
            )}
          </button>
        </div>
      </div>

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
            <div key={u.id}>
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
                          alt="no photo"
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
