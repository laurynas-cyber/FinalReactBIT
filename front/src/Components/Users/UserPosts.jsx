import { Link } from "react-router-dom";
import Inputs from "../UserSignAndLogin/Forms/Inputs";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/Auth";
import Range from "../UserSignAndLogin/Forms/Range";
import Upload from "../UserSignAndLogin/Forms/Upload";
import Textarea from "../UserSignAndLogin/Forms/Textarea";

const UserPosts = () => {
  const values = {
    title: "",
    description: "",
    range: "1",
  };

  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(values);

  const handleForm = (e) => {
    setPost((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container p-0">
      <div className="col d-flex justify-content-center align-items-center SignInText">
        <p>Create post and get donations</p>
      </div>
      <form className="formCenter">
        <div className="container formContainer">
          <Inputs
            placeholder="Title"
            onChange={handleForm}
            type="text"
            name="title"
            value={post.title}
          />
          <Textarea
            placeholder="Write post description"
            onChange={handleForm}
            type="text"
            name="description"
            value={post.description}
          />
          <Range onChange={handleForm} name="range" value={post.range} />
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
