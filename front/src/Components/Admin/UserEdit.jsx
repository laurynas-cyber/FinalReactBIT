import { useParams } from "react-router-dom";

function UserEdit() {
  const params = useParams();

  console.log(params);
  return <div>UserEdit id {params.id}</div>;
}

export default UserEdit;
