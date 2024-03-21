export interface IFilm {
  adult: boolean;
  backdrop_path: string;
  id: number;
  media_type: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  key?: number;
}

export interface IState {
  Films: IFilm[];
  TopDayFilms: IFilm[];
  FindedFilmOrSerial: {
    seasons: any[];

    original_name: string;
    name: string;
    overview: string;
    poster_path: string;
    homepage: string;
    genres: { id: number; name: string }[];
    backdrop_path: string[];
  }[];
  TopDaySerials: IFilm[];
  PopularSerials: IFilm[];
  Serials: IFilm[];
  RecomendedMovies: { results: IFilm[] }[];
  NowPlayingFilms: IFilm[];
  YouTubeS: IFilm[];
  isLoading: boolean;
  Casts: {
    id: number;
    name: string;
    popularity: number;
    character: string;
    profile_path: string;
    original_name: string;
  }[];
  Error: string;
  SearchedFilms: IFilm[];
}
