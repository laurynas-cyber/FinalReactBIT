import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; //react router
import "./index.css"; //react router
import Root from "./routes/root"; //react router
import ErrorPage from "./error-page"; //react router
import Contact from "./routes/contact"; //react router

// https://reactrouter.com/en/main/start/tutorial

const router = createBrowserRouter([
  //react router
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

root.render(
  // react router

  <RouterProvider router={router} />
);
