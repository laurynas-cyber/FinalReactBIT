import useServerGet from "../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import { useEffect, useState, useContext, useCallback } from "react";
import useServerDelete from "../Hooks/useServerDelete";
import { ModalContext } from "../Context/Modals";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

function UsersList() {
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_GET_USERS
  );
  const { doAction: doDelete, serverResponse: serverDeleteResponse } =
    useServerDelete(l.SERVER_DELETE_USER);
  const { setDeleteModal } = useContext(ModalContext);
  const [users, setUsers] = useState(null);

  const hideUser = (user) => {
    setUsers((u) =>
      u.map((u) => (u.id === user.id ? { ...u, hidden: true } : u))
    );
  };

  const showUser = useCallback((_) => {
    setUsers((u) =>
      u.map((u) => {
        delete u.hidden;
        return u;
      })
    );
  }, []);

  const removeHidden = useCallback((_) => {
    setUsers((u) => u.filter((u) => !u.hidden));
  }, []);

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
    },
    [serverGetResponse]
  );

  useEffect(
    (_) => {
      if (null === serverDeleteResponse) {
        return;
      }
      if (serverDeleteResponse.type === "error") {
        showUser();
      } else {
        removeHidden();
      }
    },
    [serverDeleteResponse, showUser, removeHidden]
  );

  return (
    <>
      <div className="container p-0">
        <h2>UsersList</h2>
        {users === null && (
          <div className="row Spinner">
            <div className="col loadingDataContainer">
              <h4>Loading list...</h4>

              <HashLoader color="#358cc8" size={100} />
            </div>
          </div>
        )}
        {users !== null && (
          <div className="userTable">
            <div className="tableNames">
              <div className="col tableReference userNam">
                <strong>Name </strong>
              </div>
              <div className="col tableReference userEmai">
                <strong>Email</strong>
              </div>
              <div className="col tableReference userRol">
                <strong>Role</strong>
              </div>
              <div className="col tableReference Action">
                <strong>Actions</strong>
              </div>
            </div>
            <div className="divideRow"></div>
            {users.map((u) =>
              u.hidden ? null : (
                <div key={u.id}>
                  <div className="tableNames">
                    <div className="col tableReference userName">{u.name}</div>
                    <div className="col tableReference userEmail">
                      {u.email}
                    </div>
                    <div className="col tableReference userRole">{u.role}</div>
                    <div className="col tableReference Actions">
                      <div className="TableButtons">
                        <Link
                          to={`/dashbord/userlist/${u.id}`}
                          className="btn SecondActionBtn"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-primary mainActionBtn"
                          onClick={(_) =>
                            setDeleteModal({
                              data: u,
                              name: u.name,
                              doDelete,
                              hideData: hideUser,
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="divideRow"></div>
                </div>
              )
            )}
          </div>
        )}

        {/* <div>Viso vartototojų: {users.filter((u) => !u.hidden).length}</div> */}
      </div>
    </>
  );
}

export default UsersList;
