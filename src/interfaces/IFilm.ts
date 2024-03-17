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
  FindedFilmOrSerial: any[];
  Serials: {}[];
  NowPlayingFilms: IFilm[];
  YouTubeS: IFilm[];
  isLoading: boolean;
  Casts: {
    id: number;
    name: string;
    popularity: number;
    character: string;
    profile_path: string;
  }[];
  Error: string;
  SearchedFilms: IFilm[];
}
