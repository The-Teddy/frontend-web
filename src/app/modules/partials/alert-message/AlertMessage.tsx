import React from "react";
import "./AlertMessage.scss";

interface AlertMessageInterface {
  message: string;
}

const AlertMessage: React.FC<AlertMessageInterface> = ({ ...props }) => {
  return (
    <div id="alert-message">
      <p className="message">{props.message}</p>
    </div>
  );
};

export default AlertMessage;
