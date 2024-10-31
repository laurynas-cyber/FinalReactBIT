import React, { useContext } from "react";
import { AuthContext } from "../Context/Auth";

const HelloUser = () => {
  const { user } = useContext(AuthContext);

  console.log(user.id);

  return (
    <div className="container p-0">
      <h2>Hello user {user.name} </h2>
    </div>
  );
};

export default HelloUser;
