import React from "react";
import "./DetailModalCategory.scss";
import DefaultSaveButton from "../../buttons/DefaultSaveButton";

interface DetailModalInterface {
  viewModal: boolean;
  title: string;
  detail: string;
  setCloseModal: () => void;
  setCloseModalAndCategory: () => void;
}
const DetailModalCategory: React.FC<DetailModalInterface> = ({ ...props }) => {
  return (
    <>
      {props.viewModal ? (
        <div className="background-default" id="detail-modal">
          <p className="title">{props.title}</p>
          <p className="detail">{props.detail}</p>
          <div className="box-button">
            <button onClick={props.setCloseModal} className="back">
              Voltar
            </button>
            {/* <button onClick={props.setCloseModalAndCategory}>Selecionar</button> */}
            <DefaultSaveButton
              loading={false}
              title="Selecinar"
              handleSubmit={props.setCloseModalAndCategory}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DetailModalCategory;
