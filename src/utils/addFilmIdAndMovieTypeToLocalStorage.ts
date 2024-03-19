import { IFilm } from "../interfaces/IFilm";

export function addFilmIdAndMovieTypeToLocalStorage(
  item: IFilm,
  SetIsOpenFindedFilmBox: (arg: boolean) => void,
  SetValue: (arg: string) => void,
  SearchFilmsByName: (arg: string) => any,
  dispatch: (arg: (str: string) => void) => void
) {
  window.localStorage.removeItem("movieinfo");
  window.localStorage.removeItem("media_type");
  window.localStorage.setItem("media_type", item.media_type);
  window.localStorage.setItem("movieinfo", `${item.id}`);
  SetIsOpenFindedFilmBox(false);
  SetValue("");
  dispatch(SearchFilmsByName(""));
}
