import { useState, useEffect } from "react";

// Un componente genérico para los selectores para no repetir código
const Selector = ({
  label,
  value,
  onChange,
  options,
  disabled,
  defaultOptionText,
}) => (
  <div style={{ marginBottom: "15px" }}>
    <label
      style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
    >
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{ width: "100%", padding: "8px" }}
    >
      <option value="">{defaultOptionText}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export const SelectorForm = ({ data, actions }) => {
  const { provincias, municipios, gastations } = data;
  const { selectProvincia, selectMunicipio, selectGastation } = actions;

  const [provinciaId, setProvinciaId] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [gastationId, setGastationId] = useState("");

  const handleProvinciaChange = (e) => {
    const id = e.target.value;
    setProvinciaId(id);
    setMunicipioId(""); 
    setGastationId(""); 
    selectProvincia(id);
  };

  const handleMunicipioChange = (e) => {
    const id = e.target.value;
    setMunicipioId(id);
    setGastationId(""); 
    selectMunicipio(id);
  };

  const handleGastationChange = (e) => {
    const id = e.target.value;
    setGastationId(id);
    selectGastation(id);
  };

  const provinciaOptions = provincias.map((p) => ({
    id: p.idProvincia,
    name: p.nombreProvincia,
  }));
  const municipioOptions = municipios.map((m) => ({
    id: m.idMunicipio,
    name: m.nombreMunicipio,
  }));
  const gastationOptions = gastations.map((g) => ({
    id: g.idEstacion,
    name: `${g.nombreEstacion} - ${g.direccion}`,
  }));

  return (
    <form>
      <Selector
        label="Provincia"
        value={provinciaId}
        onChange={handleProvinciaChange}
        options={provinciaOptions}
        defaultOptionText="-- Selecciona una provincia --"
      />
      <Selector
        label="Municipio"
        value={municipioId}
        onChange={handleMunicipioChange}
        options={municipioOptions}
        disabled={!provinciaId}
        defaultOptionText={
          !provinciaId
            ? "Debe seleccionar una provincia"
            : "-- Selecciona un municipio --"
        }
      />
      <Selector
        label="Gasolinera"
        value={gastationId}
        onChange={handleGastationChange}
        options={gastationOptions}
        disabled={!municipioId}
        defaultOptionText={
          !municipioId
            ? "Debe seleccionar un municipio"
            : "-- Selecciona una gasolinera --"
        }
      />
    </form>
  );
};