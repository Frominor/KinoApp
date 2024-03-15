import React from "react";
import "./FindedFilmsAndSerials.css";
type FindedFilmsAndSerialsProps = {
  SearchedFilms: {}[];
  IsOpenFindedFilmBox: boolean;
};
export const FindedFilmsAndSerials: React.FC<FindedFilmsAndSerialsProps> = ({
  SearchedFilms,
  IsOpenFindedFilmBox,
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
          SearchedFilms.map((item: any) => {
            console.log(item.overview.length);
            return (
              <div className="MoviesBoxItem">
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
              </div>
            );
          })}
      </div>
    </div>
  );
};
