import React, { useEffect } from "react";
import "./HelpDetailModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface HelpDetailModalInterface {
  view: boolean;
  title: string;
  text: string;
  setView: () => void;
}

const HelpDetailModal: React.FC<HelpDetailModalInterface> = ({ ...props }) => {
  function handleClickOutside(event: any) {
    if (event.key === "Escape") {
      props.setView();
    }
  }
  useEffect(() => {
    if (props.view) {
      document.addEventListener("keydown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [props.view]);
  return (
    <>
      {props.view ? (
        <div id="help-detail-modal">
          <p className="title">
            <span>{props.title}</span>{" "}
            <FontAwesomeIcon onClick={props.setView} icon={faXmark} />
          </p>

          <div className="content">
            <p className="text">{props.text}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HelpDetailModal;
