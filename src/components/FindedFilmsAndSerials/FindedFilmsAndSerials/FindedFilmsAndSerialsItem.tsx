import React from "react";
import { NavLink } from "react-router-dom";
import { addFilmIdAndMovieTypeToLocalStorage } from "../../../utils/addFilmIdAndMovieTypeToLocalStorage";
import { IFilm } from "../../../interfaces/IFilm";
import "./FindedFilmsAndSerials.css";
interface FindedFilmsAndSerialsItemProps {
  item: IFilm;
  SetIsOpenFindedFilmBox: (arg: boolean) => void;
  SetValue: (arg: string) => void;
  dispatch: (arg?: any) => any;
  SearchFilmsByName: (arg: any) => void;
  GetInfoAndFindRecomendedMovies: (item: IFilm, dispatch: () => void) => void;
}
export const FindedFilmsAndSerialsItem: React.FC<
  FindedFilmsAndSerialsItemProps
> = ({
  item,
  SetIsOpenFindedFilmBox,
  SetValue,
  dispatch,
  SearchFilmsByName,
  GetInfoAndFindRecomendedMovies,
}) => {
  return (
    <NavLink
      onClick={() => {
        addFilmIdAndMovieTypeToLocalStorage(
          item,
          SetIsOpenFindedFilmBox,
          SetValue
        );
        GetInfoAndFindRecomendedMovies(item, dispatch);
        SearchFilmsByName("");
      }}
      to={`/films/:${item.id}`}
      className="MoviesBoxItem"
    >
      <img
        className="FindedMovieImg"
        src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
      ></img>

      <div className="SearcheItemTitleAndOverviewBox">
        <p className="SearchedItemTitle">{item.title}</p>
        <p className="SearchedItemOverview">
          {item.overview.length > 250
            ? item.overview.split(".")[0] + "."
            : item.overview}
        </p>
      </div>
    </NavLink>
  );
};
