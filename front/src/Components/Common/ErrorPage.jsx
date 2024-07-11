import logo from "../../assets/images/logo.png";

function ErrorPage() {
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
            <a href="/">Go back home</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
