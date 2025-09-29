export const EvStationRow = ({ station }) => {
	const { operator, address, city, location, max_power, distance, latitude, longitude } = station;

	const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

	const handleOpenMap = () => {
		window.open(mapUrl, '_blank', 'noopener,noreferrer');
	};

	return (
		<tr>
			{/* <td>{operator || 'N/D'}</td> */}
			<td>{address}</td>
			<td>{city}</td>
			{/* <td>{location || 'N/D'}</td> */}
			<td>{max_power ? `${(max_power / 1000).toFixed(1)} kW` : 'N/D'}</td>
			<td>{distance ? `${distance.toFixed(2)} Km` : 'N/D'}</td>
			<td className="center">
				<button className="btnShowMap" onClick={handleOpenMap} >Ver Mapa</button>
			</td>
		</tr>
	);
};
