import React from "react";
import { Link } from "react-router-dom";
import "./BoxWarning.scss";

interface BoxWarningInterface {
  text: string;
  path?: string;
}
const BoxWarning: React.FC<BoxWarningInterface> = ({ ...props }) => {
  return (
    <div className="warning-box">
      <p className="text-warning">{props.text}</p>
      <Link to={`${props.path}`}>
        Clique aqui para completar as informações necessárias.
      </Link>
    </div>
  );
};

export default BoxWarning;
