import React from "react";
import { SwiperSlide } from "swiper/react";
import { useAppDispatch } from "../../../store";
import { NavLink } from "react-router-dom";
import { IFilm } from "../../../interfaces/IFilm";
import { ReactComponent as Naaa } from "../play-circle-svgrepo-com.svg";
import { GetInfoAndFindRecomendedMovies } from "../../../utils/GetInfoAndFindRecomendedMovies";
import "./SliderItem.css";
interface SliderItemProps {
  index: number;
  item: IFilm;
  SetModalWindowOpen: (arg: boolean) => void;
}
export const SliderItem: React.FC<SliderItemProps> = ({
  index,
  item,
  SetModalWindowOpen,
}) => {
  const [OnTheElement, SetOnTheElement] = React.useState<boolean>(false);
  const [Id, SetID] = React.useState<number>(0);
  function CheckOpacity(item: IFilm): number {
    if (OnTheElement) {
      if (Id == item.id) {
        return 1;
      }
    }
    return 0;
  }
  function SetDataToLocalStorage(item: IFilm) {
    window.localStorage.removeItem("movieinfo");
    window.localStorage.removeItem("media_type");
    window.localStorage.setItem("media_type", item.media_type);
    window.localStorage.setItem("movieinfo", `${item.id}`);
    SetModalWindowOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const dispatch = useAppDispatch();
  return (
    <SwiperSlide
      onClick={() => {
        SetDataToLocalStorage(item);
        GetInfoAndFindRecomendedMovies(item, dispatch);
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
};
