const LoginNav = [
  {
    tag: "SIGN IN",
    to: "SignIn",
    active: ({ isActive }) => {
      return isActive ? "RouterLogLinks ActiveTag" : "RouterLogLinks";
    },
  },
  {
    tag: "LOG IN",
    to: "LogIn",
    active: ({ isActive }) => {
      return isActive ? "RouterLogLinks ActiveTag" : "RouterLogLinks";
    },
  },
];

const RoutesNav = [
  {
    tag: "Home",
    to: "/",
    active: ({ isActive }) => {
      return isActive ? "Pages ActiveTag" : "Pages";
    },
  },
  {
    tag: "Donors list",
    to: "donors",
    active: ({ isActive }) => {
      return isActive ? "Pages ActiveTag" : "Pages";
    },
  },
];

export { LoginNav, RoutesNav };
