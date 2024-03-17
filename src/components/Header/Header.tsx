import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ReactComponent as Lupa } from "../../imgs/loupe-search-svgrepo-com.svg";

//@ts-ignore
import { debounce } from "lodash-es";
import axios from "axios";
import { useAppDispatch, useTypedSelector } from "../../store";
import {
  SearchFilmsByName,
  getKeyForTopDayFilms,
} from "../../store/FilmsSlice";
import { FindedFilmsAndSerials } from "../FindedFilmsAndSerials/FindedFilmsAndSerials";
import "./Header.css";
export const Header: React.FC = ({}) => {
  const dispacth = useAppDispatch();
  const State = useTypedSelector((state) => state.Films);
  const [IsOpenFindedFilmBox, SetIsOpenFindedFilmBox] =
    React.useState<boolean>(false);
  const [Active, SetActive] = React.useState(window.location.pathname);
  const [Value, SetValue] = React.useState<string>("");
  const Ref = React.useRef<HTMLInputElement>(null);
  const menuref = React.useRef<HTMLDivElement>(null);
  const FindFilmByName = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      dispacth(SearchFilmsByName(e.target.value));
    }, 300),
    []
  );
  React.useEffect(() => {
    let handler = (e: any) => {
      const target = e.target as Element;
      if (!menuref.current?.contains(target)) {
        SetIsOpenFindedFilmBox(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  React.useEffect(() => {
    function handleEscapeKey(event: any) {
      if (event.code === "Escape") {
        if (Ref.current !== null) {
          Ref.current.blur();
          SetIsOpenFindedFilmBox(false);
        }
      }
    }
    document.onkeydown = handleEscapeKey;
  }, []);
  React.useEffect(() => {
    if (State.Films.length > 0) {
      const arr: any[] = [];
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
          <div className="SearchFilm" ref={menuref}>
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
};
