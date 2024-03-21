import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import { useAppDispatch, useTypedSelector } from "../../store";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { IFilm } from "../../interfaces/IFilm";
import { WatchTrailer } from "../WatchTrailer/WatchTrailer";

import { SliderItem } from "./SliderItem/SliderItem";
import "./Slider.css";
import "swiper/css";
import "swiper/css/navigation";
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
  const [ModalWindowOpen, SetModalWindowOpen] = React.useState<boolean>(false);
  const [YouTubeKey, SetKey] = React.useState<number>(0);
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

                  <WatchTrailer
                    SetKey={SetKey}
                    SetModalWindowOpen={SetModalWindowOpen}
                    index={index}
                    overview={item.overview}
                    title={item.title}
                    key={index}
                  ></WatchTrailer>
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
              <SwiperSlide>
                {" "}
                <SliderItem
                  SetModalWindowOpen={SetModalWindowOpen}
                  index={index}
                  item={item}
                ></SliderItem>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
};
