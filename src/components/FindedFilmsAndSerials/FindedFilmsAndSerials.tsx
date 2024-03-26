import React from "react";
import { useAppDispatch, useTypedSelector } from "../../store";
import { SearchFilmsByName } from "../../store/FilmsSlice";
import { FindedFilmsAndSerialsItem } from "./FindedFilmsAndSerials/FindedFilmsAndSerialsItem";
import { ItemSkeleton } from "../ItemSkeleton/ItemSkeleton";
import "./FindedFilmsAndSerials.css";
type FindedFilmsAndSerialsProps = {
  SearchedFilms: {}[];
  IsOpenFindedFilmBox: boolean;
  SetIsOpenFindedFilmBox: (arg: boolean) => void;
  SetValue: (arg: string) => void;
};
export const FindedFilmsAndSerials: React.FC<FindedFilmsAndSerialsProps> = ({
  SearchedFilms,
  IsOpenFindedFilmBox,
  SetIsOpenFindedFilmBox,
  SetValue,
}) => {
  const State = useTypedSelector((state) => state.Films);
  const dispatch = useAppDispatch();
  return (
    <div
      className="FindedFilmsAndSerials"
      style={{
        overflowY: SearchedFilms.length >= 4 ? "scroll" : "hidden",
        display: IsOpenFindedFilmBox ? "block" : "none",
      }}
    >
      <div className="MoviesBox">
        {!State.isLoading
          ? SearchedFilms.map((item: any, index: number) => {
              return (
                <FindedFilmsAndSerialsItem
                  SearchFilmsByName={SearchFilmsByName}
                  SetIsOpenFindedFilmBox={SetIsOpenFindedFilmBox}
                  SetValue={SetValue}
                  dispatch={dispatch}
                  item={item}
                ></FindedFilmsAndSerialsItem>
              );
            })
          : Array(8)
              .fill(0)
              .map((item) => {
                return (
                  <ItemSkeleton
                    skeletonimg={true}
                    mainline={true}
                    LineDirection="row"
                    imgheight={100}
                    imgwidth={66}
                    additionalLine={false}
                    mainlinewidth={95 + "%"}
                    mainlineheight={100}
                  ></ItemSkeleton>
                );
              })}
      </div>
    </div>
  );
};
