import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNearEvStations } from '../../redux/evStations/evSlice';
import { EvStationTable } from './EvStationTable';

const SearchEV = () => {
	const dispatch = useDispatch();
	const { evStations, isLoading, isError, message } = useSelector(state => state.ev);

	const [coords, setCoords] = useState(null);
	const [locationError, setLocationError] = useState('');

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				pos => {
					setCoords({
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					});
				},
				err => {
					console.error('Error obteniendo ubicación:', err);
					setLocationError(
						'No se pudo obtener tu ubicación. Por favor, activa los permisos.'
					);
				}
			);
		} else {
			setLocationError('Geolocalización no soportada en este navegador.');
		}
	}, []);

	useEffect(() => {
		if (coords) {
			dispatch(getNearEvStations({ latitude: coords.lat, longitude: coords.lng }));
		}
	}, [coords]);

	const stationsByDistance = useMemo(() => {
		if (!evStations || evStations.length === 0) {
			return [];
		}

		const uniqueStations = [];
		const seenAddresses = new Set();

		for (const station of evStations) {
			if (!seenAddresses.has(station.address)) {
				seenAddresses.add(station.address);
				uniqueStations.push(station);
			}
		}
		return uniqueStations.slice(0, 5);
	}, [evStations]);

	const stationsByPower = useMemo(
		() => [...evStations].sort((a, b) => b.max_power - a.max_power).slice(0, 5),
		[evStations]
	);

	return (
		<div>
			<h2>Puntos de Carga</h2>

			{locationError && <p style={{ color: 'red' }}>{locationError}</p>}
			{isLoading && <p>Buscando puntos de carga...</p>}
			{isError && <p style={{ color: 'red' }}>Error: {message}</p>}

			{!isLoading && !isError && (
				<>
					<EvStationTable title="Los 5 más cercanos" stations={stationsByDistance} />
					<EvStationTable title="Los 5 con mayor potencia" stations={stationsByPower} />
				</>
			)}

			{!isLoading && !locationError && evStations.length === 0 && (
				<p>No se encontraron puntos de carga en un radio de 20 km.</p>
			)}
		</div>
	);
};

export default SearchEV;
