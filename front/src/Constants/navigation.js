const LoginNav = [
  {
    tag: "Admin",
    to: "dashbord",
    active: ({ isActive }) => {
      return isActive ? "UserTags ActiveTag" : "UserTags";
    },
  },
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
    tag: "PageTwo",
    to: "pageTwo",
    active: ({ isActive }) => {
      return isActive ? "Pages ActiveTag" : "Pages";
    },
  },
  {
    tag: "PageThree",
    to: "pageThree",
    active: ({ isActive }) => {
      return isActive ? "Pages ActiveTag" : "Pages";
    },
  },
];

export { LoginNav, RoutesNav };
