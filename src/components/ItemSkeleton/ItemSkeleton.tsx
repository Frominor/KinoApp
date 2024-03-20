import React from "react";
import "./ItemSkeleton.css";
interface ItemSkeletonProps {
  imgwidth: number;
  imgheight: number;
  additionalLine: boolean;
}
export const ItemSkeleton: React.FC<ItemSkeletonProps> = ({
  imgheight,
  imgwidth,
  additionalLine,
}) => {
  return (
    <div className="skeletonBox">
      <div
        className="skeleton skeleton-img"
        style={{ width: imgwidth, height: imgheight }}
      ></div>
      <div className="skeleton skeleton-title"></div>
      {additionalLine && <div className="skeleton skeleton-title"></div>}
    </div>
  );
};
