import React from "react";

import { useAppDispatch, useTypedSelector } from "../../store";
import { GetMoreSerials } from "../../store/FilmsSlice";
import { MoviesList } from "../../components/MoviesList/MoviesList";
import "./Serials.css";
export const Serials: React.FC = ({}) => {
  const State = useTypedSelector((state) => state.Films);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetMoreSerials());
  }, []);
  return (
    <div className="Serials">
      <div className="container">
        <div className="SerialsBox">
          <MoviesList
            CategoryName={"Popular Serials"}
            RenderCategory={State.PopularSerials}
          ></MoviesList>
          <MoviesList
            CategoryName={"Top Day Serials"}
            RenderCategory={State.TopDaySerials}
          ></MoviesList>
          <MoviesList
            CategoryName={"Serials"}
            RenderCategory={State.Serials}
          ></MoviesList>
        </div>
      </div>
    </div>
  );
};
