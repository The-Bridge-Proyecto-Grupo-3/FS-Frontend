import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGastationDetails } from '../../redux/oilApi/oilSlice';
import './Gastation.scss';

const Gastation = ({ idEstacion }) => {
	const params = useParams();
	const id = idEstacion || params.id;
	const dispatch = useDispatch();
	const { gastationDetails } = useSelector(state => state.oil);

	useEffect(() => {
		if (id) dispatch(getGastationDetails(id));
	}, [dispatch, id]);

	if (!gastationDetails) return <p>Cargando gasolinera...</p>;

	const { nombreEstacion, direccion, localidad, provincia, horario, marca, latitud, longitud } =
		gastationDetails;
	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`;

	return (
		<div className="gastation-details">
			<h2>{nombreEstacion}</h2>
			<table>
				<tbody>
					<tr>
						<th>Dirección</th>
						<td>{direccion}</td>
					</tr>

					<tr>
						<th>Horario</th>
						<td>{horario}</td>
					</tr>
					<tr>
						<th>Marca</th>
						<td>{marca}</td>
					</tr>
				</tbody>
			</table>
			<h3>Precios</h3>
			<table>
				<tbody>
					<tr>
						<th>Gasolina 95</th>
						<td>{gastationDetails.Gasolina95}</td>
					</tr>
					<tr>
						<th>Gasolina 95 Media</th>
						<td>{gastationDetails.Gasolina95_media}</td>
					</tr>
					<tr>
						<th>Gasolina 98 Media</th>
						<td>{gastationDetails.Gasolina98_media}</td>
					</tr>
					<tr>
						<th>Diesel</th>
						<td>{gastationDetails.Diesel}</td>
					</tr>
					<tr>
						<th>Diesel Media</th>
						<td>{gastationDetails.Diesel_media}</td>
					</tr>
					<tr>
						<th>Diesel Premium</th>
						<td>{gastationDetails.DieselPremium}</td>
					</tr>
					<tr>
						<th>Diesel Premium Media</th>
						<td>{gastationDetails.DieselPremium_media}</td>
					</tr>
					<tr>
						<th>Diesel B Media</th>
						<td>{gastationDetails.DieselB_media}</td>
					</tr>
					<tr>
						<th>GLP Media</th>
						<td>{gastationDetails.GLP_media}</td>
					</tr>
				</tbody>
			</table>

			<a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="maps-link">
				Ver en Google Maps
			</a>
		</div>
	);
};

export default Gastation;
