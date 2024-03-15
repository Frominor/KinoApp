import React from "react";
import "./Main.css";
import { Slider } from "../Slider/Slider";
import { MoviesList } from "../MoviesList/MoviesList";
import { useTypedSelector } from "../../store";
export const Main: React.FC = React.memo(() => {
  const State = useTypedSelector((state) => state.Films);
  return (
    <main>
      <div className="container">
        <div className="Main_Content_Box">
          <Slider
            RenderCategory={State.TopDayFilms}
            isTopDFilmSilder={true}
            SlPerW={1}
            spaceB={0}
          ></Slider>
          <MoviesList
            CategoryName="Popular"
            RenderCategory={State.Films}
          ></MoviesList>
          <MoviesList
            CategoryName="In Theatres"
            RenderCategory={State.NowPlayingFilms}
          ></MoviesList>
          <MoviesList
            CategoryName="Top Rated TV"
            RenderCategory={State.Serials}
          ></MoviesList>
        </div>
      </div>
    </main>
  );
});
