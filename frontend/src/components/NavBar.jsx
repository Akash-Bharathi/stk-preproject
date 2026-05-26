import {
  Link
} from "react-router-dom";

function Navbar({
  darkMode,
  setDarkMode,
  handleLogout
}) {
const email =
  localStorage.getItem("email");

const username =
  email
    ? email.split("@")[0]
    : "User";

  return (

    <div className="top-bar">

      {/* LOGO */}
      <h1
        style={{
          color: "white",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        MOVIE APP
      </h1>

      {/* NAVIGATION */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
        
      >
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    marginRight: "1rem",
  }}
>

  {/* PROFILE IMAGE */}
  <img
    src="https://i.pravatar.cc/40"
    alt="profile"

    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />

  {/* USERNAME */}
  <p
    style={{
      color: "white",
      margin: 0,
      fontWeight: "bold",
    }}
  >
    Hello, {username}
  </p>

</div>  

        {/* HOME */}
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        {/* FAVORITES */}
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Favorites
        </Link>

        {/* THEME BUTTON */}
        <button
          className="theme-btn"
          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }
        >
          {darkMode
            ? "Light Mode"
            : "Dark Mode"}
        </button>

        {/* LOGOUT */}
        <button
          className="theme-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;