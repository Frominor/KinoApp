import React from "react";
import { Slider } from "../Slider/Slider";
import "./MoviesList.css";
type MoviesListProps = {
  CategoryName: string;
  RenderCategory: any[];
};
export const MoviesList: React.FC<MoviesListProps> = ({
  CategoryName,
  RenderCategory,
}) => {
  return (
    <div className="MoviesList">
      <div className="MovieCategoryTitle">
        <h4 className="CategoryName">{CategoryName}</h4>
      </div>
      <Slider
        isTopDFilmSilder={false}
        SlPerW={6}
        spaceB={0}
        RenderCategory={RenderCategory}
      ></Slider>
    </div>
  );
};
