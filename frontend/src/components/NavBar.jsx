import { useState } from "react";

import { Link } from "react-router-dom";

function Navbar({
  darkMode,
  setDarkMode,
  logout,
  userName,
  favoriteCount
}) {

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (

    <nav className="navbar">

      {/* LOGO */}
      <h1 className="logo">
        MOVIE APP
      </h1>

      {/* DESKTOP MENU */}
      <div className="nav-links desktop-menu">

        <Link to="/">
          Home
        </Link>

        <Link to="/favorites">
          Favorites ({favoriteCount})
        </Link>

        <button
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

        <button
          onClick={logout}
        >
          Logout
        </button>

        {/* USER */}
        <div className="user-box">

          <div className="avatar">
            {userName?.charAt(0)}
          </div>

          <span>
            Hello, {userName}
          </span>

        </div>

      </div>

      {/* MOBILE MENU BUTTON */}
      <button

        className="menu-btn"

        onClick={() =>
          setMenuOpen(
            !menuOpen
          )
        }
      >
        ☰
      </button>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (

        <div className="mobile-menu">

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <Link
            to="/favorites"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Favorites ({favoriteCount})
          </Link>

          <button
            onClick={() => {
              setDarkMode(
                !darkMode
              );

              setMenuOpen(false);
            }}
          >
            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </button>

          <button
            onClick={() => {
              logout();

              setMenuOpen(false);
            }}
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;