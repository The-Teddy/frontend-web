import React, { useState } from "react";

function CategorySelect() {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <label htmlFor="category">Escolha uma Categoria:</label>
      <select id="category" value={category} onChange={handleCategoryChange}>
        {/* <option value="Academia">Academia</option>
        <option value="Barbearia">Barbearia</option>
        <option value="Salão de Beleza">Salão de Beleza</option>
        <option value="Personal Trainer">Personal Trainer</option>
        <option value="Clínica de Estética">Clínica de Estética</option>
        <option value="Tatuagem e Piercing">Tatuagem e Piercing</option>
        <option value="Manicure e Pedicure">Manicure e Pedicure</option>
        <option value="Massoterapia">Massoterapia</option>
        <option value="Fotografia">Fotografia</option>
        <option value="Consultoria">Consultoria</option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option> */}
        <option value="outros">Outros</option>
      </select>

      {category === "outros" && (
        <div>
          <label htmlFor="customCategory">Digite a Categoria:</label>
          <input
            type="text"
            id="customCategory"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default CategorySelect;
