import React from "react";
import "./DefaultQuestionIcon.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface DefaultQuestionIconInterface {
  setView: () => void;
}

const DefaultQuestionIcon: React.FC<DefaultQuestionIconInterface> = ({
  ...props
}) => {
  return (
    <>
      <FontAwesomeIcon
        className="dont-close"
        icon={faQuestionCircle}
        style={{ marginLeft: 10, cursor: "pointer" }}
        color="#6495ed"
        onClick={props.setView}
      />
    </>
  );
};

export default DefaultQuestionIcon;
