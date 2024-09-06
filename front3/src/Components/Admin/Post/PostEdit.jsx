import { useContext, useEffect, useState, useRef } from "react";
import * as l from "../../../Constants/urls";
import useServerGet from "../../Hooks/useServerGet";
import useServerPut from "../../Hooks/useServerPut";
import Upload from "../../UserSignAndLogin/Forms/Upload";
import Textarea from "../../UserSignAndLogin/Forms/Textarea";
import Inputs from "../../UserSignAndLogin/Forms/Inputs";
import { LoaderContext } from "../../Context/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

export default function PostEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const { doAction: doGet, serverResponse: serverGetResponse } = useServerGet(
    l.SERVER_EDIT_POST
  );
  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_POST
  );
  const [post, setPost] = useState(null);
  const { setShow } = useContext(LoaderContext);

  useEffect(
    (_) => {
      doGet("/" + params.postId);
    },
    [doGet, params]
  );

  useEffect(
    (_) => {
      if (null === serverGetResponse) {
        return;
      }
      setPost(serverGetResponse.serverData.post ?? null);
    },
    [serverGetResponse]
  );

  useEffect(
    (_) => {
      if (null === serverPutResponse) {
        return;
      }
      if ("success" === serverPutResponse.type) {
        navigate(-1);
      }
    },
    [serverPutResponse]
  );

  const handleForm = (e) => {
    setPost((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = (_) => {
    //TODO: Validation
    setShow(true);
    console.log(post);
    doPut(post);
  };

  return (
    <div className="container p-0">
      <section>
        {null === post && (
          <div className="row Spinner">
            <div className="col loadingDataContainer">
              <h4>Loading post data...</h4>

              <HashLoader color="#358cc8" size={100} />
            </div>
          </div>
        )}
        {null !== post && (
          <>
            <div className="col d-flex justify-content-center align-items-center SignInText">
              <p>Post {post.title} edit</p>
            </div>
            <form className="formCenter">
              <div className="container formContainer">
                <Inputs
                  onChange={handleForm}
                  value={post.title}
                  type="text"
                  name="title"
                />
                <Textarea
                  placeholder={post.description}
                  onChange={handleForm}
                  type="text"
                  name="description"
                  value={post.description}
                />
                <Upload post={post} setPost={setPost} />
                <button
                  type="button"
                  onClick={submit}
                  value="Registruotis"
                  className="btn mainActionBtn"
                >
                  Edit
                </button>
                <Link
                  className="btn SecondActionBtn"
                  onClick={(_) => navigate(-1)}
                >
                  Back to menu
                </Link>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
