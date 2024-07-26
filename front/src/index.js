import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import SignIn from "./Components/UserSignAndLogin/SignIn.jsx";
import LogIn from "./Components/UserSignAndLogin/LogIn.jsx";
import ErrorPage from "./Components/Common/ErrorPage.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
import UsersList from "./Components/Admin/UsersList.jsx";
import Home from "./Components/Home.jsx";
import Dashbord from "./Components/Admin/Dashbord.jsx";
import UserEdit from "./Components/Admin/UserEdit.jsx";
import NavResponsive from "./Components/Context/NavContext.jsx";
import Modals from "./Components/Context/Modals.jsx";
import Messages from "./Components/Context/Messages.jsx";
import Loader from "./Components/Context/Loader.jsx";
import Auth from "./Components/Context/Auth.jsx";
import RouteGate from "./Components/Common/RouteGate.jsx";
import UserLayout from "./Components/Users/UserLayout.jsx";
import HelloUser from "./Components/Users/HelloUser.jsx";
import ProfileEdit from "./Components/Users/ProfileEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "pageTwo",
        element: <Page2 />,
      },
      {
        path: "pageThree",
        element: <Page3 />,
      },
      {
        path: "SignIn",
        element: <SignIn />,
      },
      {
        path: "LogIn",
        element: <LogIn />,
      },
    ],
  },

  {
    path: "/dashbord",
    element: [
      <RouteGate key={1} role={["admin"]}>
        <AdminLayout />
      </RouteGate>,
    ],

    children: [
      {
        index: true,
        element: [
          <RouteGate key={2} role={["admin"]}>
            <Dashbord />
          </RouteGate>,
        ],
      },
      {
        path: "userlist",
        element: [
          <RouteGate key={3} role={["admin"]}>
            <UsersList />
          </RouteGate>,
        ],
      },
      {
        path: "userlist/:id",
        element: [
          <RouteGate key={4} role={["admin"]}>
            <UserEdit />
          </RouteGate>,
        ],
      },
    ],
  },
  {
    path: "/user/:username",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: [<HelloUser key={1} />],
      },
      {
        path: "edit/:id",
        element: [<ProfileEdit />],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth>
    <Messages>
      <Loader>
        <Modals>
          <NavResponsive>
            <RouterProvider router={router} />
          </NavResponsive>
        </Modals>
      </Loader>
    </Messages>
  </Auth>
);

// https://docs.google.com/document/d/1_jCo5rDt0_GRURYuSJtG7scMvTsov_YLj9KW6bDWJVM/edit?usp=sharing
