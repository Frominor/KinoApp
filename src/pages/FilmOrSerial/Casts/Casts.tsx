import React from "react";
import { useTypedSelector } from "../../../store";
import { CastItem } from "./CastItem/CastItem";
import { ItemSkeleton } from "../../../components/ItemSkeleton/ItemSkeleton";
import "./Casts.css";
export const Casts: React.FC = () => {
  const State = useTypedSelector((state) => state.Films);
  return (
    <div className="Casts">
      <h2 className="Category">Casts</h2>
      <div
        className="CastsBox"
        style={{
          overflowX: State.Casts.length <= 4 ? "hidden" : "scroll",
        }}
      >
        {!State.isLoading
          ? State.Casts.length > 0
            ? State.Casts.map(
                (
                  item: {
                    character: string;
                    original_name: string;
                    profile_path: string;
                  },
                  index
                ) => {
                  return (
                    <CastItem
                      character={item.character}
                      original_name={item.original_name}
                      profile_path={item.profile_path}
                      key={index}
                    ></CastItem>
                  );
                }
              )
            : ""
          : Array(8)
              .fill(0)
              .map((item) => {
                return (
                  <ItemSkeleton
                    mainlineheight={"auto"}
                    mainlinewidth={"auto"}
                    mainline={true}
                    skeletonimg={true}
                    additionalLine={true}
                    imgheight={450}
                    imgwidth={300}
                  ></ItemSkeleton>
                );
              })}
      </div>
    </div>
  );
};
