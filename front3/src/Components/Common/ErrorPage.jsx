import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid ErropageContainer">
      <div className="row ErrorPageCenter">
        <div className="erropageContaier ">
          <h2>Unexpected Application Error!</h2>
          <div className="container-fluid p-0 displayErrorMSg ErrorStatusBorder">
            <p>Page was not found</p>
            <span>Error status 404</span>
          </div>
          <div className="displayErrorMSg">
            <img src={logo} alt="" />
            <a href="#" onClick={() => navigate(-1)}>
              Go back
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
