import React from "react";
import { useAppDispatch, useTypedSelector } from "../../store";
import "./FilmOrSerial.css";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import { ItemSkeleton } from "../../components/ItemSkeleton/ItemSkeleton";
import { ImageAndOverview } from "./ImageAndOverview/ImageAndOverviev";
import { Casts } from "./Casts/Casts";
import { BackdropImageBox } from "../../components/BackdropImage/BackdropImageBox";
import { GetKeyForFindedFilmOrSerial } from "../../store/FilmsSlice";
import { GetInfoAndFindRecomendedMovies } from "../../utils/GetInfoAndFindRecomendedMovies";

export const FilmOrSerial = () => {
  const State = useTypedSelector((state) => state.Films);
  console.log(State);
  const dispacth = useAppDispatch();
  React.useEffect(() => {
    const media_type = localStorage.getItem("media_type");
    const movieinfo = localStorage.getItem("movieinfo");
    console.log(media_type);
    if (media_type) {
      if (movieinfo) {
        const item = { id: +movieinfo, media_type };
        GetInfoAndFindRecomendedMovies(item, dispacth);
      }
    }
  }, []);
  React.useEffect(() => {
    dispacth(
      GetKeyForFindedFilmOrSerial({
        media_type: String(localStorage.getItem("media_type")),
        FilmID: Number(localStorage.getItem("movieinfo")),
      })
    );
  }, [State.FindedFilmOrSerial]);
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
                  .map((item, index) => {
                    return (
                      <ItemSkeleton
                        key={index}
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

          {!State.isLoading ? (
            State.FindedFilmOrSerial[0]?.key ? (
              <div className="TrailerBox">
                <h3 className="Category">Trailer</h3>
                <iframe
                  className="TrailerFrame"
                  src={`https://www.youtube.com/embed/${State.FindedFilmOrSerial[0].key}?autoplay=0`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              ""
            )
          ) : (
            <div className="TrailerBox">
              <h3 className="Category">Trailer</h3>
              <ItemSkeleton
                additionalLine={false}
                mainline={false}
                skeletonimg={true}
                imgheight={200}
                imgwidth={300}
              ></ItemSkeleton>
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
