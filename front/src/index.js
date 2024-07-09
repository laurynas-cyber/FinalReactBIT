import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import SignIn from "./Components/UserSignAndLogin/SignIn.jsx";
import LogIn from "./Components/UserSignAndLogin/LogIn.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "/pageTwo",
    //     element: <Page2 />,
    //   },
    // ],
  },
  {
    path: "/pageOne",
    element: <Page1 />,
  },
  {
    path: "/pageTwo",
    element: <Page2 />,
  },
  {
    path: "/pageThree",
    element: <Page3 />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/LogIn",
    element: <LogIn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // react router

  <RouterProvider router={router} />
);

// https://docs.google.com/document/d/1_jCo5rDt0_GRURYuSJtG7scMvTsov_YLj9KW6bDWJVM/edit?usp=sharing
