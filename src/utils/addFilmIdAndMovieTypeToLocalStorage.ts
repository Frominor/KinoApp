import { IFilm } from "../interfaces/IFilm";

export function addFilmIdAndMovieTypeToLocalStorage(
  item: IFilm,
  SetIsOpenFindedFilmBox: (arg: boolean) => void,
  SearchFilmsByName: (arg: string) => any,
  dispatch: (arg: (str: string) => void) => void,
  SetValue?: (arg: string) => void
) {
  window.localStorage.removeItem("movieinfo");
  window.localStorage.removeItem("media_type");
  window.localStorage.setItem("media_type", item.media_type);
  window.localStorage.setItem("movieinfo", `${item.id}`);
  SetIsOpenFindedFilmBox(false);
  if (SetValue) {
    SetValue("");
  }

  dispatch(SearchFilmsByName(""));
}
