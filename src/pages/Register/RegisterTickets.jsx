import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket } from "../../redux/ticketsSlice";
import "./RegisterTickets.css"; // Importamos los estilos

export default function RegisterTickets() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    precio: "",
    cantidad: "",
    kilometraje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTicket(formData));
    alert("✅ Ticket registrado correctamente");
    setFormData({
      precio: "",
      cantidad: "",
      kilometraje: "",
    });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro de tickets</h2>

      <form onSubmit={handleSubmit} className="register-form">
        {/* Precio */}
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            name="precio"
            id="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cantidad */}
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad (Litros o Kw/h)</label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
        </div>

        {/* Kilometraje */}
        <div className="form-group">
          <label htmlFor="kilometraje">Kilometraje</label>
          <input
            type="number"
            name="kilometraje"
            id="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Registrar 
        </button>
      </form>
    </div>
  );
}
