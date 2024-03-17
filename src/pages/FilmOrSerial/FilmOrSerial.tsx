import React from "react";
import { useTypedSelector } from "../../store";
import "./FilmOrSerial.css";

export const FilmOrSerial = () => {
  const State = useTypedSelector((state) => state.Films);
  return (
    <div className="FilmOrSerial">
      <div className="container" style={{ width: 1400 + "px" }}>
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
              src={`https://image.tmdb.org/t/p/w500/${State.FindedFilmOrSerial[0]?.poster_path}`}
            ></img>
            <div className="TitleAndOverview">
              <h3 className="NameOfTheMovie">
                {State.FindedFilmOrSerial[0]?.name}
              </h3>
              <p className="Ganre">
                {State.FindedFilmOrSerial[0]?.genres[0]?.name}
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
                overflowX: State.Casts.length <= 4 ? "hidden" : "scroll",
              }}
            >
              {State.Casts.length > 0
                ? State.Casts.map((item) => {
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
                  })
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
          <div className="Seasons">
            <h2 className="Category">Seasons</h2>
            <div className="CastsBox">
              {State.FindedFilmOrSerial &&
                State.FindedFilmOrSerial[0]?.seasons.map(
                  (item: {
                    episode_count: number;
                    name: string;
                    id: number;
                    poster_path: string;
                  }) => {
                    return (
                      <div className="Season">
                        <img
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
        </div>
      </div>
    </div>
  );
};
