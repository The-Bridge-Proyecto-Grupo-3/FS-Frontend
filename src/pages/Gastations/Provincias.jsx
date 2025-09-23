import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProvincias } from '../../redux/oilApi/oilSlice';

const Provincias = () => {
	const { provincias } = useSelector(state => state.oil);
	const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProvincias());
	}, []);

	const handleClick = provincia => {
		setProvinciaSeleccionada(provincia);
		console.log('Provincia seleccionada:', provincia); // Aquí puedes hacer lo que necesites
	};

	return (
		<div>
			<h1>Provincia</h1>
			<ul>
				{provincias
					.filter(Provincia => Provincia.idProvincia < 53)
					.map(Provincia => (
						<li
							key={Provincia.idProvincia}
							onClick={() => handleClick(Provincia)}
							// style={{ cursor: 'pointer', marginBottom: '8px' }}
						>
							<Link to={`/municipios/${Provincia.idProvincia}`}>
								{Provincia.nombreProvincia}
							</Link>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Provincias;
