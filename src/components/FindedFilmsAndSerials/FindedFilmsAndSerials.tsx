import React from "react";
import "./FindedFilmsAndSerials.css";
import { useAppDispatch } from "../../store";
import { SearchFilmsByName } from "../../store/FilmsSlice";
import { GetInfoAndFindRecomendedMovies } from "../../utils/GetInfoAndFindRecomendedMovies";
import { FindedFilmsAndSerialsItem } from "./FindedFilmsAndSerials/FindedFilmsAndSerialsItem";

type FindedFilmsAndSerialsProps = {
  SearchedFilms: {}[];
  IsOpenFindedFilmBox: boolean;
  SetIsOpenFindedFilmBox: (arg: boolean) => void;
  SetValue: (arg: string) => void;
};
export const FindedFilmsAndSerials: React.FC<FindedFilmsAndSerialsProps> = ({
  SearchedFilms,
  IsOpenFindedFilmBox,
  SetIsOpenFindedFilmBox,
  SetValue,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="FindedFilmsAndSerials"
      style={{
        overflowY: SearchedFilms.length >= 4 ? "scroll" : "hidden",
        display: IsOpenFindedFilmBox ? "block" : "none",
      }}
    >
      <div className="MoviesBox">
        {SearchedFilms &&
          SearchedFilms.map((item: any, index: number) => {
            return (
              <FindedFilmsAndSerialsItem
                GetInfoAndFindRecomendedMovies={GetInfoAndFindRecomendedMovies}
                SearchFilmsByName={SearchFilmsByName}
                SetIsOpenFindedFilmBox={SetIsOpenFindedFilmBox}
                SetValue={SetValue}
                dispatch={dispatch}
                item={item}
              ></FindedFilmsAndSerialsItem>
            );
          })}
      </div>
    </div>
  );
};
