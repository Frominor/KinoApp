import React from "react";
import "./ModalWindow.css";
import { memo } from "react";
import { ReactComponent as Close } from "./close-svgrepo-com.svg";
type Props = {
  ModalWindowOpen: boolean;
  SetModalWindowOpen: (arg: boolean) => void;
  YouTubeKey: number;
};
export const ModalWindow: React.FC<Props> = memo(
  ({ ModalWindowOpen, SetModalWindowOpen, YouTubeKey }) => {
    return (
      <div
        className={ModalWindowOpen ? "ModalWindow open" : "ModalWindow closet"}
      >
        <div className="ModalWindowContent">
          <div className="ModalWindowClose">
            <button
              onClick={() => {
                SetModalWindowOpen(false);
              }}
            >
              <Close className="CloseModalButton"></Close>
            </button>
          </div>

          <iframe
            className={ModalWindowOpen ? "OpenFrame" : "ClosetFrame"}
            width="100%"
            height="315"
            src={
              ModalWindowOpen
                ? `https://www.youtube.com/embed/${YouTubeKey}?autoplay=1`
                : `https://www.youtube.com/embed/${YouTubeKey}?autoplay=0`
            }
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }
);
