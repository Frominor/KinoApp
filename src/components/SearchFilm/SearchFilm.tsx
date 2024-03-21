import React from "react";
//@ts-ignore
import { debounce } from "lodash-es";
import { useAppDispatch, useTypedSelector } from "../../store";
import { SearchFilmsByName } from "../../store/FilmsSlice";
import { ReactComponent as Lupa } from "../../imgs/loupe-search-svgrepo-com.svg";
import { FindedFilmsAndSerials } from "../FindedFilmsAndSerials/FindedFilmsAndSerials";
import "./SearchFilm.css";
interface SearchFilmProps {
  menuref: any;
  Ref: any;
  SetIsOpenFindedFilmBox: (arg: boolean) => void;
  Value: string;
  SetValue: (arg: string) => void;
  IsOpenFindedFilmBox: boolean;
}
export const SearchFilm: React.FC<SearchFilmProps> = ({
  menuref,
  IsOpenFindedFilmBox,
  SetIsOpenFindedFilmBox,
  Value,
  Ref,
  SetValue,
}) => {
  const State = useTypedSelector((state) => state.Films);
  const dispacth = useAppDispatch();
  const FindFilmByName = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      dispacth(SearchFilmsByName(e.target.value));
    }, 300),
    []
  );
  return (
    <div className="SearchFilm" ref={menuref}>
      <div className="InputBox">
        <input
          ref={Ref}
          onFocus={() => {
            SetIsOpenFindedFilmBox(true);
          }}
          placeholder="Найти..."
          value={Value}
          onChange={(e) => {
            SetValue(e.target.value);
            FindFilmByName(e);
            SetIsOpenFindedFilmBox(true);
          }}
          id="searchinput"
        ></input>
        <label htmlFor="searchinput">
          <Lupa className="lupa"></Lupa>
        </label>
        <FindedFilmsAndSerials
          SetValue={SetValue}
          SetIsOpenFindedFilmBox={SetIsOpenFindedFilmBox}
          IsOpenFindedFilmBox={IsOpenFindedFilmBox}
          SearchedFilms={State.SearchedFilms}
        ></FindedFilmsAndSerials>
      </div>
    </div>
  );
};
