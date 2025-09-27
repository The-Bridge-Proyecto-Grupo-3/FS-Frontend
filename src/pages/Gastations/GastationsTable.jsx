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

	return (
		<div>
			<h3>{title}</h3>
			<table>
				<thead>
					<tr>
						<th>Estación</th>
						<th>Dirección</th>

						{isGasolina && (
							<>
								<th>Gasolina 95 (€/L)</th>
								<th>Gasolina 98 (€/L)</th>
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
									<td>{station.Gasolina95 || 'ND'}</td>
									<td>{station.Gasolina98 || 'ND'} </td>
								</>
							)}

							{isDiesel && (
								<>
									<td>{station.Diesel || 'ND'}</td>
									<td>{station.DieselPremium || 'ND'} </td>
								</>
							)}

							<td>{parseFloat(station.distancia).toFixed(2)}</td>
							<td>
								<a
									href={`https://www.google.com/maps/search/?api=1&query=${station.latitud},${station.longitud}`}
									target="_blank"
									rel="noopener noreferrer"
									style={styles.button}
								>
									Ver
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
