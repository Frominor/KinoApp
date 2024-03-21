import React from "react";
import { useTypedSelector } from "../../store";
import { ReactComponent as Play } from "../../imgs/play-circle-svgrepo-com.svg";
import "./WatchTrailer.css";
interface WatchTrailerProps {
  overview: string;
  SetModalWindowOpen: (arg: boolean) => void;
  index: number;
  SetKey: (arg: number) => void;
  title: string;
}
export const WatchTrailer: React.FC<WatchTrailerProps> = ({
  overview,
  SetModalWindowOpen,
  index,
  title,
  SetKey,
}) => {
  const State = useTypedSelector((state) => state.Films);
  return (
    <div className="WatchTrailerAndDescription">
      <p className="MovieTitle">{title}</p>
      <p>{overview.split(".")[0] + "." + overview.split(".")[1] + ""}</p>
      <button
        className="WatchTrailerBtn"
        onClick={() => {
          SetModalWindowOpen(true);
          const youtybekey = State?.YouTubeS[index]?.key;
          if (youtybekey) {
            SetKey(youtybekey);
          }
        }}
      >
        <Play className="Play"></Play>Watch trailer
      </button>
    </div>
  );
};
