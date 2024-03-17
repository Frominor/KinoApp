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
  Serials: {}[];
  NowPlayingFilms: IFilm[];
  YouTubeS: IFilm[];
  isLoading: boolean;
  Error: string;
  SearchedFilms: IFilm[];
}
