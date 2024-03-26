import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IFilm, IState } from "../interfaces/IFilm";
//ts-ignore

export const SearchFilmsByName = createAsyncThunk(
  "Films/SearcheByName",
  async (Name: string) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${Name}&api_key=${process.env.REACT_APP_API_FILMS_KEY}&include_adult=false&language=ru-Rus&page=1`
    );
    return res.data;
  }
);

export const GetFullInfoIn = createAsyncThunk(
  "Person/GetFullInfo",
  async (MovieInfo: { MediaType: string; MovieId: number }) => {
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
export const FindBasicFilmsAndSerialsCategories = createAsyncThunk(
  "Movies/GetOtherCategories",
  async () => {
    const res = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&videos`
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`
      ),
    ]);
    return res;
  }
);
export const GetMoreSerials = createAsyncThunk(
  "Moives/GetMoreSerials",
  async (MovieOrTv: string) => {
    const res = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/${MovieOrTv}/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=1`
      ),
      axios.get(
        `https://api.themoviedb.org/3/${MovieOrTv}/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=2`
      ),
      axios.get(
        `https://api.themoviedb.org/3/${MovieOrTv}/top_rated?api_key=${process.env.REACT_APP_API_FILMS_KEY}&language=ru-Rus&page=3`
      ),
    ]);
    return { res, media_type: MovieOrTv };
  }
);
export const GetKeyForFindedFilmOrSerial = createAsyncThunk(
  "Moive/GetKey",
  async (Item: { FilmID: number; media_type: string }) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${Item.media_type}/${Item.FilmID}/videos?api_key=9e41ad5e308357275d9bd37e24bc20bc`
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
  TopDaySerials: [],
  PopularSerials: [],
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
      .addCase(SearchFilmsByName.pending, (state) => {
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
          state.isLoading = false;
          state.RecomendedMovies = action.payload.results;
        }
      )
      .addCase(
        FindBasicFilmsAndSerialsCategories.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.Films = action.payload[0].data.results;
          for (let k of state.Films) {
            k.media_type = "movie";
          }
          state.TopDayFilms = [
            state.Films[0],
            state.Films[1],
            state.Films[2],
            state.Films[3],
          ];
          state.Serials = action.payload[1].data.results;
          for (let k of state.Serials) {
            k.media_type = "tv";
          }
          state.NowPlayingFilms = action.payload[2].data.results;
          for (let k of state.NowPlayingFilms) {
            k.media_type = "movie";
          }
          state.isLoading = false;
        }
      )
      .addCase(FindBasicFilmsAndSerialsCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FindBasicFilmsAndSerialsCategories.rejected, (state) => {
        state.Error = "Ошибка";
        state.isLoading = false;
      })
      .addCase(GetMoreSerials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetMoreSerials.fulfilled, (state, action) => {
        state.PopularSerials = action.payload.res[0].data.results;
        for (let k of state.PopularSerials) {
          k.media_type = action.payload.media_type;
        }
        state.TopDaySerials = action.payload.res[1].data.results;
        for (let k of state.TopDaySerials) {
          k.media_type = action.payload.media_type;
        }
      })
      .addCase(GetKeyForFindedFilmOrSerial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetKeyForFindedFilmOrSerial.fulfilled, (state, action) => {
        state.isLoading = false;
        for (let k of action.payload.results) {
          if (k.name == "Official Trailer") {
            state.FindedFilmOrSerial[0].key = k.key;
          }
          if (k.name == "Series Trailer") {
            state.FindedFilmOrSerial[0].key = k.key;
          }
        }
      })
      .addCase(GetKeyForFindedFilmOrSerial.rejected, (state) => {
        state.isLoading = false;
        state.Error = "Ошибка";
      });
  },
});
export const GetFilmsSliceReducer = GetFilmsSlice.reducer;
export const { getKeyForTopDayFilms } = GetFilmsSlice.actions;
