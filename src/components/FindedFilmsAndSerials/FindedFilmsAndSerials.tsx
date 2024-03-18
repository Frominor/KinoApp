import React from "react";
import "./FindedFilmsAndSerials.css";
import { Link, NavLink } from "react-router-dom";

type FindedFilmsAndSerialsProps = {
  SearchedFilms: {}[];
  IsOpenFindedFilmBox: boolean;
  SetIsOpenFindedFilmBox: (arg: boolean) => void;
  SetValue: (arg: string) => void;
};
export const FindedFilmsAndSerials: React.FC<FindedFilmsAndSerialsProps> = ({
  SearchedFilms,
  IsOpenFindedFilmBox,
  SetIsOpenFindedFilmBox,
  SetValue,
}) => {
  return (
    <div
      className="FindedFilmsAndSerials"
      style={{
        overflowY: SearchedFilms.length >= 5 ? "scroll" : "hidden",
        display: IsOpenFindedFilmBox ? "block" : "none",
      }}
    >
      <div className="MoviesBox">
        {SearchedFilms &&
          SearchedFilms.map((item: any, index: number) => {
            return (
              <NavLink
                onClick={() => {
                  window.localStorage.removeItem("movieinfo");
                  window.localStorage.removeItem("media_type");
                  window.localStorage.setItem("media_type", item.media_type);
                  window.localStorage.setItem("movieinfo", `${item.id}`);
                  SetIsOpenFindedFilmBox(false);
                  SetValue("");
                }}
                to={`/films/:${item.id}`}
                className="MoviesBoxItem"
              >
                <img
                  className="FindedMovieImg"
                  src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                ></img>
                <div className="SearcheItemTitleAndOverviewBox">
                  <p className="SearchedItemTitle">{item.title}</p>
                  <p className="SearchedItemOverview">
                    {item.overview.length > 300
                      ? item.overview.split(".")[0] + "."
                      : item.overview}
                  </p>
                </div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};
