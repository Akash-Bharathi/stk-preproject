import { useState } from "react";
import toast from "react-hot-toast";
import {
  Link
} from "react-router-dom";import { login } from "../services/ombdapi";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const data = await login({
  email,
  password
});
localStorage.setItem(
  "email",
  email
);

onLoginSuccess(
  data.access_token
);
toast.success(
  "Login successful"
);
    } catch (loginError) {
      const message =
        loginError?.message ||
        loginError?.detail ||
        "Login failed";

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome back</h1>
          <p className="subtitle">
            Sign in to access your wishlist, saved favorites, and movie recommendations.
          </p>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="test@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="12345678"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* <p className="info-note">
          Use <strong>test@gmail.com</strong> and password <strong>12345678</strong>.
        </p> */}

        <p className="login-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;