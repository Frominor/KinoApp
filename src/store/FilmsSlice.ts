import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IFilm, IState } from "../interfaces/IFilm";
//ts-ignore
export const GetPopularFilms = createAsyncThunk(
  "Films/GetPopularFilms",
  async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&videos`
    );
    return res.data;
  }
);
export const GetNowPlayingFilms = createAsyncThunk(
  "Films/GetNowPlayingFilms",
  async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`
    );
    return res.data;
  }
);
export const SearchFilmsByName = createAsyncThunk(
  "Films/SearcheByName",
  async (Name: string) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${Name}&api_key=${process.env.REACT_APP_API_FILMS_KEY}&include_adult=false&language=ru-Rus&page=1`
    );
    return res.data;
  }
);
export const FindTopRatedTv = createAsyncThunk(
  "Serials/GetPopular",
  async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`
    );
    return res.data;
  }
);
export const GetFullInfoIn = createAsyncThunk(
  "Person/GetFullInfo",
  async (MovieInfo: { MediaType: string; MovieId: number }) => {
    console.log();
    const res = await axios.get(
      `https://api.themoviedb.org/3/${MovieInfo.MediaType}/${MovieInfo.MovieId}?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus`
    );
    return await res.data;
  }
);
export const GetTheActors = createAsyncThunk(
  "Person/GetActors",
  async (MovieInfo: { MediaType: string; MovieId: number }) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${MovieInfo.MediaType}/${MovieInfo.MovieId}/credits?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus`
    );
    return await res.data;
  }
);

export const FindRecomendedMovies = createAsyncThunk(
  "Movie/FindRecomended",
  async (MovieInfo: { MediaType: string; MovieId: number }) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${MovieInfo.MediaType}/${MovieInfo.MovieId}/recommendations?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`
    );
    return await res.data;
  }
);

const initialState: IState = {
  Films: [],
  TopDayFilms: [],
  Serials: [],
  NowPlayingFilms: [],
  YouTubeS: [],
  isLoading: false,
  FindedFilmOrSerial: [],
  Error: "",
  Casts: [],
  RecomendedMovies: [],
  SearchedFilms: [],
};
const GetFilmsSlice = createSlice({
  name: "Films",
  initialState,
  reducers: {
    getKeyForTopDayFilms(state: IState, action: PayloadAction<IFilm[]>) {
      state.YouTubeS = action.payload;
      for (let i = 0; i < action.payload.length; i++) {
        state.TopDayFilms[i].key = action.payload[i].key;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetPopularFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetPopularFilms.fulfilled, (state, action) => {
        state.Films = action.payload.results;
        for (let k of state.Films) {
          k.media_type = "movie";
        }
        state.TopDayFilms = [
          state.Films[0],
          state.Films[1],
          state.Films[2],
          state.Films[3],
        ];
      })
      .addCase(GetPopularFilms.rejected, (state, action) => {
        state.Error = "Ошибка при загрузке фильмов";
        state.isLoading = false;
      })
      .addCase(GetNowPlayingFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetNowPlayingFilms.fulfilled, (state, action) => {
        state.NowPlayingFilms = action.payload.results;
        for (let k of state.NowPlayingFilms) {
          k.media_type = "movie";
        }
        state.isLoading = false;
      })
      .addCase(GetNowPlayingFilms.rejected, (state, action) => {
        state.Error = "Ошибка при загрузке фильмов";
        state.isLoading = false;
      })
      .addCase(SearchFilmsByName.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(SearchFilmsByName.fulfilled, (state, action) => {
        state.SearchedFilms = action.payload.results;
        state.isLoading = false;
        for (let k of state.SearchedFilms) {
          k.media_type = "movie";
        }
      })
      .addCase(SearchFilmsByName.rejected, (state) => {
        state.Error = "Ошибка";
        state.isLoading = false;
      })
      .addCase(FindTopRatedTv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FindTopRatedTv.fulfilled, (state, action) => {
        state.Serials = action.payload.results;
        for (let k of state.Serials) {
          k.media_type = "tv";
        }
        state.isLoading = false;
      })
      .addCase(GetFullInfoIn.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(GetFullInfoIn.fulfilled, (state, action) => {
        state.FindedFilmOrSerial = [action.payload];
      })
      .addCase(GetFullInfoIn.rejected, (state) => {
        state.Error = "Ошибка";
        state.isLoading = false;
      })
      .addCase(GetTheActors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTheActors.fulfilled, (state, action) => {
        state.Casts = action.payload.cast;
        state.isLoading = false;
      })
      .addCase(FindRecomendedMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        FindRecomendedMovies.fulfilled,
        (state, action: PayloadAction<{ results: any[] }>) => {
          console.log(123);
          state.isLoading = false;
          state.RecomendedMovies = action.payload.results;
        }
      );
  },
});
export const GetFilmsSliceReducer = GetFilmsSlice.reducer;
export const { getKeyForTopDayFilms } = GetFilmsSlice.actions;
