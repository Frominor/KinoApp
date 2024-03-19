import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { ReactComponent as Play } from "../../imgs/play-circle-svgrepo-com.svg";
import { ReactComponent as Naaa } from "./play-circle-svgrepo-com.svg";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import { useAppDispatch, useTypedSelector } from "../../store";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { IFilm } from "../../interfaces/IFilm";
import { NavLink } from "react-router-dom";
import {
  FindRecomendedMovies,
  GetFullInfoIn,
  GetTheActors,
} from "../../store/FilmsSlice";

interface SliderProps {
  SlPerW: number;
  spaceB: number;
  isTopDFilmSilder: boolean;
  RenderCategory: IFilm[];
}
export const Slider: React.FC<SliderProps> = ({
  SlPerW,
  spaceB,
  isTopDFilmSilder,
  RenderCategory = [],
}) => {
  const dispatch = useAppDispatch();
  const State = useTypedSelector((state) => state.Films);
  const [ModalWindowOpen, SetModalWindowOpen] = React.useState<boolean>(false);
  const [OnTheElement, SetOnTheElement] = React.useState<boolean>(false);
  const [YouTubeKey, SetKey] = React.useState<number>(0);
  const [Id, SetID] = React.useState<number>(0);
  function CheckOpacity(item: IFilm): number {
    if (OnTheElement) {
      if (Id == item.id) {
        return 1;
      }
    }
    return 0;
  }
  if (isTopDFilmSilder) {
    return (
      <>
        <Swiper
          className="Slider"
          modules={[Navigation, A11y]}
          spaceBetween={spaceB}
          slidesPerView={SlPerW}
          navigation
          onSlideChange={() => console.log("slide change")}
        >
          <ModalWindow
            YouTubeKey={YouTubeKey}
            ModalWindowOpen={ModalWindowOpen}
            SetModalWindowOpen={SetModalWindowOpen}
          ></ModalWindow>
          {RenderCategory.map((item: IFilm, index: number) => {
            return (
              <>
                <SwiperSlide
                  key={index}
                  className="SwiperSlide"
                  style={{
                    color: "white",
                    cursor: "pointer",
                    position: "relative",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <div
                    style={{
                      width: 65 + "%",
                      borderRadius: 20 + "%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 400 + "px",
                    }}
                  >
                    <div
                      className="Test"
                      style={{
                        backgroundImage: `url(https://img.youtube.com/vi/${item.key}/maxresdefault.jpg)`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        width: 65 + "%",
                        borderRadius: 20 + "%",
                        backgroundRepeat: "no-repeat",
                        height: 100 + "%",
                      }}
                    ></div>
                  </div>

                  <div className="WatchTrailerAndDescription">
                    <p className="MovieTitle">{item.title}</p>
                    <p>
                      {item.overview.split(".")[0] +
                        "." +
                        item.overview.split(".")[1] +
                        ""}
                    </p>
                    <button
                      className="WatchTrailerBtn"
                      onClick={() => {
                        SetModalWindowOpen(true);
                        const youtybekey = State?.YouTubeS[index]?.key;
                        if (youtybekey) {
                          SetKey(youtybekey);
                        }
                      }}
                    >
                      <Play className="Play"></Play>Watch trailer
                    </button>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </>
    );
  } else {
    return (
      <>
        <Swiper
          className="Slider"
          modules={[Navigation, A11y]}
          spaceBetween={spaceB}
          slidesPerView={SlPerW}
          navigation
          onSlideChange={() => console.log("slide change")}
        >
          {RenderCategory.map((item: IFilm, index) => {
            return (
              <SwiperSlide
                onClick={() => {
                  window.localStorage.removeItem("movieinfo");
                  window.localStorage.removeItem("media_type");
                  window.localStorage.setItem("media_type", item.media_type);
                  window.localStorage.setItem("movieinfo", `${item.id}`);
                  SetModalWindowOpen(false);
                  dispatch(
                    FindRecomendedMovies({
                      MovieId: item.id,
                      MediaType: item.media_type,
                    })
                  );
                  dispatch(
                    GetFullInfoIn({
                      MovieId: item.id,
                      MediaType: item.media_type,
                    })
                  );
                  dispatch(
                    GetTheActors({
                      MovieId: item.id,
                      MediaType: item.media_type,
                    })
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                key={index}
                className="SwiperSlide"
                style={{
                  color: "white",
                  position: "relative",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div
                  onMouseEnter={() => {
                    SetID(item.id);
                    SetOnTheElement(true);
                  }}
                  onMouseLeave={() => {
                    SetOnTheElement(false);
                  }}
                  className="FilmBox"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <NavLink to={`/films/:${item.id}`}>
                    <img
                      loading="lazy"
                      style={{ cursor: "pointer" }}
                      src={`https://image.tmdb.org/t/p/w1280/${item.poster_path}`}
                      className="ImgForMovList"
                    ></img>
                    <Naaa
                      className="Play"
                      style={{
                        pointerEvents: "none",
                        background: "white",
                        borderRadius: 50 + "%",
                        position: "absolute",
                        opacity: CheckOpacity(item),
                      }}
                    ></Naaa>
                  </NavLink>
                  <p className="MovieTitle">{item.title}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
};
