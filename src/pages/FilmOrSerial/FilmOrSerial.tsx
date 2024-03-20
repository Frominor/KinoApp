import React from "react";
import { useAppDispatch, useTypedSelector } from "../../store";
import "./FilmOrSerial.css";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import { CastItem } from "./CastItem/CastItem";
import { ItemSkeleton } from "../../components/ItemSkeleton/ItemSkeleton";

export const FilmOrSerial = () => {
  const State = useTypedSelector((state) => state.Films);
  const dispatch = useAppDispatch();

  return (
    <div className="FilmOrSerial">
      <div className="container">
        <div className="BackdropImageBox">
          <img
            className="BackdropImage"
            src={`https://image.tmdb.org/t/p/original/${State.FindedFilmOrSerial[0]?.backdrop_path}`}
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
                overflowX: State.Casts.length <= 4 ? "hidden" : "scroll",
              }}
            >
              {!State.isLoading
                ? State.Casts.length > 0
                  ? State.Casts.map(
                      (
                        item: {
                          character: string;
                          original_name: string;
                          profile_path: string;
                        },
                        index
                      ) => {
                        return (
                          <CastItem
                            character={item.character}
                            original_name={item.original_name}
                            profile_path={item.profile_path}
                            key={index}
                          ></CastItem>
                        );
                      }
                    )
                  : ""
                : Array(8)
                    .fill(0)
                    .map((item) => {
                      return (
                        <ItemSkeleton
                          additionalLine={true}
                          imgheight={450}
                          imgwidth={300}
                        ></ItemSkeleton>
                      );
                    })}
            </div>
          </div>
          <div className="Trailer"></div>
          {!State.isLoading ? (
            State.FindedFilmOrSerial[0]?.seasons?.length > 0 ? (
              <div>
                <h2 className="Category">Seasons</h2>
                <div className="Seasons">
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
              </div>
            ) : (
              ""
            )
          ) : (
            <div>
              <h2 className="Category">Seasons</h2>
              <div className="Seasons">
                {Array(7)
                  .fill(0)
                  .map((item) => {
                    return (
                      <ItemSkeleton
                        additionalLine={false}
                        imgheight={300}
                        imgwidth={200}
                      ></ItemSkeleton>
                    );
                  })}
              </div>
            </div>
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
