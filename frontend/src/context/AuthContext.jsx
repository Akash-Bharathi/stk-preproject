import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

const getStoredToken = () => {
  const t = localStorage.getItem("token");
  if (!t || t === "null" || t === "undefined") {
    return null;
  }
  return t;
};

export const AuthProvider = ({
  children
}) => {

  const [token, setToken] = useState(getStoredToken);

  const [isAuthenticated, setIsAuthenticated] =
    useState(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // LOGIN
  const login = (newToken) => {

    localStorage.setItem(
      "token",
      newToken
    );

    setToken(newToken);

    setIsAuthenticated(true);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setToken(null);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);