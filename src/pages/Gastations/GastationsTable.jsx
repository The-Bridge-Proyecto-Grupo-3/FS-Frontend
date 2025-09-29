import { useMemo } from 'react';

const styles = {
	button: {
		padding: '5px 10px',
		backgroundColor: '#007bff',
		color: 'white',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		textDecoration: 'none',
	},
};

export const GastationsTable = ({ stations, fuelType, title }) => {
	const top3Cheapest = useMemo(() => {
		if (!stations || stations.length === 0) return [];
		return stations
			.filter(g => g[fuelType] && parseFloat(g[fuelType]) > 0)
			.sort((a, b) => parseFloat(a[fuelType]) - parseFloat(b[fuelType]))
			.slice(0, 3);
	}, [stations, fuelType]);

	if (top3Cheapest.length === 0) {
		return null;
	}

	const isGasolina = fuelType.includes('Gasolina');
	const isDiesel = fuelType.includes('Diesel');

	const handleOpenMap = (mapUrl) => {
		window.open(mapUrl, '_blank', 'noopener,noreferrer');
	};

	return (
		<div>
			<h3>{title}</h3>
			<div className='tableContainer'>
				<table>
					<thead>
						<tr>
							<th>Estación</th>
							<th>Dirección</th>

							{isGasolina && (
								<>
									<th>95 (€/L)</th>
									<th>98 (€/L)</th>
								</>
							)}

							{isDiesel && (
								<>
									<th>Diésel (€/L)</th>
									<th>Diésel Premium (€/L)</th>
								</>
							)}

							<th>Distancia (km)</th>
							<th>Mapa</th>
						</tr>
					</thead>
					<tbody>
						{top3Cheapest.map(station => (
							<tr key={`${station.idEstacion}-${fuelType}`}>
								<td>{station.nombreEstacion}</td>
								<td>{station.direccion}</td>

								{isGasolina && (
									<>
										<td>{station.Gasolina95 || 'N/D'}</td>
										<td>{station.Gasolina98 || 'N/D'} </td>
									</>
								)}

								{isDiesel && (
									<>
										<td>{station.Diesel || 'N/D'}</td>
										<td>{station.DieselPremium || 'N/D'} </td>
									</>
								)}

								<td>{parseFloat(station.distancia).toFixed(2)}</td>
								<td className='center'>
									<button className="btnShowMap" onClick={() => 
										handleOpenMap(`https://www.google.com/maps/search/?api=1&query=${station.latitud},${station.longitud}`)
									} >Ver Mapa</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
