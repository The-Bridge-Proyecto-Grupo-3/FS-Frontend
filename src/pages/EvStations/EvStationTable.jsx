import { EvStationRow } from './EvStationRow';

export const EvStationTable = ({ title, stations }) => {
	if (!stations || stations.length === 0) {
		return null;
	}

	return (
		<div style={{ marginTop: '30px' }}>
			<h3>{title}</h3>
			<div className='tableStations' style={{maxHeight: '40vh'}}>
				<table>
					<thead>
						<tr>
							{/* <th>Operador</th> */}
							<th>Dirección</th>
							<th>Ciudad</th>
							{/* <th>Ubicación</th> */}
							<th>Potencia Máx.</th>
							<th>Distancia</th>
							<th>Mapa</th>
						</tr>
					</thead>
					<tbody>
						{stations.map(station => (
							<EvStationRow key={station.id} station={station} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
