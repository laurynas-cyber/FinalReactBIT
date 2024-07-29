import { Link, useNavigate, useParams } from "react-router-dom";
import Inputs from "../UserSignAndLogin/Forms/Inputs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Auth";
import Range from "../UserSignAndLogin/Forms/Range";
import Upload from "../UserSignAndLogin/Forms/Upload";
import Textarea from "../UserSignAndLogin/Forms/Textarea";
import { LoaderContext } from "../Context/Loader";
import useServerPost from "../Hooks/useServerPost";
import * as l from "../../Constants/urls";

const UserPosts = () => {
  const values = {
    title: "",
    description: "",
    amount: "1",
    image: null,
  };

  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(values);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { setShow } = useContext(LoaderContext);

  const { doAction, serverResponse } = useServerPost(l.SERVER_POST);

  const handleForm = (e) => {
    setPost((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  function handleSubmit() {
    //TODO VALIDATE
    // if (!validate(form)) {
    //   return;
    // }
    setShow(true);
    setButtonDisabled(true);
    console.log(post);
    doAction({
      title: post.title,
      description: post.description,
      amount: post.amount + "000",
      image: post.image,
      userID: user.id,
    });
  }

  useEffect(
    (_) => {
      if (null === serverResponse) {
        return;
      }

      setButtonDisabled(false);
      if (serverResponse.type === "success") {
        navigate(`/user/${params.id}`);
      }
    },
    [serverResponse, navigate]
  );

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

          <Range onChange={handleForm} value={post.amount} />

          <Upload post={post} setPost={setPost} />
          <button
            disabled={buttonDisabled}
            type="button"
            onClick={handleSubmit}
            value="Registruotis"
            className="btn mainActionBtn"
          >
            Submit
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
