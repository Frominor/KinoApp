import React from "react";
import "./ItemSkeleton.css";
interface ItemSkeletonProps {
  imgwidth?: number | string;
  imgheight?: number | string;
  additionalLine: boolean;
  additionalLinewidth?: number | string;
  additionalLineheight?: number | string;
  skeletonimg: boolean;
  mainline: boolean;
  mainlinewidth?: number | string;
  mainlineheight?: number | string;
  LineDirection?: string;
}
export const ItemSkeleton: React.FC<ItemSkeletonProps> = ({
  imgheight,
  imgwidth,
  additionalLine,
  skeletonimg,
  mainline,
  mainlinewidth,
  mainlineheight,
  additionalLinewidth,
  additionalLineheight,
  LineDirection,
}) => {
  return (
    <div
      className={
        LineDirection == "row" ? "skeletonBox row" : "skeletonBox column"
      }
    >
      {skeletonimg && (
        <div
          className="skeleton skeleton-img"
          style={{
            width: imgwidth,
            height: imgheight,
            border: "1px solid black",
          }}
        ></div>
      )}
      {mainline && (
        <div
          className="skeleton skeleton-title"
          style={{ width: mainlinewidth, height: mainlineheight }}
        ></div>
      )}
      {additionalLine && (
        <div
          className="skeleton skeleton-title"
          style={{ width: additionalLinewidth, height: additionalLineheight }}
        ></div>
      )}
    </div>
  );
};
