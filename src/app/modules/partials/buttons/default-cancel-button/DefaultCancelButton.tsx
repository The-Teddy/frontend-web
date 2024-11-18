import React from "react";
import "./DefaultCancelButton.scss";

interface DefaultCancelButton {
  title: string;
  handleSubmit: () => void;
}

const DefaultCancelButton: React.FC<DefaultCancelButton> = ({ ...props }) => {
  return (
    <button id="default-cancel-button" onClick={props.handleSubmit}>
      {props.title}
    </button>
  );
};

export default DefaultCancelButton;
