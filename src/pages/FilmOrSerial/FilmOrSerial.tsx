import React from "react";
import { useTypedSelector } from "../../store";
import "./FilmOrSerial.css";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import { ItemSkeleton } from "../../components/ItemSkeleton/ItemSkeleton";
import { ImageAndOverview } from "./ImageAndOverview/ImageAndOverviev";
import { Casts } from "./Casts/Casts";
import { BackdropImageBox } from "../../components/BackdropImage/BackdropImageBox";

export const FilmOrSerial = () => {
  const State = useTypedSelector((state) => state.Films);
  console.log(State);
  return (
    <div className="FilmOrSerial">
      <div className="container">
        <BackdropImageBox />
        <div className="OtherContentBox">
          <ImageAndOverview></ImageAndOverview>
          <Casts></Casts>
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
                        mainlineheight="auto"
                        mainlinewidth={"auto"}
                        mainline={true}
                        skeletonimg={true}
                        additionalLine={false}
                        imgheight={300}
                        imgwidth={200}
                      ></ItemSkeleton>
                    );
                  })}
              </div>
            </div>
          )}

          {State.RecomendedMovies.length > 0 ? (
            <MoviesList
              CategoryName="Recomendations"
              RenderCategory={State.RecomendedMovies}
            ></MoviesList>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
