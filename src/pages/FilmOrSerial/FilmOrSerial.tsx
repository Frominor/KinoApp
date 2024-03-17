import React from "react";
import { useTypedSelector } from "../../store";
import "./FilmOrSerial.css";
export const FilmOrSerial: React.FC = () => {
  const State = useTypedSelector((state) => state.Films);
  console.log(State.FindedFilmOrSerial);
  return (
    <div className="FilmOrSerial">
      <div className="container">
        <div className="BackdropImageBox">
          <img
            className="BackdropImage"
            src={`https://image.tmdb.org/t/p/w500/${State.FindedFilmOrSerial[0]?.backdrop_path}`}
          ></img>
        </div>
        <div className="ImageAndOverview">
          <img
            className="ImageAndOverview_Image"
            src={`https://image.tmdb.org/t/p/w500/${State.FindedFilmOrSerial[0]?.poster_path}`}
          ></img>
          <div className="TitleAndOverview">
            <h3>{State.FindedFilmOrSerial[0]?.name}</h3>
            <p>{State.FindedFilmOrSerial[0]?.overview}</p>
          </div>
        </div>
        <div className="Cas"></div>
      </div>
    </div>
  );
};
