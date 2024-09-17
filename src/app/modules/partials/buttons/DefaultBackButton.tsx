import React from "react";
import "./Buttons.scss";
import { Link } from "react-router-dom";

interface ButtonInterface {
  title: string;
  path: string;
}

const DefaultBackButton: React.FC<ButtonInterface> = ({ ...props }) => {
  return (
    <Link to={`${props.path}`}>
      <button className="default-back-button">
        <i className="fa-solid fa-angles-left"></i>
        <span>{props.title}</span>
      </button>
    </Link>
  );
};

export default DefaultBackButton;
