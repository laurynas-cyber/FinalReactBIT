const LoginNav = [
  {
    tag: "SIGN IN",
    to: "SignIn",
    active: ({ isActive }) => {
      return isActive ? "ActiveTag" : "RouterLinks";
    },
  },
  {
    tag: "LOG IN",
    to: "LogIn",
    active: ({ isActive }) => {
      return isActive ? "ActiveTag" : "RouterLinks";
    },
  },
];

const RoutesNav = [
  {
    tag: "Home",
    to: "/",
    active: ({ isActive }) => {
      return isActive ? "RouterLinks ActiveTag" : "RouterLinks";
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
