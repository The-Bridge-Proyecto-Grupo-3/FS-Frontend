import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getGastations } from '../../redux/oilApi/oilSlice';

const Gastations = () => {
	const { id } = useParams(); // idMunicipio
	const dispatch = useDispatch();
	const { gastations } = useSelector(state => state.oil);
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		if (id) {
			dispatch(getGastations(id));
		}
	}, [dispatch, id]);
	return (
		<div>
			<h1>Gasolineras del municipio {id}</h1>
			<ul>
				{gastations.map(estacion => (
					<li
						key={estacion.idEstacion}
						onClick={() => setSelectedId(estacion.idEstacion)}
						style={{
							cursor: 'pointer',
							marginBottom: '8px',
							backgroundColor:
								selectedId === estacion.idEstacion ? '#d1e7dd' : 'transparent',
							padding: '6px',
							borderRadius: '6px',
						}}
					>
						<Link to={`/gastation/${estacion.idEstacion}`}>
							{estacion.nombreEstacion} - {estacion.direccion}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Gastations;
