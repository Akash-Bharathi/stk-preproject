import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children
}) => {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [isAuthenticated, setIsAuthenticated] =
    useState(!!token);

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