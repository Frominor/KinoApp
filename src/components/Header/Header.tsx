import React from "react";
import axios from "axios";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getKeyForTopDayFilms } from "../../store/FilmsSlice";

import { Nav } from "../Nav/Nav";
import { SearchFilm } from "../SearchFilm/SearchFilm";
import "./Header.css";
export const Header: React.FC = ({}) => {
  const dispacth = useAppDispatch();
  const State = useTypedSelector((state) => state.Films);
  const [IsOpenFindedFilmBox, SetIsOpenFindedFilmBox] =
    React.useState<boolean>(false);
  const [Value, SetValue] = React.useState<string>("");
  const Ref = React.useRef<HTMLInputElement>(null);
  const menuref = React.useRef<HTMLDivElement>(null);

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
  function handleEscapeKey(event: any) {
    if (event.code === "Escape") {
      if (Ref.current !== null) {
        Ref.current.blur();
        SetIsOpenFindedFilmBox(false);
      }
    }
  }
  console.log(window.innerWidth);
  React.useEffect(() => {
    document.addEventListener("onkeydown", handleEscapeKey);
    return () => {
      document.removeEventListener("onkeydown", handleEscapeKey);
    };
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
          <Nav></Nav>
          <SearchFilm
            IsOpenFindedFilmBox={IsOpenFindedFilmBox}
            Ref={Ref}
            SetIsOpenFindedFilmBox={SetIsOpenFindedFilmBox}
            SetValue={SetValue}
            Value={Value}
            menuref={menuref}
          ></SearchFilm>
        </div>
      </div>
    </header>
  );
};
