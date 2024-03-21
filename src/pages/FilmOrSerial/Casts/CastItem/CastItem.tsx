import React from "react";
import "./CastItem.css";
interface CastItemProps {
  character: string;
  original_name: string;
  profile_path: string;
}
export const CastItem: React.FC<CastItemProps> = ({
  character,
  original_name,
  profile_path,
}) => {
  return (
    <div className="CastItem">
      <img
        loading="lazy"
        className="CastImg"
        style={{
          borderRadius: 20 + "px",
          minWidth: 300 + "px",
        }}
        src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
      />
      <div className="Cast_Name">
        <p>{character}</p>
        <p>{original_name}</p>
      </div>
    </div>
  );
};
