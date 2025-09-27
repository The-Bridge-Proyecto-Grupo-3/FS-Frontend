import { EvStationRow } from './EvStationRow';

export const EvStationTable = ({ title, stations }) => {
	if (!stations || stations.length === 0) {
		return null;
	}

	return (
		<div style={{ marginTop: '30px' }}>
			<h3>{title}</h3>
			<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
				<thead>
					<tr style={{ backgroundColor: '#f2f2f2' }}>
						<th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
							Operador
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
							Dirección
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
							Ciudad
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
							Ubicación
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
							Potencia Máx.
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
							Distancia
						</th>
						<th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
							Mapa
						</th>
					</tr>
				</thead>
				<tbody>
					{stations.map(station => (
						<EvStationRow key={station.id} station={station} />
					))}
				</tbody>
			</table>
		</div>
	);
};
