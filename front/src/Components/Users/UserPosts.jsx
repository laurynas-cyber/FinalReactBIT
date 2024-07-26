import { Link } from "react-router-dom";
import Inputs from "../UserSignAndLogin/Forms/Inputs";
import { useContext } from "react";
import { AuthContext } from "../Context/Auth";
import Range from "../UserSignAndLogin/Forms/Range";
import Upload from "../UserSignAndLogin/Forms/Upload";
import Textarea from "../UserSignAndLogin/Forms/Textarea";

const UserPosts = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container p-0">
      <div className="col d-flex justify-content-center align-items-center SignInText">
        <p>Create post and get donations</p>
      </div>
      <form className="formCenter">
        <div className="container formContainer">
          <Inputs placeholder="Title" />
          <Textarea />
          <Range />
          <Upload />
          <button className="btn mainActionBtn" type="button">
            Create post
          </button>
          <Link className="btn SecondActionBtn" to={`/user/${user.id}`}>
            Back to menu
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserPosts;
