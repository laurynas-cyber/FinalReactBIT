import useServerGet from "../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import { useEffect, useState, useContext } from "react";
import useServerDelete from "../Hooks/useServerDelete";
import { ModalContext } from "../Context/Modals";

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

      console.log(serverDeleteResponse);
      // setUsers(serverDeleteResponse.serverData.users ?? null)
    },
    [serverDeleteResponse]
  );

  return (
    <>
      <div className="container p-0">
        <h2>UsersList</h2>
        {users === null && <h2>Palaukite,siunčiame vartotojų sąrašą</h2>}
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
            {users.map((u) => (
              <div key={u.id}>
                <div className="tableNames">
                  <div className="col tableReference userName">{u.name}</div>
                  <div className="col tableReference userEmail">{u.email}</div>
                  <div className="col tableReference userRole">{u.role}</div>
                  <div className="col tableReference Actions">
                    <div className="TableButtons">
                      <button type="button" className="btn SecondActionBtn">
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mainActionBtn"
                        onClick={(_) =>
                          setDeleteModal({
                            data: u,
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
            ))}
          </div>
        )}

        {/* <div>Viso vartototojų: {users.filter((u) => !u.hidden).length}</div> */}
      </div>
    </>
  );
}

export default UsersList;
