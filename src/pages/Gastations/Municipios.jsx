import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getMunicipios } from '../../redux/oilApi/oilSlice';

const Municipios = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { municipios } = useSelector(state => state.oil);

	useEffect(() => {
		if (id) {
			dispatch(getMunicipios(id));
		}
	}, [dispatch, id]);

	return (
		<div>
			<h1>Municipios de la provincia {id}</h1>
			<ul>
				{municipios.map(municipio => (
					<li key={municipio.idMunicipio} style={{ marginBottom: '8px' }}>
						<Link to={`/gastations/${municipio.idMunicipio}`}>
							{municipio.nombreMunicipio}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Municipios;
