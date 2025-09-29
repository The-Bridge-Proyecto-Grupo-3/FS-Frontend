import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNearEvStations } from '../../redux/evStations/evSlice';
import { EvStationTable } from './EvStationTable';
import GoBack from '../../components/Buttons/GoBack';

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

	const getUnique = (arr, count = 10) => {
		if (!evStations || evStations.length === 0) {
			return [];
		}

		const uniqueStations = [];
		const seenAddresses = new Set();

		for (const station of arr) {
			if (!seenAddresses.has(station.address)) {
				seenAddresses.add(station.address);
				uniqueStations.push(station);
			}
			if (uniqueStations.length == count) break;
		}
		return uniqueStations;
	};

	const stationsByDistance = useMemo(() => getUnique(evStations), [evStations]);

	const stationsByPower = useMemo(
		() => getUnique([...evStations].sort((a, b) => b.max_power - a.max_power)),
		[evStations]
	);

	return (
		<div>
			<GoBack path='/company' />
			<h2>Puntos de Recarga</h2>

			{locationError && <p style={{ color: 'red' }}>{locationError}</p>}
			{isLoading && <p>Buscando puntos de carga...</p>}
			{isError && <p style={{ color: 'red' }}>Error: {message}</p>}

			{!isLoading && !isError && (
				<>
					<EvStationTable title="Los más cercanos" stations={stationsByDistance} />
					<EvStationTable title="Los de mayor potencia a 20Km" stations={stationsByPower} />
				</>
			)}

			{!isLoading && !locationError && evStations.length === 0 && (
				<p>No se encontraron puntos de carga en un radio de 20 km.</p>
			)}
		</div>
	);
};

export default SearchEV;
