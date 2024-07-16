import useServerGet from "../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import { useEffect, useState } from "react";

function UsersList() {
  const { doAction, serverResponse } = useServerGet(l.SERVER_GET_USERS);

  const [users, setUsers] = useState(null);

  useEffect(
    (_) => {
      doAction();
    },
    [doAction]
  );

  useEffect(
    (_) => {
      if (null === serverResponse) {
        return;
      }
      console.log(serverResponse);
      setUsers(serverResponse.serverData.users ?? null);
    },
    [serverResponse]
  );
  console.log(users);

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
              <>
                <div key={u.id} className="tableNames">
                  <div className="col tableReference userName">{u.name}</div>
                  <div className="col tableReference userEmail">{u.email}</div>
                  <div className="col tableReference userRole">{u.role}</div>
                  <div className="col tableReference Actions">
                    <div className="TableButtons border border-danger">
                      <button type="btn button">Edit</button>
                      <button type="btn button">Delete</button>
                    </div>
                  </div>
                </div>
                <div className="divideRow"></div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UsersList;
