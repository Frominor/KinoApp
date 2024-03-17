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
  async () => {
    const res = await Promise.all([
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`,
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`,
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`,
    ]);
  }
);
const initialState: IState = {
  Films: [],
  TopDayFilms: [],
  Serials: [],
  NowPlayingFilms: [],
  YouTubeS: [],
  isLoading: false,
  Error: "",
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
        state.TopDayFilms = [
          state.Films[0],
          state.Films[1],
          state.Films[2],
          state.Films[3],
        ];
      })
      .addCase(GetPopularFilms.rejected, (state, action) => {
        state.Error = "Ошибка при загрузке фильмов";
      })
      .addCase(GetNowPlayingFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetNowPlayingFilms.fulfilled, (state, action) => {
        state.NowPlayingFilms = action.payload.results;
      })
      .addCase(GetNowPlayingFilms.rejected, (state, action) => {
        state.Error = "Ошибка при загрузке фильмов";
      })
      .addCase(SearchFilmsByName.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(SearchFilmsByName.fulfilled, (state, action) => {
        state.SearchedFilms = action.payload.results;
      })
      .addCase(SearchFilmsByName.rejected, (state) => {
        state.Error = "Ошибка";
      })
      .addCase(FindTopRatedTv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FindTopRatedTv.fulfilled, (state, action) => {
        state.Serials = action.payload.results;
      });
  },
});
export const GetFilmsSliceReducer = GetFilmsSlice.reducer;
export const { getKeyForTopDayFilms } = GetFilmsSlice.actions;
