import React from "react";

import { useAppDispatch, useTypedSelector } from "../../store";
import { GetMoreSerials } from "../../store/FilmsSlice";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import "./Films.css";
export const Films: React.FC = ({}) => {
  const State = useTypedSelector((state) => state.Films);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetMoreSerials("movie"));
  }, []);
  return (
    <div className="Films">
      <div className="container">
        <div className="FilmsBox">
          <MoviesList
            CategoryName={"Popular Films"}
            RenderCategory={State.PopularSerials}
          ></MoviesList>
          <MoviesList
            CategoryName={"Top Day Films"}
            RenderCategory={State.TopDaySerials}
          ></MoviesList>
          <MoviesList
            CategoryName={"Films"}
            RenderCategory={State.Films}
          ></MoviesList>
        </div>
      </div>
    </div>
  );
};
