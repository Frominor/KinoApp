import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ReactComponent as Lupa } from "../../imgs/loupe-search-svgrepo-com.svg";
import "./Header.css";
import { debounce } from "lodash-es";
import axios from "axios";
import { useAppDispatch, useTypedSelector } from "../../store";
import {
  SearchFilmsByName,
  getKeyForTopDayFilms,
} from "../../store/FilmsSlice";
import { FindedFilmsAndSerials } from "../FindedFilmsAndSerials/FindedFilmsAndSerials";
export const Header = React.memo(() => {
  const dispacth = useAppDispatch();
  const State = useTypedSelector((state) => state.Films);
  const [Active, SetActive] = React.useState(window.location.pathname);
  const [Value, SetValue] = React.useState("");
  const [IsOpenFindedFilmBox, SetIsOpenFindedFilmBox] = React.useState(false);
  const Ref = React.useRef(null);
  const FindFilmByName = React.useCallback(
    debounce((e) => {
      dispacth(SearchFilmsByName(e.target.value));
    }, 300),
    []
  );
  React.useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        Ref.current.blur();
        SetIsOpenFindedFilmBox(false);
      }
    }
    document.onkeydown = handleEscapeKey;
  }, []);
  React.useEffect(() => {
    if (State.Films.length > 0) {
      let arr = [];
      Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${State.TopDayFilms[0].id}/videos?api_key=9e41ad5e308357275d9bd37e24bc20bc`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${State.TopDayFilms[1].id}/videos?api_key=9e41ad5e308357275d9bd37e24bc20bc`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${State.TopDayFilms[2].id}/videos?api_key=9e41ad5e308357275d9bd37e24bc20bc`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${State.TopDayFilms[3].id}/videos?api_key=9e41ad5e308357275d9bd37e24bc20bc`
        ),
      ]).then((res) => {
        for (let k of res) {
          for (let z of k.data.results) {
            if (z.name === "Official Trailer") {
              arr.push(z);
            }
          }
        }
        dispacth(getKeyForTopDayFilms(arr));
      });
    }
  }, [State.Films]);

  return (
    <header>
      <div className="container">
        <div className="HeaderBox">
          <div className="Nav">
            <h1 className="MainPageLink Link">
              <Link
                to={"/"}
                onClick={() => {
                  SetActive("/");
                }}
                className={Active == "/" ? "active" : "notactive"}
              >
                Filmia
              </Link>
            </h1>
            <h1 className="Link">
              <Link
                onClick={() => {
                  SetActive("/movies");
                }}
                to={"/movies"}
                className={Active == "/movies" ? "active" : "notactive"}
              >
                Films
              </Link>
            </h1>
            <h1 className="Link">
              <Link
                onClick={() => {
                  SetActive("/tv");
                }}
                to={"/tv"}
                className={Active == "/tv" ? "active" : "notactive"}
              >
                TV
              </Link>
            </h1>
          </div>
          <div className="SearchFilm">
            <div className="InputBox">
              <input
                ref={Ref}
                onFocus={() => {
                  SetIsOpenFindedFilmBox(true);
                }}
                placeholder="Найти..."
                value={Value}
                onChange={(e) => {
                  SetValue(e.target.value);
                  FindFilmByName(e);
                  SetIsOpenFindedFilmBox(true);
                }}
                id="searchinput"
              ></input>
              <label htmlFor="searchinput">
                <Lupa className="lupa"></Lupa>
              </label>
              <FindedFilmsAndSerials
                IsOpenFindedFilmBox={IsOpenFindedFilmBox}
                SearchedFilms={State.SearchedFilms}
              ></FindedFilmsAndSerials>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
