import React from "react";

interface ButtonInterface {
  title: string;
  handleSubmit?: () => void;
  loading?: boolean;
}
const DefaultSaveButton: React.FC<ButtonInterface> = ({ ...props }) => {
  return (
    <button
      className="default-save-button"
      onClick={props.handleSubmit}
      disabled={props.loading}
    >
      {!props.loading && <span className="indicator-label">{props.title}</span>}
      {props.loading && (
        <span className="indicator-progress" style={{ display: "block" }}>
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      )}
    </button>
  );
};

export default DefaultSaveButton;
