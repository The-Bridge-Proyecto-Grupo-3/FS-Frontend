import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGastationNextMe } from '../../redux/oilApi/oilSlice';
// import './NearbyGastations.css';

const NearbyGastations = () => {
	const dispatch = useDispatch();
	const { gastationNextMe, isLoading, isError, message } = useSelector(state => state.oil);

	// Estado local para las coordenadas del usuario
	const [coords, setCoords] = useState({ lat: null, lng: null });
	// Estado local para el radio, con valor inicial de 20 km
	const [radius, setRadius] = useState(20);
	// Estado local para el error de geolocalización
	const [geoError, setGeoError] = useState(null);

	// 1. Pedir geolocalización solo una vez al cargar el componente
	useEffect(() => {
		if (!navigator.geolocation) {
			setGeoError('La geolocalización no es compatible con tu navegador.');
			return;
		}
		navigator.geolocation.getCurrentPosition(
			pos => {
				setCoords({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
			},
			err => {
				console.error('Error obteniendo ubicación:', err);
				setGeoError('No se pudo obtener tu ubicación. Por favor, activa los permisos.');
			}
		);
	}, []);

	useEffect(() => {
		if (coords.lat && coords.lng) {
			dispatch(
				getGastationNextMe({
					latitud: coords.lat,
					longitud: coords.lng,
					radio: radius,
				})
			);
		}
	}, [coords, radius]);

	const handleRadiusChange = e => {
		setRadius(Number(e.target.value));
	};

	return (
		<div className="nearby-container">
			<h1>⛽ Gasolineras cerca de ti</h1>

			<div className="radius-slider">
				<label htmlFor="radius">
					Radio de búsqueda: <strong>{radius} km</strong>
				</label>
				<input
					type="range"
					id="radius"
					name="radius"
					min="0"
					max="100"
					step="10"
					value={radius}
					onChange={handleRadiusChange}
				/>
			</div>

			{/* Manejo de estados de carga y error */}
			{geoError && <p className="error-message">{geoError}</p>}
			{!coords.lat && !geoError && <p>Obteniendo tu ubicación...</p>}

			{coords.lat && (
				<>
					{isLoading && <p>Buscando gasolineras...</p>}
					{isError && <p className="error-message">{message}</p>}
					{!isLoading && !isError && gastationNextMe.length === 0 && (
						<p>No se encontraron gasolineras en un radio de {radius} km.</p>
					)}

					{!isLoading && !isError && gastationNextMe.length > 0 && (
						<ul className="gastations-list">
							{gastationNextMe.map(estacion => (
								<li key={estacion.idEstacion}>
									<Link to={`/gasolinera/${estacion.idEstacion}`}>
										<strong>{estacion.nombreEstacion}</strong>
										<span>{estacion.direccion}</span>
									</Link>
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</div>
	);
};

export default NearbyGastations;
