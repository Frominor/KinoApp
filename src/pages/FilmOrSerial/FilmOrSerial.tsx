import React from "react";
import { useTypedSelector } from "../../store";
import "./FilmOrSerial.css";

import { MoviesList } from "../../components/MoviesList/MoviesList";

export const FilmOrSerial = () => {
  const State = useTypedSelector((state) => state.Films);
  return (
    <div className="FilmOrSerial">
      <div className="container">
        <div className="BackdropImageBox">
          <img
            className="BackdropImage"
            src={`https://image.tmdb.org/t/p/w500/${State.FindedFilmOrSerial[0]?.backdrop_path}`}
          ></img>
        </div>
        <div className="OtherContentBox">
          <div className="ImageAndOverview">
            <img
              className="ImageAndOverview_Image"
              src={`https://image.tmdb.org/t/p/w400/${State.FindedFilmOrSerial[0]?.poster_path}`}
            ></img>
            <div className="TitleAndOverview">
              <h3 className="NameOfTheMovie">
                {State.FindedFilmOrSerial[0]?.name}
              </h3>
              <p className="Ganre">
                {State.FindedFilmOrSerial[0]?.genres[0]?.name
                  .split("")[0]
                  .toUpperCase() +
                  State.FindedFilmOrSerial[0]?.genres[0]?.name
                    .split("")
                    .splice(1)
                    .join("")}
              </p>
              <p className="OverviewOfTheMovie">
                {State.FindedFilmOrSerial[0]?.overview}
              </p>
            </div>
          </div>
          <div className="Casts">
            <h2 className="Category">Casts</h2>
            <div
              className="CastsBox"
              style={{
                overflowX: State.Casts.length <= 5 ? "hidden" : "scroll",
              }}
            >
              {State.Casts.length > 0
                ? State.Casts.map(
                    (item: {
                      character: string;
                      original_name: string;
                      profile_path: string;
                    }) => {
                      return (
                        <div className="CastItem">
                          <img
                            loading="lazy"
                            className="CastImg"
                            style={{
                              borderRadius: 20 + "px",
                              minWidth: 300 + "px",
                            }}
                            src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                          />
                          <div className="Cast_Name">
                            <p>{item.character}</p>
                            <p>{item.original_name}</p>
                          </div>
                        </div>
                      );
                    }
                  )
                : Array.of(5).map((item) => {
                    return (
                      <div className="CastItem">
                        <div className="Cast_Back"></div>
                        <div className="Cast_Name">Name</div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="Trailer"></div>
          {State.FindedFilmOrSerial[0]?.seasons?.length > 0 ? (
            <div className="Seasons">
              <h2 className="Category">Seasons</h2>
              <div
                className="CastsBox"
                style={{
                  overflowX:
                    State.FindedFilmOrSerial[0]?.seasons?.length <= 6
                      ? "hidden"
                      : "scroll",
                }}
              >
                {State.FindedFilmOrSerial[0]?.seasons?.map(
                  (item: {
                    episode_count: number;
                    name: string;
                    id: number;
                    poster_path: string;
                  }) => {
                    return (
                      <div className="Season">
                        <img
                          loading="lazy"
                          className="SeasonImg"
                          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        ></img>
                        <p className="SeasonName">{item.name}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          <MoviesList
            CategoryName="Recomendations"
            RenderCategory={State.RecomendedMovies}
          ></MoviesList>
        </div>
      </div>
    </div>
  );
};
