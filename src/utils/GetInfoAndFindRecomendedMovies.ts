import { IFilm } from "../interfaces/IFilm";
import {
  FindRecomendedMovies,
  GetFullInfoIn,
  GetTheActors,
} from "../store/FilmsSlice";

export function GetInfoAndFindRecomendedMovies(
  item: IFilm,
  dispatch: (arg: any) => void
): void {
  dispatch(
    FindRecomendedMovies({
      MovieId: item.id,
      MediaType: item.media_type,
    })
  );
  dispatch(
    GetFullInfoIn({
      MovieId: item.id,
      MediaType: item.media_type,
    })
  );
  dispatch(
    GetTheActors({
      MovieId: item.id,
      MediaType: item.media_type,
    })
  );
}
