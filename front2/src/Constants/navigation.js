const LoginNav = [
  {
    tag: "Sign In",
    to: "SignIn",
    active: ({ isActive }) => {
      return isActive ? "UserTags ActiveTag" : "UserTags";
    },
  },
  {
    tag: "Log in",
    to: "LogIn",
    active: ({ isActive }) => {
      return isActive ? "UserTags ActiveTag" : "UserTags";
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
