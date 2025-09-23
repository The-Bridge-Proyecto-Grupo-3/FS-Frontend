import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGastationDetails } from '../../redux/oilApi/oilSlice';

const Gastation = () => {
	const { id } = useParams(); // idEstacion
	const dispatch = useDispatch();
	const { gastationDetails } = useSelector(state => state.oil);

	useEffect(() => {
		if (id) dispatch(getGastationDetails(id));
	}, [dispatch, id]);

	if (!gastationDetails) return <p>Cargando gasolinera...</p>;

	const { latitud, longitud } = gastationDetails;
	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`;

	return (
		<div>
			<h1>{gastationDetails.nombreEstacion}</h1>
			<p>Dirección: {gastationDetails.direccion}</p>
			<p>Localidad: {gastationDetails.localidad}</p>
			<p>Provincia: {gastationDetails.provincia}</p>
			<p>Horario: {gastationDetails.horario}</p>
			<p>Marca: {gastationDetails.marca}</p>
			<h3>Precios:</h3>
			<ul>
				<li>Gasolina 95: {gastationDetails.Gasolina95}</li>
				<li>Gasolina 95 Media: {gastationDetails.Gasolina95_media}</li>
				<li>Gasolina 98 Media: {gastationDetails.Gasolina98_media}</li>
				<li>Diesel: {gastationDetails.Diesel}</li>
				<li>Diesel Media: {gastationDetails.Diesel_media}</li>
				<li>Diesel Premium: {gastationDetails.DieselPremium}</li>
				<li>Diesel Premium Media: {gastationDetails.DieselPremium_media}</li>
				<li>Diesel B Media: {gastationDetails.DieselB_media}</li>
				<li>GLP Media: {gastationDetails.GLP_media}</li>
			</ul>

			<a
				href={mapsUrl}
				target="_blank"
				rel="noopener noreferrer"
				style={{
					display: 'inline-block',
					marginTop: '16px',
					padding: '10px 16px',
					backgroundColor: '#4285F4',
					color: '#fff',
					borderRadius: '6px',
					textDecoration: 'none',
				}}
			>
				Ver en Google Maps
			</a>
		</div>
	);
};

export default Gastation;
