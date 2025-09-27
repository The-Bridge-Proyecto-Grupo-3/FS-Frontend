export const EvStationRow = ({ station }) => {
	const { operator, address, city, location, max_power, distance, latitude, longitude } = station;

	const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

	const handleOpenMap = () => {
		window.open(mapUrl, '_blank', 'noopener,noreferrer');
	};

	return (
		<tr>
			<td>{operator || 'N/D'}</td>
			<td>{address}</td>
			<td>{city}</td>
			<td>{location || 'N/D'}</td>
			<td>{max_power ? `${(max_power / 1000).toFixed(1)} kW` : 'N/D'}</td>
			<td>{distance ? `${distance.toFixed(2)} km` : 'N/D'}</td>
			<td>
				<button
					onClick={handleOpenMap}
					style={{
						cursor: 'pointer',
						padding: '5px 10px',
						border: '1px solid #007bff',
						backgroundColor: 'white',
						color: '#007bff',
						borderRadius: '5px',
					}}
				>
					Ver Mapa
				</button>
			</td>
		</tr>
	);
};
