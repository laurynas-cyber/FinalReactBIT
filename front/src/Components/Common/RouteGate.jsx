import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";

export default function RouteGate({ children, role = [] }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [child, setChild] = useState(null);

  useEffect(
    (_) => {
      if (user && role.includes(user.role)) {
        setChild(children);
      } else {
        navigate(-1);
      }
    },
    [navigate, setChild, children, role, user]
  );

  return child;
}
