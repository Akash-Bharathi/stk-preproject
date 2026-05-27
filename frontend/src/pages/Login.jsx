import { useState } from "react";
import toast from "react-hot-toast";
import {
  Link
} from "react-router-dom";
import { login } from "../services/ombdapi";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(value)) {
      return "Enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    }
    if (!passwordRegex.test(value)) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleLogin = async () => {
    setError("");
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) {
      if (emailValidation) {
        toast.error(emailValidation);
      }
      if (passwordValidation) {
        toast.error(passwordValidation);
      }
      return;
    }

    setIsLoading(true);

    try {
      const data = await login({
        email,
        password
      });

      localStorage.setItem(
        "token",
        data.access_token
      );

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
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) {
                setEmailError(validateEmail(e.target.value));
              }
            }}
            onBlur={() => setEmailError(validateEmail(email))}
          />
          {emailError && <p className="error-msg">{emailError}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="12345678"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) {
                setPasswordError(validatePassword(e.target.value));
              }
            }}
            onBlur={() => setPasswordError(validatePassword(password))}
          />
          {passwordError && <p className="error-msg">{passwordError}</p>}
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