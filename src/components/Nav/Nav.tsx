import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
export const Nav: React.FC = ({}) => {
  const [Active, SetActive] = React.useState(window.location.pathname);
  return (
    <div className="Nav">
      <h1 className="MainPageLink Link">
        <Link
          to={"/"}
          onClick={() => {
            SetActive("/");
          }}
          className={Active == "/" ? "active" : "notactive"}
        >
          Filmia
        </Link>
      </h1>
      <h1 className="Link">
        <Link
          onClick={() => {
            SetActive("/movies");
          }}
          to={"/films"}
          className={Active == "/movies" ? "active" : "notactive"}
        >
          Films
        </Link>
      </h1>
      <h1 className="Link">
        <Link
          onClick={() => {
            SetActive("/tv");
          }}
          to={"/tv"}
          className={Active == "/tv" ? "active" : "notactive"}
        >
          TV
        </Link>
      </h1>
    </div>
  );
};
