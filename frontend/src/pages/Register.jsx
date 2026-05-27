import { useState } from "react";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  register
} from "../services/ombdapi";

function Register() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

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

  // REGISTER
  const handleRegister = async () => {

    setError("");

    setSuccess("");

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

    try {

      setIsLoading(true);

      await register({
        email,
        password
      });

      setSuccess(
        "Registration successful"
      );
      toast.success(
        "Registration successful"
      );

      // Redirect to login after 1 second
      setTimeout(() => {

        navigate("/login");

      }, 1000);

    } catch (registerError) {

      const message =
        registerError.message ||
        "Registration failed";

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

          <h1>Create Account</h1>

          <p className="subtitle">
            Register to save your
            favorite movies and
            watchlist.
          </p>

        </div>

        {/* EMAIL */}
        <div className="input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
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

        {/* PASSWORD */}
        <div className="input-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
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

        {/* ERROR */}
        {error && (

          <p className="error-msg">

            {error}

          </p>
        )}

        {/* SUCCESS */}
        {success && (

          <p
            style={{
              color: "lightgreen"
            }}
          >
            {success}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={isLoading}
        >

          {isLoading
            ? "Registering..."
            : "Register"}

        </button>

        {/* LOGIN LINK */}
        <p
          className="login-footer"
        >

          Already have an account?{" "}

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;