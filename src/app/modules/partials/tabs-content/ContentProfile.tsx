import React, { useState } from "react";

const ContentProfile = () => {
  const [imageLogo, setImageLogo] = useState<File | null>(null);
  const [imageCover, setImageCover] = useState<File | null>(null);
  const [about, setAbout] = useState<string>("");

  return (
    <>
      <div className="box-content">
        Seja bem vindo ao gerencimento do seu perfil
      </div>
    </>
  );
};

export default ContentProfile;
