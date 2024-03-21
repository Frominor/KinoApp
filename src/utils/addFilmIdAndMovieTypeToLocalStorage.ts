import { IFilm } from "../interfaces/IFilm";

export function addFilmIdAndMovieTypeToLocalStorage(
  item: IFilm,
  SetIsOpenFindedFilmBox: (arg: any) => void,

  SetValue?: (arg: string) => void
) {
  console.log(item);
  window.localStorage.removeItem("movieinfo");
  window.localStorage.removeItem("media_type");
  window.localStorage.setItem("media_type", item.media_type);
  window.localStorage.setItem("movieinfo", `${item.id}`);
  SetIsOpenFindedFilmBox(false);
  if (SetValue) {
    SetValue("");
  }
}
