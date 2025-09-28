export const GastationDetails = ({ details }) => {

  if (!details) return null;

  const {
   nombreEstacion,
    marca,
    direccion,
    horario,
    latitud,
    longitud,
    ...precios
  } = details;

  const mapUrl = `https://maps.google.com/?q=${latitud},${longitud}`;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginTop: "20px",
        backgroundColor: "#cfc5c5ff",
      }}
    >
      <h3 style={{ marginTop: "0" }}>{nombreEstacion}</h3>

      <p>
        <strong>Marca:</strong> {marca}
      </p>
      <p>
        <strong>Dirección:</strong> {direccion}
      </p>

      <h4 style={{ marginBottom: "10px" }}>Combustibles y precios (€/L)</h4>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {precios.Gasolina95 && (
          <li>
            <strong>Gasolina 95:</strong> {precios.Gasolina95}
          </li>
        )}
        {precios.Gasolina98 && (
          <li>
            <strong>Gasolina 98:</strong> {precios.Gasolina98}
          </li>
        )}
        {precios.Diesel && (
          <li>
            <strong>Diésel:</strong> {precios.Diesel}
          </li>
        )}
        {precios.DieselPremium && (
          <li>
            <strong>Diésel Premium:</strong> {precios.DieselPremium}
          </li>
        )}
      </ul>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "10px 15px",
          backgroundColor: "#4285F4",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        Ver en Google Maps
      </a>
      <div>
        <h4>Horario </h4>
        <p> {horario}</p>
      </div>
    </div>
  );
};