import React from "react";
import { useTypedSelector } from "../../../store";
import { ItemSkeleton } from "../../../components/ItemSkeleton/ItemSkeleton";
import "./ImageAndOverview.css";
export const ImageAndOverview: React.FC = () => {
  const State = useTypedSelector((state) => state.Films);
  return (
    <div className="ImageAndOverview">
      {!State.isLoading ? (
        <img
          className="ImageAndOverview_Image"
          src={`https://image.tmdb.org/t/p/w500/${State.FindedFilmOrSerial[0]?.poster_path}`}
        ></img>
      ) : (
        <ItemSkeleton
          mainlineheight={"auton"}
          mainlinewidth={"auto"}
          additionalLine={false}
          imgheight={400}
          imgwidth={266}
          mainline={false}
          skeletonimg={true}
        ></ItemSkeleton>
      )}
      <div className="TitleAndOverview">
        <h3 className="NameOfTheMovie">{State.FindedFilmOrSerial[0]?.name}</h3>
        <p className="Ganre">
          {State.FindedFilmOrSerial[0]?.genres[0]?.name
            .split("")[0]
            .toUpperCase() +
            State.FindedFilmOrSerial[0]?.genres[0]?.name
              .split("")
              .splice(1)
              .join("")}
        </p>
        <p className="OverviewOfTheMovie">
          {State.isLoading ? (
            <ItemSkeleton
              additionalLine={false}
              mainline={true}
              skeletonimg={false}
              mainlineheight={100}
              mainlinewidth={1000}
            ></ItemSkeleton>
          ) : (
            State.FindedFilmOrSerial[0]?.overview
          )}
        </p>
      </div>
    </div>
  );
};
