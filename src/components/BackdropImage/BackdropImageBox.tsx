import React from "react";
import { ItemSkeleton } from "../ItemSkeleton/ItemSkeleton";
import { useTypedSelector } from "../../store";
export const BackdropImageBox: React.FC = () => {
  const State = useTypedSelector((state) => state.Films);
  return (
    <div className="BackdropImageBox">
      {!State.isLoading ? (
        <img
          className="BackdropImage"
          src={`https://image.tmdb.org/t/p/original/${State.FindedFilmOrSerial[0]?.backdrop_path}`}
        ></img>
      ) : (
        <ItemSkeleton
          additionalLine={false}
          mainline={false}
          skeletonimg={true}
          imgheight={300}
          imgwidth={100 + "%"}
        ></ItemSkeleton>
      )}
    </div>
  );
};
