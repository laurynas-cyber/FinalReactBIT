import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

function Auth({ children }) {
  const [user, setUser] = useState((_) => {
    const user = localStorage.getItem("recUser");
    return user ? JSON.parse(user) : null;
  });

  const addUser = useCallback((user) => {
    setUser(user);
    localStorage.setItem("recUser", JSON.stringify(user));
  }, []);

  const removeUser = useCallback((_) => {
    setUser(null);
    localStorage.removeItem("recUser");
  }, []);

  return (
    <AuthContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
